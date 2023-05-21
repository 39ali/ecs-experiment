use std::{
    cell::RefCell,
    collections::HashMap,
    sync::{Mutex, RwLock},
};

use js_sys::{Array, Function};
use unsafe_send_sync::UnsafeSendSync;
use wasm_bindgen::prelude::*;

use bevy_ecs::prelude::*;
use serde::{Deserialize, Serialize};
use web_sys::console;

#[macro_use]
extern crate lazy_static;

#[macro_use]
mod animation;
mod renderer;

use animation::*;
use renderer::*;
use winit::{
    event::{self, WindowEvent},
    event_loop::{ControlFlow, EventLoop},
};

#[wasm_bindgen]
#[derive(Component, Copy, Clone, Debug, Serialize, Deserialize)]
pub struct Vector3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Component, Debug)]
struct Transform {
    pub position: Vector3,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Component)]
struct Mesh {
    pub mesh_index: u32,
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    web_sys::window()
        .unwrap()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

#[derive(Clone, Debug)]
pub struct TransformPositionXTween {
    start: f32,
    end: f32,
}
impl TweenTarget<Transform> for TransformPositionXTween {
    fn lerp(&mut self, target: &mut Transform, ratio: f32) {
        target.position.x = self.start + (self.end - self.start) * ratio;
    }
}

fn update_transform_sys(mut query: Query<(&Transform, &mut Mesh)>) {
    if false {
        let js_sys = JS_SYSTEMS.borrow_mut();
        let js_func = match js_sys.get("update_transform_sys") {
            Some(func) => func,
            None => {
                console::log_1(&format!("js Function was not found ! {:?}", 0).into());
                panic!()
            }
        };

        for (transform, mesh) in &mut query {
            let transform = serde_wasm_bindgen::to_value(transform).unwrap();

            let mesh = serde_wasm_bindgen::to_value(mesh.as_ref()).unwrap();

            js_func.call2(&JsValue::null(), &transform, &mesh).unwrap();
        }
    }
}

lazy_static! {
    pub static ref WORLD: RwLock<World> = RwLock::new(World::new());
    pub static ref SCHEDULE: RwLock<Schedule> = RwLock::new(Schedule::default());
}

#[wasm_bindgen]
pub fn create_entity_with_mesh(mesh_index: u32) {
    {
        let mut world = WORLD.write().unwrap();

        let mut seq = Seq::new();
        seq.then(Tween::new(
            EasingFunction::QuadraticIn,
            2000.0,
            TransformPositionXTween { start: 0., end: 5. },
        ))
        .then_delay(2000.)
        .then(Tween::new(
            EasingFunction::QuadraticIn,
            2000.0,
            TransformPositionXTween { start: 5., end: 0. },
        ));

        let mut animate = AnimateComponent::new();
        animate.add_seq(seq);

        //spwan entity
        world.spawn((
            Transform {
                position: Vector3 {
                    x: 0.0,
                    y: 0.0,
                    z: 0.0,
                },
            },
            Mesh { mesh_index },
            // Add an Animator component to control and execute the animation.
            animate,
        ));
    }
}

#[wasm_bindgen]
pub fn insert_resource(res: JsValue) {
    let mut world = WORLD.write().unwrap();
    world.insert_non_send_resource(res);
}

lazy_static! {
    static ref JS_SYSTEMS: UnsafeSendSync<RefCell<HashMap<String, Function>>> =
        UnsafeSendSync::new(RefCell::new(HashMap::new()));
}

#[wasm_bindgen]
pub fn add_system(func: &js_sys::Function, independent: bool) {
    JS_SYSTEMS
        .borrow_mut()
        .insert(func.name().into(), func.clone());

    if independent {
        let func_name: String = func.name().into();
        let fc = move || {
            let js_syss = JS_SYSTEMS.borrow();
            let func = js_syss.get(&func_name).unwrap();
            func.apply(&JsValue::null(), &Array::new()).unwrap();
            // console::log_1(&format!("func{:?}", func).into());
        };

        let mut schedule = SCHEDULE.write().unwrap();
        schedule.add_system(fc);
    }
}

pub fn init_window() -> (winit::window::Window, EventLoop<()>) {
    let event_loop = winit::event_loop::EventLoop::new();
    let builder = winit::window::WindowBuilder::new();
    let window = builder.build(&event_loop).unwrap();

    (window, event_loop)
}

pub async fn setup() -> (winit::window::Window, EventLoop<()>) {
    let (window, event_loop) = init_window();
    {
        let mut world = WORLD.write().unwrap();

        let sprite_renderer = SpriteRenderer::new(&window).await;
        world.insert_non_send_resource(sprite_renderer);
        world.insert_resource(AnimationSystemInfo::default());
    }
    // Create a new Schedule, which defines an execution strategy for Systems
    {
        let mut schedule = SCHEDULE.write().unwrap();
        schedule.set_executor_kind(bevy_ecs::schedule::ExecutorKind::SingleThreaded);
        schedule.add_system(update_transform_sys);
        #[cfg(target_arch = "wasm32")]
        {
            schedule.add_system(update_time);
        }
        add_to_animation_sys!(schedule, Transform);

        //one time sys
        {
            let mut schedule = Schedule::default();
            schedule.set_executor_kind(bevy_ecs::schedule::ExecutorKind::SingleThreaded);
            #[cfg(target_arch = "wasm32")]
            {
                schedule.add_system(init_animations_buttons_sys);
            }
            let mut world = WORLD.write().unwrap();
            schedule.run(&mut world);
        }
    }
    (window, event_loop)
}

pub async fn run() {
    // run our logic loop
    let (window, event_loop) = setup().await;
    #[cfg(target_arch = "wasm32")]
    {
        let f = std::rc::Rc::new(std::cell::RefCell::new(None));
        let g = f.clone();
        *g.borrow_mut() = Some(Closure::new(move || {
            {
                let mut world = { &mut *WORLD.write().unwrap() };
                let mut schedule = SCHEDULE.write().unwrap();
                schedule.run(&mut world);
            }
            request_animation_frame(f.borrow().as_ref().unwrap());
        }));
        request_animation_frame(g.borrow().as_ref().unwrap());
    }
    #[cfg(not(target_arch = "wasm32"))]
    {
        event_loop.run(move |event, _, control_flow| {
            // let _ = (&instance, &adapter); // force ownership by the closure
            *control_flow = if cfg!(feature = "metal-auto-capture") {
                ControlFlow::Exit
            } else {
                ControlFlow::Poll
            };
            match event {
                event::Event::RedrawEventsCleared => {
                    window.request_redraw();
                }
                event::Event::WindowEvent {
                    event:
                        WindowEvent::Resized(size)
                        | WindowEvent::ScaleFactorChanged {
                            new_inner_size: &mut size,
                            ..
                        },
                    ..
                } => {
                    log::info!("Resizing to {:?}", size);
                    // config.width = size.width.max(1);
                    // config.height = size.height.max(1);
                    // example.resize(&config, &device, &queue);
                    // surface.configure(&device, &config);
                }
                event::Event::WindowEvent { event, .. } => match event {
                    WindowEvent::KeyboardInput {
                        input:
                            event::KeyboardInput {
                                virtual_keycode: Some(event::VirtualKeyCode::Escape),
                                state: event::ElementState::Pressed,
                                ..
                            },
                        ..
                    }
                    | WindowEvent::CloseRequested => {
                        *control_flow = ControlFlow::Exit;
                    }

                    _ => {}
                },
                event::Event::RedrawRequested(_) => {
                    let mut world: &mut bevy_ecs::world::World = { &mut *WORLD.write().unwrap() };
                    let mut schedule = SCHEDULE.write().unwrap();
                    schedule.run(&mut world);

                    // let frame = match surface.get_current_texture() {
                    //     Ok(frame) => frame,
                    //     Err(_) => {
                    //         surface.configure(&device, &config);
                    //         surface
                    //             .get_current_texture()
                    //             .expect("Failed to acquire next surface texture!")
                    //     }
                    // };
                    // let view = frame
                    //     .texture
                    //     .create_view(&wgpu::TextureViewDescriptor::default());

                    // example.render(&view, &device, &queue, &spawner);

                    // frame.present();
                }
                _ => {}
            }
        });
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn start() {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    console_log::init_with_level(log::Level::Debug).expect("could not initialize logger");
    wasm_bindgen_futures::spawn_local(run());
}
