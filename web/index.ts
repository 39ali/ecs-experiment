import { buildWorld, ISyncPointPrefab } from "sim-ecs";

import * as THREE from "three";
import {
  AnimateComponent,
  AnimationControllerSystem,
  AnimationSystem,
  AnimationSystemInfo,
  EasingFunction,
  setWorld,
  Tween,
  TweenTarget,
} from "./animation";
import { MeshComponent, RenderData, RenderSystem } from "./renderer";
import { ErrorHandlerSystem } from "./errorHandler";
import { TimeInfo, TimeSystem } from "./timing";

class TransformComponent {
  constructor(public position: THREE.Vector3) {}
  //scale ,rotation
}

class TransformPositionXTween extends TweenTarget<TransformComponent, number> {
  constructor(public start: number, public end: number) {
    super(start, end, TransformComponent);
  }
  public lerp(target: TransformComponent, r: number) {
    const v = super.lerp(target, r);
    target.position.x = v;
  }
}

class TransformPositionYTween extends TweenTarget<TransformComponent, number> {
  constructor(public start: number, public end: number) {
    super(start, end, TransformComponent);
  }
  public lerp(target: TransformComponent, r: number) {
    const v = super.lerp(target, r);
    target.position.y = v;
  }
}

const executionSchedule: ISyncPointPrefab = {
  // each sync point contains stages, which are work units with a defined (custom or default) scheduler
  stages: [
    // each stage also contains several systems, which are orchestrated by the stage's scheduler
    [ErrorHandlerSystem],
    [TimeSystem],
    [AnimationControllerSystem, AnimationSystem],
    [RenderSystem],
  ],
};

const startup = () => {
  const scene = new THREE.Scene();
  //   const camera = new THREE.OrthographicCamera(0, 1000, 0, 1000, 0.1, 1000);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const prepWorld = buildWorld()
    // we can inform the world about our processing logic by adding the above defined prefab
    .withDefaultScheduling((root) => root.fromPrefab(executionSchedule))
    .withComponent(MeshComponent)
    .withComponent(TransformComponent)
    .withComponent(AnimateComponent)
    .build();

  prepWorld.addResource(new RenderData(scene, renderer, camera));
  prepWorld.addResource(new AnimationSystemInfo());
  prepWorld.addResource(new TimeInfo());

  // create entity

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  const cubeEnt = prepWorld
    /// invoking the entity builder in this way automatically adds the entity to the world
    .buildEntity()
    .with(MeshComponent, cube)
    .with(TransformComponent, cube.position);

  //animate cube 1
  const tween = new Tween(
    EasingFunction.QuadraticIn,
    2000,
    new TransformPositionXTween(0, 5)
  )
    .then(
      new Tween(
        EasingFunction.QuadraticIn,
        2000,
        new TransformPositionYTween(0, 2)
      )
    )
    .then_delay(2000)
    .then(
      new Tween(
        EasingFunction.QuadraticIn,
        2000,
        new TransformPositionYTween(2, 0)
      )
    )
    .then(
      new Tween(
        EasingFunction.QuadraticIn,
        2000,
        new TransformPositionXTween(5, 0)
      )
    );
  cubeEnt.with(new AnimateComponent().add(tween));
  cubeEnt.build();

  // create cube 2
  if (true) {
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cube2 = new THREE.Mesh(geometry, material2);
    scene.add(cube2);
    const cubeEnt2 = prepWorld
      .buildEntity()
      .with(MeshComponent, cube2)
      .with(TransformComponent, cube2.position);

    const tween2 = new Tween(
      EasingFunction.QuadraticIn,
      1,
      new TransformPositionXTween(-5, -5)
    )
      .then(
        new Tween(
          EasingFunction.BounceOut,
          2000,
          new TransformPositionYTween(0, 2)
        )
      )
      .then_delay(2000)
      .then(
        new Tween(
          EasingFunction.BounceOut,
          2000,
          new TransformPositionYTween(2, 0)
        )
      );
    cubeEnt2.with(new AnimateComponent().add(tween2));
    cubeEnt2.build();
  }

  (async () => {
    // when everything is added, it's time to run the simulation
    // to do so, a runtime environment must be prepared:
    const runWorld = await prepWorld.prepareRun();
    setWorld(runWorld);
    // sim-ecs provides an optimized main-loop, but can also do single steps
    await runWorld.start();
  })()
    .catch(console.error)
    .then(() => console.log("Finished."));
};

window.onload = () => {
  startup();
};
