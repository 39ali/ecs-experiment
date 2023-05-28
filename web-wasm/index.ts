import * as THREE from "three";

export class RenderData {
  constructor(
    public scene: THREE.Scene,
    public renderer: THREE.WebGLRenderer,
    public camera: THREE.Camera
  ) {}
}

let renderData: RenderData;
let meshes: THREE.Mesh[] = [];
function RenderSys() {
  let renderer = renderData;
  renderer.renderer.render(renderer.scene, renderer.camera);
}

import * as ECS from "./pkg";

// init ecs
// function update_transform_sys(
//   transform: ECS.TransformJS,
//   three_mesh: ECS.Mesh
// ) {
//   let mesh = meshes[three_mesh.mesh_index];

//   mesh.position.x = transform.position.x;
//   // console.warn(mesh.position);
// }

const startup = async () => {
  const ecs = await ECS;
  ecs.start();
  const scene = new THREE.Scene();

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
  renderData = new RenderData(scene, renderer, camera);

  // create mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  meshes.push(cube);

  ecs.create_entity_with_mesh(meshes.length - 1);

  ecs.add_system(RenderSys, true);
  // ecs.add_system(update_transform_sys, false);
};

const startup2 = async () => {
  const ecs = await ECS;
  ecs.start();
  // const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.z = 5;

  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);
  // renderData = new RenderData(scene, renderer, camera);

  // // create mesh
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // meshes.push(cube);

  // ecs.create_entity_with_mesh(meshes.length - 1);
};

window.onload = () => {
  // startup();
  startup2();
};
