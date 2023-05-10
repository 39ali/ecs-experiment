import { IRuntimeWorld } from "sim-ecs";
export declare enum EasingFunction {
    QuadraticIn = 0,
    BounceOut = 1
}
export declare class AnimateComponent {
    sequences: Seq[];
    add(seq: Seq): this;
    addTween(t: Tween): this;
}
export declare class TweenTarget<T, J> {
    start: J;
    end: J;
    ty: any;
    constructor(start: J, end: J, className: any);
    lerp(target: T, r: number): any;
}
export declare class Tween {
    ease: EasingFunction;
    duration: number;
    target: TweenTarget<any, any>;
    startAbs: number;
    constructor(ease: EasingFunction, duration: number, target: TweenTarget<any, any>);
    then(tween: Tween): Seq;
    then_delay(duration: number): Seq;
}
export declare class Seq {
    tweens: Tween[];
    constructor();
    then(tween: Tween): this;
    then_delay(duration: number): this;
}
export declare class Delay extends Tween {
    duration: number;
    constructor(duration: number);
}
declare enum AnimationSystemState {
    Play = 0,
    Pause = 1,
    Reset = 2,
    GoToTimeWithUpdate = 3,
    GoToTimeWithoutUpdate = 4
}
export declare class AnimationSystemInfo {
    lastTime: number;
    currentTime: number;
    state: AnimationSystemState;
    dt: number;
    totalTime: number;
    needsUpdate: boolean;
    constructor(lastTime?: number, currentTime?: number, state?: AnimationSystemState, dt?: number, totalTime?: number, needsUpdate?: boolean);
}
export declare const AnimationControllerSystem: import("sim-ecs").ISystem<Readonly<Readonly<Readonly<Readonly<{
    actions: import("sim-ecs").ISystemActions;
    animationInfo: import("sim-ecs").ISystemResource<AnimationSystemInfo> & AnimationSystemInfo;
    query: import("sim-ecs").IComponentsQuery<{
        anim: any;
        entity: any;
    }>;
}>>>>>;
export declare const AnimationSystem: import("sim-ecs").ISystem<Readonly<Readonly<Readonly<Readonly<{
    actions: import("sim-ecs").ISystemActions;
    animationInfo: import("sim-ecs").ISystemResource<AnimationSystemInfo> & AnimationSystemInfo;
    query: import("sim-ecs").IComponentsQuery<{
        anim: any;
        entity: any;
    }>;
}>>>>>;
export declare function setWorld(wo: IRuntimeWorld): void;
export {};
