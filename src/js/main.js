import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { createTable, allTextures, transformTexture } from "./table";
import { createTableLegsRectangle } from "./legs";
import { Pane } from "tweakpane";

let dimensions = {
  width: window.innerWidth / 2,
  height: window.innerHeight,
};

let canvas,
  camera,
  ambientLight,
  pointLight,
  scene,
  controls,
  renderer,
  table,
  tableLegs,
  material,
  debug;

const inputFields = Array.from(
  document.querySelectorAll(".configuration-size-inputField")
);

// create basic scene
function init() {
  canvas = document.querySelector("#canvas");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#fff");

  camera = new THREE.PerspectiveCamera(
    75,
    dimensions.width / dimensions.height,
    0.1,
    100
  );
  camera.position.set(0, 0.75, 1.5);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  ambientLight = new THREE.AmbientLight("#fff", 1);

  pointLight = new THREE.PointLight("#fff", 1, 100);
  pointLight.position.set(0, 1, -1.5);
  pointLight.rotation.x = Math.PI * 0.5;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // basic table
  material = new THREE.MeshStandardMaterial();
  material.roughness = 0.6;
  const mapTexture = allTextures.wood.map;
  const transformedMapTexture = transformTexture(mapTexture);
  material.map = transformedMapTexture;

  table = createTable("rect", material);
  tableLegs = createTableLegsRectangle(table);

  debug = new Pane();

  scene.add(camera, ambientLight, table, tableLegs, pointLight);

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
  if (orientation === "circle") {
    table.scale.x = event.target.value / 200;
    table.scale.z = event.target.value / 200;
  } else {
    table.scale[orientation] = event.target.value / 100;
  }

  scene.remove(tableLegs);
  tableLegs = createTableLegsRectangle(table);
  scene.add(tableLegs);
});

// change shape and show relevent inputfield size
const shape = document.querySelector(".configuration-shape");
shape.addEventListener("click", (event) => {
  const objectShape = event.target.dataset.shape;
  if (objectShape) {
    scene.remove(table, tableLegs);
    table = createTable(objectShape, material);
    tableLegs = createTableLegsRectangle(table);
    scene.add(table, tableLegs);

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
    const transformedMapTexture = transformTexture(mapTexture);
    table.material.map = transformedMapTexture;
    table.material.needsUpdate = true;
  }
});

// tweak parameters
const tableDebug = debug.addFolder({
  title: "table",
});
tableDebug
  .addInput(material, "roughness", { min: 0, max: 1, step: 0.1 })
  .on("change", (ev) => (material.roughness = ev.value));

tableDebug
  .addInput(material, "metalness", { min: 0, max: 1, step: 0.1 })
  .on("change", (ev) => (material.metalness = ev.value));

const legsDebug = debug.addFolder({
  title: "legs",
});

legsDebug
  .addInput(tableLegs.children[0].material, "metalness", {
    min: 0,
    max: 1,
    step: 0.1,
  })
  .on("change", (ev) => {
    tableLegs.children.map((leg) => (leg.material.metalness = ev.value));
  });

legsDebug
  .addInput(tableLegs.children[0].material, "roughness", {
    min: 0,
    max: 1,
    step: 0.1,
  })
  .on("change", (ev) => {
    tableLegs.children.map((leg) => (leg.material.roughness = ev.value));
  });
