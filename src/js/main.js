import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { createTable, allTextures } from "./table";
import { allLegs } from "./legs";
import { Pane } from "tweakpane";

let dimensions = {
  width: window.innerWidth * 0.75,
  height: window.innerHeight,
};

let canvas, camera, ambientLight, cube, scene, controls, renderer, table, tableLegs, material, debug, directLight;

const inputFields = Array.from(document.querySelectorAll(".configuration-size-inputField"));
const toggle = document.querySelector("#arrow");
const resetValues = [150, 60, 5, 100];

const textureLoader = new THREE.TextureLoader();
const check = textureLoader.load("/src/assets/image.png");

// create basic scene
function init() {
  canvas = document.querySelector("#canvas");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#fff");

  camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 100);
  camera.position.set(0, 0.75, 1.5);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  ambientLight = new THREE.AmbientLight("#fff", 0.7);

  // pointLight = new THREE.PointLight("#fff", 0.2, 100);
  // pointLight.position.set(0, 1, -1.5);
  // pointLight.rotation.x = Math.PI * 0.5;
  directLight = new THREE.DirectionalLight("#fff", 0.4);
  directLight.position.set(1, 3, -3.5);
  // const directHelper = new THREE.DirectionalLightHelper(directLight, 0.5);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // basic table
  material = new THREE.MeshStandardMaterial(allTextures.wood4);
  table = createTable("rect", material);
  tableLegs = allLegs.leg1(table);

  // debug = new Pane();

  scene.add(camera, ambientLight, table, tableLegs, directLight);

  window.addEventListener("resize", onWindowResize);

  animate();
}

function onWindowResize() {
  // update dimensions
  let factor;
  if (toggle.dataset.toggle === "hide") {
    factor = 1;
  } else {
    factor = 0.75;
  }

  dimensions = {
    width: window.innerWidth * factor,
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
  tableLegs = allLegs.leg1(table);
  scene.add(tableLegs);
});

// change shape and show relevent inputfield size
const shape = document.querySelector(".configuration-shape");
shape.addEventListener("click", (event) => {
  const objectShape = event.target.dataset.shape;
  if (objectShape) {
    scene.remove(table, tableLegs);
    table = createTable(objectShape, material);
    tableLegs = allLegs.leg1(table);
    scene.add(table, tableLegs);

    // show revelant inputfield
    inputFields.map((input) => {
      if (input.dataset.type.includes(objectShape)) {
        input.classList.remove("hide");
      } else {
        input.classList.add("hide");
      }
    });

    // reset values
    Array.from(document.querySelectorAll(".select")).map((input, index) => {
      input.value = resetValues[index];
    });
  }
});

//change texture material
const textures = document.querySelector(".configuration-texture");
textures.addEventListener("click", (event) => {
  const data = event.target.dataset.texture;
  if (data) {
    table.material = new THREE.MeshStandardMaterial(allTextures[data]);
    table.material.needsUpdate = true;
  }
});

//change types legs
const typeLeg = document.querySelector(".configuration-legs");
typeLeg.addEventListener("click", (event) => {
  const data = event.target.dataset.leg;
  if (data) {
    const chosenLegs = allLegs[data](table);
    scene.remove(tableLegs);
    tableLegs = chosenLegs;
    scene.add(tableLegs);
  }
});

//hide configurator
toggle.addEventListener("click", (ev) => {
  if (ev.target.dataset.toggle === "hide") {
    toggle.dataset.toggle = "show";
    onWindowResize();
    toggle.style.right = "24vw";
    toggle.style.transform = "rotateY(0deg)";
  } else {
    toggle.dataset.toggle = "hide";
    onWindowResize();
    toggle.style.right = "0rem";
    toggle.style.transform = "rotateY(180deg)";
  }
});

// tweak parameters
// const tableDebug = debug.addFolder({
//   title: "table",
// });
// tableDebug
//   .addInput(material, "roughness", { min: 0, max: 1, step: 0.1 })
//   .on("change", (ev) => (material.roughness = ev.value));

// tableDebug
//   .addInput(material, "metalness", { min: 0, max: 1, step: 0.1 })
//   .on("change", (ev) => (material.metalness = ev.value));

// const legsDebug = debug.addFolder({
//   title: "legs",
// });

// legsDebug
//   .addInput(tableLegs.children[0].material, "metalness", {
//     min: 0,
//     max: 1,
//     step: 0.1,
//   })
//   .on("change", (ev) => {
//     tableLegs.children.map((leg) => (leg.material.metalness = ev.value));
//   });

// legsDebug
//   .addInput(tableLegs.children[0].material, "roughness", {
//     min: 0,
//     max: 1,
//     step: 0.1,
//   })
//   .on("change", (ev) => {
//     tableLegs.children.map((leg) => (leg.material.roughness = ev.value));
//   });

// debug.addInput(check.repeat, "y", { min: 0, max: 3, step: 0.1 }).on("change", (ev) => {
//   check.repeat.y = ev.value;
// });
// debug.addInput(check.repeat, "x", { min: 0, max: 3, step: 0.1 }).on("change", (ev) => {
//   check.repeat.y = ev.value;
// });
