use std::{
    borrow::Cow, cell::RefCell, collections::HashMap, io::Read, num::NonZeroU32, sync::RwLock,
};

use bevy_ecs::{
    prelude::{Bundle, Component, Entity},
    query::{Added, Changed, Or},
    schedule::{IntoSystemConfig, Schedule},
    system::{NonSendMut, Query, ResMut, Resource},
    world::World,
};
use bytemuck::{Pod, Zeroable};
use guillotiere::{size2, AllocId, AtlasAllocator};
use wgpu::{util::DeviceExt, CompositeAlphaMode, Device, Limits, Queue, Surface};
use wgsl_preprocessor::ShaderBuilder;
use winit::{dpi::PhysicalSize, window::Window};

use crate::{
    resources::{Img, Texture, IMGS},
    transform::{self, update_transform_sys, Transform},
};

/// #[derive(/
/// #[derive(Bundle)]
/// struct PhysicsBundle {
///     position: Position,
///     velocity: Velocity,
/// })]
/// struct PhysicsBundle {
///     position: Position,
///     velocity: Velocity,
/// }
///
///

#[derive(Component)]
pub struct Size {
    pub size: glam::Vec2,
}
#[derive(Bundle)]
pub struct Sprite {
    pub texture: Texture,
    pub size: Size,
    pub transform: Transform,
}

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, Debug)]
struct GlobalData {
    cam_transform: [[f32; 4]; 4],
}

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, Debug)]
struct GpuSpriteData {
    transform: [[f32; 4]; 4],
    uv_offset: [f32; 2],
    uv_scale: [f32; 2],
    texture_layer: [f32; 4],
}

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable)]
struct Vertex {
    _pos: [f32; 2],
    _uv: [f32; 2],
}

impl Vertex {
    fn vertex(pos: [f32; 2], uv: [f32; 2]) -> Vertex {
        Vertex { _pos: pos, _uv: uv }
    }
}

struct GpuTexture {
    texture: wgpu::Texture,
    view: wgpu::TextureView,
    width: u32,
    height: u32,
}

pub struct SpriteRenderer {
    adapter: wgpu::Adapter,
    device: wgpu::Device,
    surface: Surface,
    pipeline: wgpu::RenderPipeline,
    queue: wgpu::Queue,
    global_buffer: wgpu::Buffer,
    bind_group: wgpu::BindGroup,
    bind_group_layout: wgpu::BindGroupLayout,
    sprite_data_cpu: Vec<GpuSpriteData>,
    sprite_data_buffer: wgpu::Buffer,
    sprite_data_buffer_update: RefCell<bool>,
    entities_to_index: HashMap<Entity, u32>,
    vertex_buffer: wgpu::Buffer,
    texture: GpuTexture,
    sampler: wgpu::Sampler,
    atlas: AtlasAllocator,
    limits: wgpu::Limits,
    texture_map: HashMap<String, AllocId>,
}

impl SpriteRenderer {
    // pub const SPRITE_COUNT: u64 = 128;
    #[cfg(feature = "webgl")]
    const SPRITE_PER_DRAW_CALL_MAX_COUNT: u64 = 170;
    #[cfg(not(feature = "webgl"))]
    const SPRITE_PER_DRAW_CALL_MAX_COUNT: u64 = 15 * 1024;
    pub async fn new(window: &Window) -> Self {
        let backends = wgpu::util::backend_bits_from_env().unwrap_or_else(wgpu::Backends::all);
        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor {
            backends,
            dx12_shader_compiler: wgpu::Dx12Compiler::default(),
        });

        let (size, surface) = unsafe {
            let size = window.inner_size();

            #[cfg(target_arch = "wasm32")]
            {
                use winit::platform::web::WindowExtWebSys;
                web_sys::window()
                    .and_then(|win| win.document())
                    .and_then(|doc| doc.body())
                    .and_then(|body| {
                        body.append_child(&web_sys::Element::from(window.canvas()))
                            .ok()
                    })
                    .expect("couldn't append canvas to document body");
            }

            let surface = instance.create_surface(window).unwrap();

            (size, surface)
        };

        let adapter = (instance.request_adapter(&wgpu::RequestAdapterOptions {
            power_preference: wgpu::PowerPreference::default(),
            force_fallback_adapter: false,
            // Request an adapter which can render to our surface
            compatible_surface: Some(&surface),
        }))
        .await
        .expect("Failed to find an appropriate adapter");

        let adapter_info = adapter.get_info();
        log::info!("Using {} ({:?})", adapter_info.name, adapter_info.backend);

        let adapter_features = adapter.features();
        let downlevel_capabilities = adapter.get_downlevel_capabilities();
        let limits = adapter.limits();

        log::info!("adapter_features :{:?}", adapter_features);
        log::info!("downlevel_capabilities :{:?}", downlevel_capabilities);

        log::info!("adapter limits:{:?}", limits);

        let limits = {
            cfg_if::cfg_if! {
                    if #[cfg(feature = "webgl")]
                {
                    wgpu::Limits::downlevel_webgl2_defaults().using_resolution(adapter.limits())
                }
                else if #[cfg(feature = "webgpu")]
                {
                    wgpu::Limits::default().using_resolution(adapter.limits())
                }else {

                    adapter.limits()
                }
            }
        };
        log::info!("used adapter limits:{:?}", limits);

        let (device, queue) = (adapter.request_device(
            &wgpu::DeviceDescriptor {
                label: None,
                features: wgpu::Features::empty(),
                // Make sure we use the texture resolution limits from the adapter, so we can support images the size of the swapchain.
                limits: limits.clone(),
            },
            None,
        ))
        .await
        .expect("Failed to create device");

        // setup stuff

        let surface_cap = surface.get_capabilities(&adapter);
        log::info!(" surface.get_capabilities {:?}", surface_cap);

        let current_swapchain_format = {
            #[cfg(feature = "webgl")]
            {
                wgpu::TextureFormat::Rgba8Unorm
            }
            #[cfg(not(feature = "webgl"))]
            {
                wgpu::TextureFormat::Bgra8Unorm
            }
        };

        assert!(
            surface_cap.formats.contains(&current_swapchain_format),
            "{}",
            format!(
                "swapchain format {:?} is not supported ",
                &current_swapchain_format
            )
        );

        log::info!("swapchain size : {:?}", size);
        //wgpu BUG? : alpha_mode: wgpu::CompositeAlphaMode::PreMultiplied doesn't fail on web but fails on native
        let config = wgpu::SurfaceConfiguration {
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
            format: current_swapchain_format,
            width: size.width,
            height: size.height,
            present_mode: wgpu::PresentMode::Fifo,
            alpha_mode: wgpu::CompositeAlphaMode::Opaque,
            view_formats: Vec::from([current_swapchain_format]),
        };
        surface.configure(&device, &config);

        let (render_pipeline, bind_group_layout) =
            Self::create_pipeline(&device, current_swapchain_format);

        let cam_transform = Self::create_camera(size);

        let (global_buffer, sprite_data_buffer) = Self::create_buffers(&device, cam_transform);

        let vertex_buffer = Self::create_vertex_buffer(&device);

        let sampler = device.create_sampler(&wgpu::SamplerDescriptor {
            label: None,
            address_mode_u: wgpu::AddressMode::ClampToEdge,
            address_mode_v: wgpu::AddressMode::ClampToEdge,
            address_mode_w: wgpu::AddressMode::ClampToEdge,
            mag_filter: wgpu::FilterMode::Linear,
            min_filter: wgpu::FilterMode::Linear,
            mipmap_filter: wgpu::FilterMode::Linear,
            ..Default::default()
        });

        let texture = Self::create_atlas_texture(&limits, &device);

        let atlas = AtlasAllocator::new(size2(texture.width as i32, texture.height as i32));

        let bind_group = Self::create_bind_group(
            &device,
            &bind_group_layout,
            &global_buffer,
            &sprite_data_buffer,
            &sampler,
            &queue,
            &texture,
        );

        SpriteRenderer {
            adapter,
            device,
            queue,
            limits,
            surface,
            pipeline: render_pipeline,
            vertex_buffer,
            global_buffer,
            sprite_data_buffer,
            sprite_data_buffer_update: RefCell::new(true),
            bind_group_layout,
            bind_group,
            sampler,
            sprite_data_cpu: Vec::new(),
            entities_to_index: HashMap::new(),
            atlas,
            texture,
            texture_map: HashMap::new(),
        }
    }

    fn create_pipeline(
        device: &Device,
        current_swapchain_format: wgpu::TextureFormat,
    ) -> (wgpu::RenderPipeline, wgpu::BindGroupLayout) {
        let source = include_str!("shader.wgsl");

        #[cfg(not(feature = "webgl"))]
        let source = source.replace(
            "var<uniform> sprites_data: array<GpuSpriteData,170>;",
            "var<storage,read> sprites_data: array<GpuSpriteData>;",
        );

        log::warn!("shader  :{:?}", source);

        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: None,
            source: wgpu::ShaderSource::Wgsl(Cow::Borrowed(&source)),
        });

        let bind_group_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: None,
            entries: &[
                wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 1,
                    visibility: wgpu::ShaderStages::VERTEX,
                    ty: wgpu::BindingType::Buffer {
                        #[cfg(not(feature = "webgl"))]
                        ty: wgpu::BufferBindingType::Storage { read_only: true },
                        #[cfg(feature = "webgl")]
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 2,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Texture {
                        multisampled: false,
                        sample_type: wgpu::TextureSampleType::Float { filterable: true },
                        view_dimension: wgpu::TextureViewDimension::D2,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 3,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Sampler(wgpu::SamplerBindingType::Filtering),
                    count: None,
                },
            ],
        });

        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some(&"SpriteRenderer"),
            bind_group_layouts: &[&bind_group_layout],
            push_constant_ranges: &[],
        });

        let vertex_size = std::mem::size_of::<Vertex>();
        let vertex_buffers = [wgpu::VertexBufferLayout {
            array_stride: vertex_size as wgpu::BufferAddress,
            step_mode: wgpu::VertexStepMode::Vertex,
            attributes: &[
                wgpu::VertexAttribute {
                    format: wgpu::VertexFormat::Float32x2,
                    offset: 0,
                    shader_location: 0,
                },
                wgpu::VertexAttribute {
                    format: wgpu::VertexFormat::Float32x2,
                    offset: 4 * 2,
                    shader_location: 1,
                },
            ],
        }];

        let render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: None,
            layout: Some(&pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: "vs_main",
                buffers: &vertex_buffers,
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: "fs_main",
                targets: &[Some(current_swapchain_format.into())],
            }),
            primitive: wgpu::PrimitiveState::default(),
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            multiview: None,
        });

        (render_pipeline, bind_group_layout)
    }

    fn create_bind_group(
        device: &wgpu::Device,
        bind_group_layout: &wgpu::BindGroupLayout,
        global_buffer: &wgpu::Buffer,
        sprite_buffer: &wgpu::Buffer,
        sampler: &wgpu::Sampler,
        queue: &wgpu::Queue,
        texture: &GpuTexture,
    ) -> wgpu::BindGroup {
        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: None,
            layout: &bind_group_layout,
            entries: &[
                wgpu::BindGroupEntry {
                    binding: 0,
                    resource: global_buffer.as_entire_binding(),
                },
                wgpu::BindGroupEntry {
                    binding: 1,
                    resource: sprite_buffer.as_entire_binding(),
                },
                wgpu::BindGroupEntry {
                    binding: 2,
                    resource: wgpu::BindingResource::TextureView(&texture.view),
                },
                wgpu::BindGroupEntry {
                    binding: 3,
                    resource: wgpu::BindingResource::Sampler(&sampler),
                },
            ],
        });

        bind_group
    }

    fn create_camera(win_size: PhysicalSize<u32>) -> glam::Mat4 {
        let right = win_size.width as f32 * 0.5;
        let top = win_size.height as f32 * 0.5;
        let cam_pos = glam::vec3(0.0, 0., 0.);
        let projection = glam::Mat4::orthographic_rh(-right, right, -top, top, -1.0, 1.0);

        let zoom_scale = glam::Mat4::from_scale(glam::vec3(0.5, 0.5, 1.0));

        let view = glam::Mat4::look_at_rh(
            cam_pos,
            glam::Vec3::Z + glam::vec3(cam_pos.x, cam_pos.y, cam_pos.z),
            glam::Vec3::Y,
        );
        // let translate = glam::Mat4::from_translation(-cam_pos);
        // let translate_inv = glam::Mat4::from_translation(cam_pos);
        let transform = projection;

        transform
    }

    fn create_vertex_buffer(device: &wgpu::Device) -> wgpu::Buffer {
        let vertex_data = [
            Vertex::vertex([-1., -1.], [0., 0.]),
            Vertex::vertex([-1., 1.], [0., 1.]),
            Vertex::vertex([1., 1.], [1., 1.]),
            Vertex::vertex([1., 1.], [1., 1.]),
            Vertex::vertex([1., -1.], [1., 0.]),
            Vertex::vertex([-1., -1.], [0., 0.]),
        ];

        let vertex_buf = wgpu::util::DeviceExt::create_buffer_init(
            device,
            &wgpu::util::BufferInitDescriptor {
                label: Some("Vertex Buffer"),
                contents: bytemuck::cast_slice(&vertex_data),
                usage: wgpu::BufferUsages::VERTEX,
            },
        );

        vertex_buf
    }

    fn create_buffers(
        device: &wgpu::Device,
        cam_transform: glam::Mat4,
    ) -> (wgpu::Buffer, wgpu::Buffer) {
        let globals = GlobalData {
            cam_transform: cam_transform.to_cols_array_2d(),
        };

        use wgpu::util::DeviceExt;
        let global_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("global uniform"),
            contents: bytemuck::bytes_of(&globals),
            usage: wgpu::BufferUsages::COPY_DST | wgpu::BufferUsages::UNIFORM,
        });

        let sprite_size = std::mem::size_of::<GpuSpriteData>();
        let size = sprite_size as u64 * SpriteRenderer::SPRITE_PER_DRAW_CALL_MAX_COUNT;
        log::info!("size:{size:?}");

        #[cfg(feature = "webgl")]
        let usage = wgpu::BufferUsages::COPY_DST
            | wgpu::BufferUsages::COPY_SRC
            | wgpu::BufferUsages::UNIFORM;
        #[cfg(not(feature = "webgl"))]
        let usage = wgpu::BufferUsages::COPY_DST
            | wgpu::BufferUsages::COPY_SRC
            | wgpu::BufferUsages::STORAGE;

        let sprite_data_buffer = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("sprite storage buffer "),
            size: size,
            usage: usage,
            mapped_at_creation: false,
        });

        // let staging_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
        //     label: None,
        //     contents: bytemuck::cast_slice(&[0u8; 1024]),
        //     usage: wgpu::BufferUsages::COPY_SRC | wgpu::BufferUsages::COPY_DST,
        // });

        (global_buffer, sprite_data_buffer)
    }

    fn add_texture_to_atlas(&mut self, sprite_index: u32, texture: &Texture) {
        let (rectangle, write_texture) = match self.texture_map.get(&texture.id) {
            Some(id) => {
                let rectangle = self.atlas[*id];
                (rectangle, false)
            }
            None => {
                let img = IMGS.read().unwrap();
                let img = img.get(&texture.id).unwrap();

                let dimensions = img.dimensions();

                let alloc = self
                    .atlas
                    .allocate(size2(dimensions.0 as i32, dimensions.1 as i32))
                    .unwrap();

                self.texture_map.insert(texture.id.clone(), alloc.id);

                (alloc.rectangle, true)
            }
        };

        let atlas_size = self.atlas.size();
        let uv_offset = glam::vec2(
            rectangle.min.x as f32 / atlas_size.width as f32,
            rectangle.min.y as f32 / atlas_size.height as f32,
        );
        let uv_scale = glam::vec2(
            (rectangle.max.x as f32 - rectangle.min.x as f32) / atlas_size.width as f32,
            (rectangle.max.y as f32 - rectangle.min.y as f32) / atlas_size.height as f32,
        );

        self.sprite_data_cpu[sprite_index as usize].uv_offset = uv_offset.to_array();
        self.sprite_data_cpu[sprite_index as usize].uv_scale = uv_scale.to_array();

        if write_texture {
            let img = IMGS.read().unwrap();
            let img = img.get(&texture.id).unwrap();
            let dimensions = img.dimensions();
            self.queue.write_texture(
                wgpu::ImageCopyTexture {
                    texture: &self.texture.texture,
                    mip_level: 0,
                    origin: wgpu::Origin3d {
                        x: rectangle.min.x as u32,
                        y: rectangle.min.y as u32,
                        z: 0,
                    },
                    aspect: wgpu::TextureAspect::All,
                },
                &img,
                wgpu::ImageDataLayout {
                    offset: 0,
                    bytes_per_row: Some(
                        std::num::NonZeroU32::new(dimensions.0 * 4).unwrap().into(),
                    ),
                    rows_per_image: Some(std::num::NonZeroU32::new(dimensions.1).unwrap().into()),
                },
                wgpu::Extent3d {
                    width: dimensions.0,
                    height: dimensions.1,
                    depth_or_array_layers: 1,
                },
            );
            // log::info!("alloc:{:?}", rectangle);
            // log::info!("uv_Scale:{:?} , uv_offset:{:?}", uv_scale, uv_offset);
            // log::info!("atlas_size :{:?}", atlas_size);
        }

        self.sprite_data_buffer_update.replace(true);
        //   TODO:only upload the changed data not the whole buffer
        // self.queue.write_buffer(
        //     &self.sprite_data_buffer,
        //     0,
        //     bytemuck::cast_slice(&self.sprite_data_cpu),
        // );
    }
    fn create_atlas_texture(limits: &wgpu::Limits, device: &wgpu::Device) -> GpuTexture {
        // BUG chrome : Buffer size (268435460) exceeds the max buffer size limit (268435456)
        // dawn adds 4 extra bytes causing the texture allocation to crash
        let width = limits.max_texture_dimension_2d - 4;
        let height = limits.max_texture_dimension_2d - 4;

        let texture_descriptor = wgpu::TextureDescriptor {
            size: wgpu::Extent3d {
                width,
                height,
                depth_or_array_layers: 1,
            },
            mip_level_count: 1,
            sample_count: 1,
            dimension: wgpu::TextureDimension::D2,
            format: wgpu::TextureFormat::Rgba8Unorm,
            usage: wgpu::TextureUsages::TEXTURE_BINDING | wgpu::TextureUsages::COPY_DST,
            label: None,
            view_formats: &[],
        };

        let texture = device.create_texture(&wgpu::TextureDescriptor {
            label: Some("texture"),
            ..texture_descriptor
        });

        let texture_view = texture.create_view(&wgpu::TextureViewDescriptor::default());

        let tex = GpuTexture {
            texture,
            view: texture_view,
            width,
            height,
        };

        tex
        // let key = self.textures.len() as u32;
        // self.textures.insert(key, tex);

        // key
    }
}

// systems
impl SpriteRenderer {
    fn on_render(mut sprite_renderer: NonSendMut<SpriteRenderer>) {
        let SpriteRenderer {
            adapter,
            device,
            pipeline,
            queue,
            surface,
            bind_group,
            vertex_buffer,
            sprite_data_buffer_update,
            ..
        } = &*sprite_renderer;
        let frame = surface
            .get_current_texture()
            .expect("Failed to acquire next swap chain texture");
        let view = frame
            .texture
            .create_view(&wgpu::TextureViewDescriptor::default());
        let mut encoder =
            device.create_command_encoder(&wgpu::CommandEncoderDescriptor { label: None });
        {
            let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: None,
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &view,
                    resolve_target: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(wgpu::Color::GREEN),
                        store: true,
                    },
                })],
                depth_stencil_attachment: None,
            });
            rpass.set_pipeline(&pipeline);
            rpass.set_bind_group(0, bind_group, &[]);

            rpass.set_vertex_buffer(0, vertex_buffer.slice(..));

            if sprite_renderer.sprite_data_cpu.len() as u64 > Self::SPRITE_PER_DRAW_CALL_MAX_COUNT {
                let batch_count = sprite_renderer.sprite_data_cpu.len()
                    / Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize;

                for i in 0..batch_count {
                    // log::info!(
                    //     "from :{:?} , to:{:?}",
                    //     i * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize,
                    //     (i + 1) * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize
                    // );
                    sprite_renderer.queue.write_buffer(
                        &sprite_renderer.sprite_data_buffer,
                        0,
                        bytemuck::cast_slice(
                            &sprite_renderer.sprite_data_cpu[i
                                * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize
                                ..(i + 1) * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize],
                        ),
                    );

                    rpass.draw(0..6, 0..Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as u32);
                }

                let leftovers = sprite_renderer.sprite_data_cpu.len()
                    % Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize;
                // log::warn!("draw calls count  {:?}", batch_count);
                // log::warn!(
                //     "sprite count {:?} , sprites_per_draw_call :{:?}",
                //     sprite_renderer.sprite_data_cpu.len(),
                //     Self::SPRITE_PER_DRAW_CALL_MAX_COUNT
                // );
                if leftovers != 0 {
                    sprite_renderer.queue.write_buffer(
                        &sprite_renderer.sprite_data_buffer,
                        0,
                        bytemuck::cast_slice(
                            &sprite_renderer.sprite_data_cpu[batch_count
                                * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize
                                ..batch_count * Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as usize
                                    + leftovers as usize],
                        ),
                    );

                    rpass.draw(0..6, 0..Self::SPRITE_PER_DRAW_CALL_MAX_COUNT as u32);
                }
            } else {
                if sprite_data_buffer_update.clone().take() == true {
                    sprite_renderer.queue.write_buffer(
                        &sprite_renderer.sprite_data_buffer,
                        0,
                        bytemuck::cast_slice(&sprite_renderer.sprite_data_cpu),
                    );
                    sprite_renderer.sprite_data_buffer_update.replace(false);
                }

                rpass.draw(0..6, 0..sprite_renderer.sprite_data_cpu.len() as u32);
            }
        }

        queue.submit(Some(encoder.finish()));
        frame.present();
    }

    fn update_sprite_transform(
        query: Query<(&Transform, &Size, Entity), Or<(Changed<Size>, Changed<Transform>)>>,
        mut sprite_renderer: NonSendMut<SpriteRenderer>,
    ) {
        for (transform, sprite, entity) in query.iter() {
            let scale = glam::Mat4::from_scale(glam::vec3(sprite.size.x, sprite.size.y, 1.0));
            let sprite_transform = (transform.matrix * scale).to_cols_array_2d();

            match sprite_renderer.entities_to_index.get(&entity).cloned() {
                Some(index) => {
                    sprite_renderer.sprite_data_cpu[index as usize].transform = sprite_transform;
                }
                None => {
                    let sprite = GpuSpriteData {
                        transform: sprite_transform,
                        uv_offset: [0.0, 0.0],
                        uv_scale: [1.0, 1.0],
                        texture_layer: [0.0, 0.0, 0.0, 0.0],
                    };

                    sprite_renderer.sprite_data_cpu.push(sprite);
                    let last_index = sprite_renderer.sprite_data_cpu.len() - 1;
                    sprite_renderer
                        .entities_to_index
                        .insert(entity, last_index as u32);
                }
            };
        }

        sprite_renderer.sprite_data_buffer_update.replace(true);
        // let cmd = sprite_renderer
        //     .device
        //     .create_command_encoder(&wgpu::CommandEncoderDescriptor { label: None });
        // {
        // TODO:only upload the changed data not the whole buffer
        // sprite_renderer.queue.write_buffer(
        //     &sprite_renderer.sprite_data_buffer,
        //     0,
        //     bytemuck::cast_slice(&sprite_renderer.sprite_data_cpu),
        // );
        // }
        // sprite_renderer.queue.submit(Some(cmd.finish()));
    }

    fn update_sprite_texture(
        query: Query<(&Transform, &Size, &Texture, Entity), Changed<Texture>>,
        mut sprite_renderer: NonSendMut<SpriteRenderer>,
    ) {
        for (transform, size, texture, entity) in &query {
            let sprite_index = { *sprite_renderer.entities_to_index.get(&entity).unwrap() };
            sprite_renderer.add_texture_to_atlas(sprite_index, &texture);
        }
    }

    pub async fn attach_sprite_renderer(
        world: &mut World,
        schedule: &mut Schedule,
        window: &Window,
    ) {
        let sprite_renderer = SpriteRenderer::new(&window).await;
        world.insert_non_send_resource(sprite_renderer);
        schedule.add_system(SpriteRenderer::on_render);
        schedule.add_system(SpriteRenderer::update_sprite_transform.after(update_transform_sys));
        schedule.add_system(
            SpriteRenderer::update_sprite_texture.after(SpriteRenderer::update_sprite_transform),
        );
    }
}
