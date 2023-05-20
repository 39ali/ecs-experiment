use std::fmt::Debug;

use bevy_ecs::{
    prelude::Component,
    system::{Query, Res, ResMut, Resource},
};

use dyn_clone::DynClone;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::console;

use crate::WORLD;

macro_rules! add_to_animation_sys {
    // macth like arm for macro
    ($schedule:expr,$component:ty) => {{
        $schedule.add_system(animation_controller_sys::<$component>);
        $schedule.add_system(animation_sys::<$component>);
    }};
}

pub trait Tweenable<T>: Send + Sync + DynClone + Debug {
    fn duration(&self) -> f32;
    fn start_abs(&self) -> f32;
    fn set_start_abs(&mut self, v: f32);
    fn lerp(&mut self, comp: &mut T, ratio: f32);
    fn ease(&self) -> EasingFunction;
}

pub type BoxedTweenable<T> = Box<dyn Tweenable<T>>;

#[derive(Debug, Clone, Copy)]
pub enum EasingFunction {
    QuadraticIn,
    BounceOut,
}
pub trait TweenTarget<T>: DynClone + Debug {
    fn lerp(&mut self, target: &mut T, ratio: f32);
}

type BoxedTweenTarget<T> = Box<dyn TweenTarget<T> + Send + Sync + 'static>;
pub struct Tween<T> {
    // absolute
    pub start_abs: f32,
    pub ease: EasingFunction,
    pub duration: f32,
    pub target: BoxedTweenTarget<T>,
}

impl<T> Tweenable<T> for Tween<T> {
    fn duration(&self) -> f32 {
        self.duration
    }

    fn start_abs(&self) -> f32 {
        self.start_abs
    }

    fn set_start_abs(&mut self, v: f32) {
        self.start_abs = v;
    }

    fn lerp(&mut self, comp: &mut T, ratio: f32) {
        self.target.lerp(comp, ratio)
    }

    fn ease(&self) -> EasingFunction {
        self.ease
    }
}

impl<T> Clone for Tween<T> {
    fn clone(&self) -> Self {
        Self {
            start_abs: self.start_abs,
            ease: self.ease,
            duration: self.duration,
            target: dyn_clone::clone_box(&*self.target),
        }
    }
}

impl<T> std::fmt::Debug for Tween<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Tween")
            .field("ty", &std::any::type_name::<T>())
            .field("start_abs", &self.start_abs)
            .field("ease", &self.ease)
            .field("duration", &self.duration)
            .field("target", &self.target)
            .finish()
    }
}

impl<T: 'static> Tween<T> {
    // target: TweenTarget<any, any>
    pub fn new<L>(ease: EasingFunction, duration: f32, target: L) -> Self
    where
        L: TweenTarget<T> + Send + Sync + 'static,
    {
        Self {
            start_abs: 0.0,
            ease,
            duration,
            target: Box::new(target),
        }
    }

    pub fn then(&self, tween: impl Tweenable<T> + 'static) -> Seq<T> {
        let mut seq = Seq::new();

        seq.then(self.clone());
        seq.then(tween);
        seq
    }
    pub fn then_delay(&self, duration: f32) -> Seq<T> {
        let mut seq = Seq::new();
        seq.then(self.clone());
        seq.then_delay(duration);
        seq
    }
}

#[derive(Clone, Debug)]
pub struct Delay {
    // absolute
    pub start_abs: f32,
    pub duration: f32,
}

impl<T> Tweenable<T> for Delay {
    fn duration(&self) -> f32 {
        self.duration
    }

    fn start_abs(&self) -> f32 {
        self.start_abs
    }

    fn set_start_abs(&mut self, v: f32) {
        self.start_abs = v;
    }

    fn lerp(&mut self, comp: &mut T, ratio: f32) {
        // self.target.lerp(comp, ratio)
    }

    fn ease(&self) -> EasingFunction {
        EasingFunction::BounceOut
    }
}

impl Delay {
    // target: TweenTarget<any, any>
    pub fn new(duration: f32) -> Self
// where
    //     L: TweenTarget<T> + Send + Sync + 'static,
    {
        Self {
            start_abs: 0.0,
            duration,
        }
    }

    pub fn then<T>(&self, tween: impl Tweenable<T> + 'static) -> Seq<T> {
        let mut seq = Seq::new();

        seq.then(self.clone());
        seq.then(tween);
        seq
    }
    pub fn then_delay<T>(&self, duration: f32) -> Seq<T> {
        let mut seq = Seq::new();

        seq.then(self.clone());
        seq.then_delay(duration);
        seq
    }
}

#[derive(Debug)]
pub struct Seq<T> {
    pub tweens: Vec<BoxedTweenable<T>>,
}

impl<T> Seq<T> {
    pub fn new() -> Self {
        Self { tweens: Vec::new() }
    }

    pub fn then(&mut self, tween: impl Tweenable<T> + 'static) -> &mut Self {
        let start_time = if self.tweens.is_empty() {
            0.0
        } else {
            let last = self.tweens.last().unwrap();
            last.start_abs() + last.duration()
        };

        self.tweens.push(Box::new(tween));
        let last = self.tweens.last_mut().unwrap();
        last.set_start_abs(start_time);
        self
    }
    pub fn then_delay(&mut self, duration: f32) -> &mut Self {
        let start_time = if self.tweens.is_empty() {
            0.0
        } else {
            let last = self.tweens.last().unwrap();
            last.start_abs() + last.duration()
        };

        let mut delay = Delay::new(duration);

        delay.start_abs = start_time;
        self.tweens.push(Box::new(delay));
        self
    }
}

#[derive(Component)]
pub struct AnimateComponent<T: Component> {
    pub sequences: Vec<Seq<T>>,
}

impl<T: Component> AnimateComponent<T> {
    pub fn new() -> Self {
        Self {
            sequences: Vec::new(),
        }
    }
    pub fn add_seq(&mut self, seq: Seq<T>) -> &mut Self {
        self.sequences.push(seq);
        self
    }

    pub fn add_tween(&mut self, t: Tween<T>) -> &mut Self {
        let mut s = Seq::new();
        s.then(t);
        self.sequences.push(s);
        self
    }
}

impl<T: Component + std::fmt::Debug> std::fmt::Debug for AnimateComponent<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Animator")
            .field("sequences", &self.sequences)
            .finish()
    }
}

#[derive(Debug)]
pub enum AnimationSystemState {
    Play,
    Pause,
    Reset,
    GoToTimeWithUpdate,
    GoToTimeWithoutUpdate,
}

#[derive(Resource, Debug)]
pub struct AnimationSystemInfo {
    pub lastTime: f32,
    pub currentTime: f32,
    pub state: AnimationSystemState,
    pub dt: f32,
    pub totalTime: f32,
    pub needsUpdate: bool,
}
impl Default for AnimationSystemInfo {
    fn default() -> Self {
        Self {
            lastTime: 0.0,
            currentTime: 0.0,
            state: AnimationSystemState::Play,
            dt: 16.66,
            totalTime: 0.0,
            needsUpdate: true,
        }
    }
}

/////////////////////////// systems -------------------------/////////////////////////

pub fn animation_sys<T: Component + Debug>(
    mut animationInfo: ResMut<AnimationSystemInfo>,
    mut query: Query<(&mut AnimateComponent<T>, &mut T)>,
) {
    for (mut animate, mut target_component) in &mut query {
        match animationInfo.state {
            AnimationSystemState::Play => {
                //play
                for seq in &mut animate.sequences {
                    for tween in &mut seq.tweens {
                        if (tween.start_abs() <= animationInfo.currentTime
                            && tween.start_abs() + tween.duration() >= animationInfo.currentTime)
                        {
                            let end = tween.start_abs() + tween.duration();

                            let r = (animationInfo.currentTime - tween.start_abs())
                                / (end - tween.start_abs());

                            let ratio = easing_function_to_ratio(tween.ease(), r);
                            // console::log_1(
                            //     &format!("target_component{:?}", target_component).into(),
                            // );

                            tween.lerp(&mut target_component, ratio);
                            break;
                        }
                    }
                }
            }
            AnimationSystemState::Pause => return,
            AnimationSystemState::Reset => {
                for seq in &mut animate.sequences {
                    let iter = seq.tweens.iter_mut().rev();
                    for tween in iter {
                        tween.lerp(&mut target_component, 0.0);
                    }
                }

                animationInfo.state = AnimationSystemState::Pause;
            }
            AnimationSystemState::GoToTimeWithUpdate => {
                for seq in &mut animate.sequences {
                    for tween in &mut seq.tweens {
                        if tween.start_abs() <= animationInfo.currentTime
                            && tween.start_abs() + tween.duration() <= animationInfo.currentTime
                        {
                            tween.lerp(&mut target_component, 1.0);
                        }
                    }
                }
            }
            AnimationSystemState::GoToTimeWithoutUpdate => {
                for seq in &mut animate.sequences {
                    for tween in &mut seq.tweens {
                        if (tween.start_abs() <= animationInfo.currentTime
                            && tween.start_abs() + tween.duration() >= animationInfo.currentTime)
                        {
                            let end = tween.start_abs() + tween.duration();
                            let r = (animationInfo.currentTime - tween.start_abs())
                                / (end - tween.start_abs());
                            let ratio = easing_function_to_ratio(tween.ease(), r);

                            tween.lerp(&mut target_component, ratio);
                            break;
                        }
                    }
                }
            }
        };

        if animationInfo.currentTime < 0.0 || animationInfo.currentTime > animationInfo.totalTime {
            return;
        }

        animationInfo.currentTime += animationInfo.dt;
    }
}

pub fn animation_controller_sys<T: Component + Debug>(
    mut animationInfo: ResMut<AnimationSystemInfo>,
    mut query: Query<(&mut AnimateComponent<T>, &mut T)>,
) {
    if animationInfo.needsUpdate {
        animationInfo.needsUpdate = false;

        let mut total_time: f32 = 0.0;
        for (mut animate, mut target_component) in &mut query {
            //play
            for seq in &mut animate.sequences {
                for tween in &mut seq.tweens {
                    total_time = total_time.max(tween.start_abs() + tween.duration());
                }
            }
        }
        animationInfo.totalTime = total_time;
    }
}

pub fn init_animations_buttons_sys() {
    // we can do anything with any data in the Bevy ECS here!

    let document = web_sys::window().unwrap().document().unwrap();

    // pause/play button
    {
        let button = document.get_element_by_id("button").unwrap();
        let button: web_sys::HtmlElement = button
            .dyn_into::<web_sys::HtmlElement>()
            .map_err(|_| ())
            .unwrap();
        {
            let cb = Closure::<dyn FnMut(_)>::new(|_event: web_sys::InputEvent| {
                let mut world = WORLD.write().unwrap();
                let mut animationInfo = world.get_resource_mut::<AnimationSystemInfo>().unwrap();

                let document = web_sys::window().unwrap().document().unwrap();
                let button = document.get_element_by_id("button").unwrap();
                let button: web_sys::HtmlElement = button
                    .dyn_into::<web_sys::HtmlElement>()
                    .map_err(|_| ())
                    .unwrap();
                match animationInfo.state {
                    AnimationSystemState::Play => {
                        animationInfo.state = AnimationSystemState::Pause;
                        button.set_inner_html("PAUSE")
                    }
                    AnimationSystemState::Pause => {
                        animationInfo.state = AnimationSystemState::Play;
                        button.set_inner_html("Play")
                    }
                    _ => {}
                }
            });

            button
                .add_event_listener_with_callback("click", &cb.as_ref().unchecked_ref())
                .unwrap();
            cb.forget();
        }
    }

    // reset button
    {
        let reset = document.get_element_by_id("reset").unwrap();
        let reset: web_sys::HtmlElement = reset
            .dyn_into::<web_sys::HtmlElement>()
            .map_err(|_| ())
            .unwrap();
        {
            let cb = Closure::<dyn FnMut(_)>::new(|_event: web_sys::InputEvent| {
                let mut world = WORLD.write().unwrap();
                let mut animationInfo = world.get_resource_mut::<AnimationSystemInfo>().unwrap();

                let document = web_sys::window().unwrap().document().unwrap();
                let button = document.get_element_by_id("button").unwrap();
                let button: web_sys::HtmlElement = button
                    .dyn_into::<web_sys::HtmlElement>()
                    .map_err(|_| ())
                    .unwrap();
                button.set_inner_html("PLAY");

                animationInfo.currentTime = 0.0;
                animationInfo.state = AnimationSystemState::Reset;
            });

            reset
                .add_event_listener_with_callback("click", &cb.as_ref().unchecked_ref())
                .unwrap();
            cb.forget();
        }
    }

    // gototime button
    {
        let gototime = document.get_element_by_id("gototime").unwrap();
        let gototime: web_sys::HtmlElement = gototime
            .dyn_into::<web_sys::HtmlElement>()
            .map_err(|_| ())
            .unwrap();
        let cb = Closure::<dyn FnMut(_)>::new(|_event: web_sys::InputEvent| {
            let mut world = WORLD.write().unwrap();
            let mut animationInfo = world.get_resource_mut::<AnimationSystemInfo>().unwrap();

            let document = web_sys::window().unwrap().document().unwrap();
            let button = document.get_element_by_id("button").unwrap();
            let button: web_sys::HtmlElement = button
                .dyn_into::<web_sys::HtmlElement>()
                .map_err(|_| ())
                .unwrap();
            button.set_inner_html("PLAY");

            let time_input_value = document.get_element_by_id("time").unwrap();
            let time_input_value: web_sys::HtmlInputElement = time_input_value
                .dyn_into::<web_sys::HtmlInputElement>()
                .map_err(|_| ())
                .unwrap();
            match time_input_value.value().parse::<f32>() {
                Ok(val) => animationInfo.currentTime = val,
                Err(err) => console::log_1(&format!("err{:?}", err).into()),
            };

            animationInfo.state = AnimationSystemState::GoToTimeWithoutUpdate;
        });

        gototime
            .add_event_listener_with_callback("click", &cb.as_ref().unchecked_ref())
            .unwrap();
        cb.forget();
    }

    // gototimeupdate button
    {
        let gototimeupdate = document.get_element_by_id("gototimeupdate").unwrap();
        let gototimeupdate: web_sys::HtmlElement = gototimeupdate
            .dyn_into::<web_sys::HtmlElement>()
            .map_err(|_| ())
            .unwrap();
        let cb = Closure::<dyn FnMut(_)>::new(|_event: web_sys::InputEvent| {
            let mut world = WORLD.write().unwrap();
            let mut animationInfo = world.get_resource_mut::<AnimationSystemInfo>().unwrap();

            let document = web_sys::window().unwrap().document().unwrap();
            let button = document.get_element_by_id("button").unwrap();
            let button: web_sys::HtmlElement = button
                .dyn_into::<web_sys::HtmlElement>()
                .map_err(|_| ())
                .unwrap();
            button.set_inner_html("PLAY");

            let time_input_value = document.get_element_by_id("time").unwrap();
            let time_input_value: web_sys::HtmlInputElement = time_input_value
                .dyn_into::<web_sys::HtmlInputElement>()
                .map_err(|_| ())
                .unwrap();

            animationInfo.lastTime = animationInfo.currentTime;
            match time_input_value.value().parse::<f32>() {
                Ok(val) => animationInfo.currentTime = val,
                Err(err) => console::log_1(&format!("err{:?}", err).into()),
            };

            animationInfo.state = AnimationSystemState::GoToTimeWithoutUpdate;
        });

        gototimeupdate
            .add_event_listener_with_callback("click", &cb.as_ref().unchecked_ref())
            .unwrap();
        cb.forget();
    }
}

pub fn update_time(animationInfo: Res<AnimationSystemInfo>) {
    let document = web_sys::window().unwrap().document().unwrap();
    let time_input_value = document.get_element_by_id("currentTime").unwrap();
    let time_input_value: web_sys::HtmlElement = time_input_value
        .dyn_into::<web_sys::HtmlElement>()
        .map_err(|_| ())
        .unwrap();

    let str = animationInfo.currentTime.to_string();
    let str = str.as_str();

    // console::log_1(&format!("target_component{:?}", time_input_value).into());
    time_input_value.set_inner_html(str);
}

pub fn easing_function_to_ratio(func: EasingFunction, val: f32) -> f32 {
    match func {
        EasingFunction::QuadraticIn => {
            let v1 = f32::clamp(val, 0.0, 1.0);
            v1 * v1
        }
        EasingFunction::BounceOut => {
            let p = f32::clamp(val, 0.0, 1.0);
            if (p < 4.0 / 11.0) {
                return (121.0 * p * p) / 16.0;
            } else if (p < 8.0 / 11.0) {
                return (363.0 / 40.0) * p * p - (99.0 / 10.0) * p + 17.0 / 5.0;
            } else if (p < 9.0 / 10.0) {
                return ((4356.0 / 361.0) * p * p - (35442.0 / 1805.0) * p + 16061.0 / 1805.0);
            } else {
                return (54.0 / 5.0) * p * p - (513.0 / 25.0) * p + 268.0 / 25.0;
            }
        }
    }
}
