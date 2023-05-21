use bevy_ecs::system::Resource;
use winit::window::Window;

#[derive(Resource)]
pub struct SpriteRenderer {}

impl SpriteRenderer {
    pub async fn new(window: &Window) {
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
        log::info!(
            "downlevel_capabilities.is_webgpu_compliant():{:?}",
            downlevel_capabilities.is_webgpu_compliant()
        );
        log::info!("limits:{:?}", limits);

        let (device, queue) = (adapter.request_device(
            &wgpu::DeviceDescriptor {
                label: None,
                features: wgpu::Features::empty(),
                // Make sure we use the texture resolution limits from the adapter, so we can support images the size of the swapchain.
                limits: wgpu::Limits::downlevel_webgl2_defaults()
                    .using_resolution(adapter.limits()),
            },
            None,
        ))
        .await
        .expect("Failed to create device");
    }
}
