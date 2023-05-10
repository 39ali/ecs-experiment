import { AnimationSystemInfo } from "./animation";
export declare class TimeInfo {
    lastTime: number;
    requiredElapsed: number;
    constructor(lastTime?: number, requiredElapsed?: number);
}
export declare const TimeSystem: import("sim-ecs").ISystem<Readonly<Readonly<Readonly<{
    actions: import("sim-ecs").ISystemActions;
    animationInfo: import("sim-ecs").ISystemResource<AnimationSystemInfo> & AnimationSystemInfo;
    timeInfo: import("sim-ecs").ISystemResource<TimeInfo> & TimeInfo;
    query: import("sim-ecs").IComponentsQuery<{
        anim: any;
        entity: any;
    }>;
}>>>>;
