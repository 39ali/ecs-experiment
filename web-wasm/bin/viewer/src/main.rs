use mylib::{run, setup};

// use ecs::*;
fn main() {
    // #[cfg(not(target_arch = "wasm32"))]
    {
        env_logger::init();
        setup();
        run();
    }
}
