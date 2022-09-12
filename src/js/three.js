import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { createTable, allTextures } from "./table";

let dimensions = {
  width: window.innerWidth / 2,
  height: window.innerHeight,
};

let canvas, camera, light, scene, controls, renderer, table, material;
const inputFields = Array.from(
  document.querySelectorAll(".configuration-size-inputField")
);

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

  light = new THREE.AmbientLight("#fff");

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(camera, light);

  // basic table
  material = new THREE.MeshStandardMaterial(allTextures.wood);
  table = createTable("rect", material);
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

//change table size
const size = document.querySelector(".configuration-size");
size.addEventListener("change", (event) => {
  const orientation = event.target.dataset.orientation;
  table.scale[orientation] = event.target.value / 100;
});

// change shape and show relevent inputfield size
const shape = document.querySelector(".configuration-shape");
shape.addEventListener("click", (event) => {
  const objectShape = event.target.dataset.shape;
  if (objectShape) {
    scene.remove(table);
    table = createTable(objectShape, material);
    scene.add(table);

    // show revelant inputfield
    inputFields.map((input) => {
      if (input.dataset.type.includes(objectShape)) {
        input.classList.remove("hide");
      } else {
        input.classList.add("hide");
      }
    });
  }
});

//change texture material
const textures = document.querySelector(".configuration-texture");
textures.addEventListener("click", (event) => {
  const data = event.target.dataset.texture;
  if (data) {
    const mapTexture = allTextures[data].map;
    mapTexture.repeat.x = 2;
    mapTexture.repeat.y = 2;
    mapTexture.wrapS = THREE.RepeatWrapping;
    mapTexture.wrapT = THREE.RepeatWrapping;
    table.material.map = mapTexture;
    table.material.needsUpdate = true;
  }
});
