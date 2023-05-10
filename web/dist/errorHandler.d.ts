import { SystemError } from "sim-ecs";
export declare const ErrorHandlerSystem: import("sim-ecs").ISystem<Readonly<Readonly<Readonly<{
    actions: import("sim-ecs").ISystemActions;
    errors: Readonly<import("sim-ecs/dist/events/event-reader.spec").IEventReader<import("sim-ecs/dist/_.spec").TObjectProto>>;
    systemErrors: Readonly<import("sim-ecs/dist/events/event-reader.spec").IEventReader<typeof SystemError>>;
}>>>>;
