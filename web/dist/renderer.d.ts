import THREE = require("three");
export declare class MeshComponent {
    mesh: typeof THREE.Mesh;
}
export declare class RenderData {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.Camera);
}
export declare const RenderSystem: import("sim-ecs").ISystem<Readonly<Readonly<Readonly<{
    actions: import("sim-ecs").ISystemActions;
    renderer: import("sim-ecs").ISystemResource<RenderData> & RenderData;
    query: import("sim-ecs").IComponentsQuery<{
        mesh: any;
    }>;
}>>>>;
