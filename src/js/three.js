import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";

let dimensions = {
  width: window.innerWidth / 2,
  height: window.innerHeight,
};

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");

const camera = new THREE.PerspectiveCamera(
  75,
  dimensions.width / dimensions.height,
  0.1,
  100
);
camera.position.set(0, 0.5, 3);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(dimensions.width, dimensions.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(camera);

function onWindowResize() {
  //update camera
  camera.aspect = dimensions.width / dimensions.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", onWindowResize);

function animate() {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animate);
}

//test
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

animate();
