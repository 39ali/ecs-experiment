import {
  Actions,
  ReadResource,
  Write,
  createSystem,
  queryComponents,
} from "sim-ecs";
import THREE = require("three");
export class MeshComponent {
  public mesh = THREE.Mesh;
}

export class RenderData {
  constructor(
    public scene: THREE.Scene,
    public renderer: THREE.WebGLRenderer,
    public camera: THREE.Camera
  ) {}
}

export const RenderSystem = createSystem({
  actions: Actions,

  renderer: ReadResource(RenderData),
  query: queryComponents({
    mesh: Write(MeshComponent),
  }),
})
  .withName("RenderSystem")
  .withRunFunction(({ actions, query, renderer }) => {
    renderer.renderer.render(renderer.scene, renderer.camera);
  })
  .build();
