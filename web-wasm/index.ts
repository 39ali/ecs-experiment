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
function update_transform_sys(transform: ECS.Transform, three_mesh: ECS.Mesh) {
  let mesh = meshes[three_mesh.mesh_index];

  mesh.position.x = transform.position.x;
  // console.warn(mesh.position);
}

// function animation_button_sys() {
//   const button = document.getElementById("button") as HTMLElement;
//   button.addEventListener("click", () => {
//     switch (animationInfo.state) {
//       case AnimationSystemState.Play: {
//         animationInfo.state = AnimationSystemState.Pause;
//         button.innerHTML = "PAUSE";
//         break;
//       }
//       case AnimationSystemState.Pause: {
//         animationInfo.state = AnimationSystemState.Play;
//         button.innerHTML = "Play";
//         break;
//       }
//     }
//   });

//   // const button_reset = document.getElementById("reset") as HTMLElement;
//   // button_reset.addEventListener("click", () => {
//   //   animationInfo.state = AnimationSystemState.Reset;
//   //   animationInfo.currentTime = 0;
//   //   button.innerHTML = "Play";
//   // });

//   // const time_input_value = document.getElementById("time") as HTMLElement;
//   // const button_go_to_time = document.getElementById("gototime") as HTMLElement;

//   // button_go_to_time.addEventListener("click", () => {
//   //   animationInfo.state = AnimationSystemState.GoToTimeWithoutUpdate;
//   //   animationInfo.currentTime = parseInt((time_input_value as any).value);
//   //   button.innerHTML = "Pause";
//   // });

//   // const button_go_to_time_update = document.getElementById(
//   //   "gototimeupdate"
//   // ) as HTMLElement;

//   // button_go_to_time_update.addEventListener("click", () => {
//   //   animationInfo.state = AnimationSystemState.GoToTimeWithUpdate;
//   //   animationInfo.lastTime = animationInfo.currentTime + 0;
//   //   animationInfo.currentTime = parseInt((time_input_value as any).value);
//   //   button.innerHTML = "Play";
//   // });
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
  ecs.add_system(update_transform_sys, false);
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

  ecs.create_entity_with_mesh(meshes.length - 1);
};

window.onload = () => {
  startup2();
};
