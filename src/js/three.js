import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { createTable } from "./table";

let dimensions = {
  width: window.innerWidth / 2,
  height: window.innerHeight,
};

let canvas, camera, scene, controls, renderer, table;

// create basic scene
function init() {
  canvas = document.querySelector("#canvas");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ffffff");

  camera = new THREE.PerspectiveCamera(
    75,
    dimensions.width / dimensions.height,
    0.1,
    100
  );
  camera.position.set(0, 0.5, 2);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(camera);

  // basic cube
  table = createTable();
  table.scale.set(1.5, 0.05, 0.5);
  scene.add(table);

  window.addEventListener("resize", onWindowResize);
  animate();
}

function onWindowResize() {
  // update dimensions
  dimensions = {
    width: window.innerWidth / 2,
    height: window.innerHeight,
  };

  //update camera
  camera.aspect = dimensions.width / dimensions.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animate);
}

init();

//change cube input change
const lengthInput = document.querySelector("#length-input");
lengthInput.addEventListener("change", (event) => {
  const length = event.target.value;
  table.scale.x = length / 100;
});

const widthInput = document.querySelector("#width-input");
widthInput.addEventListener("change", (event) => {
  const width = event.target.value;
  table.scale.z = width / 100;
});

const heightInput = document.querySelector("#height-input");
heightInput.addEventListener("change", (event) => {
  const height = event.target.value;
  table.scale.y = height / 100;
});
