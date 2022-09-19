import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { createTable, allTextures } from "./table";
import { allLegs } from "./legs";
import { Pane } from "tweakpane";

let dimensions = {
  width: window.innerWidth * 0.75,
  height: window.innerHeight,
};

let canvas, camera, ambientLight, scene, controls, renderer, table, tableLegs, material, debug, directLight;

const inputFields = Array.from(document.querySelectorAll(".configuration-size-inputField"));
const toggle = document.querySelector("#arrow");
const resetValues = [150, 60, 100, 5];
const textureRepeat = {
  rect: { x: 1.2, y: 0.5 },
  circle: { x: 1, y: 1 },
};

const shapeButtons = document.querySelectorAll(".shape");
const legButtons = document.querySelectorAll(".leg");
const textureButtons = document.querySelectorAll(".texture-container");

// create basic scene
function init() {
  canvas = document.querySelector("#canvas");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#fff");

  camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 100);
  camera.position.set(0, 0.75, 1.5);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  ambientLight = new THREE.AmbientLight("#fff", 0.8);

  directLight = new THREE.DirectionalLight("#fff", 0.3);
  directLight.castShadow = true;
  directLight.position.set(1, 3, -2.5);
  directLight.shadow.mapSize.width = 4096;
  directLight.shadow.mapSize.height = 4096;
  // const directHelper = new THREE.DirectionalLightHelper(directLight, 0.5);
  directLight.shadow.camera.near = 1.5;
  directLight.shadow.camera.far = 6;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.outputEncoding = THREE.sRGBEncoding;

  // basic table
  material = new THREE.MeshStandardMaterial(allTextures.wood4);
  // material.wireframe = true;
  table = createTable("rect", material);
  table.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(table.geometry.attributes.uv.array, 2));
  tableLegs = allLegs.leg1(table);

  //floor for shadow
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.7 })
  );
  floor.receiveShadow = true;
  floor.position.set(0, -0.55, 0);
  floor.rotateX(-Math.PI * 0.5);

  window.addEventListener("resize", onWindowResize);
  scene.add(camera, ambientLight, table, tableLegs, directLight, floor);
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
    material = table.material;
    scene.remove(table, tableLegs);
    table = createTable(objectShape, material);
    table.material.map.repeat.x = textureRepeat[objectShape].x;
    table.material.map.repeat.y = textureRepeat[objectShape].y;
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

    //underline shape
    underline(objectShape, shapeButtons);
  }
});

//change texture material
const textures = document.querySelector(".configuration-texture");
textures.addEventListener("click", (event) => {
  const data = event.target.dataset.texture;
  if (data) {
    table.material = new THREE.MeshStandardMaterial(allTextures[data]);
    table.material.needsUpdate = true;
    showSelectedTexture(data);
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

    underline(data, legButtons);
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

// underline type
function underline(param, list) {
  Array.from(list).map((button) => {
    if (param.includes("leg")) {
      if (button.dataset.leg === param) {
        button.classList.add("underline");
      } else {
        button.classList.remove("underline");
      }
    } else {
      if (button.dataset.shape === param) {
        button.classList.add("underline");
      } else {
        button.classList.remove("underline");
      }
    }
  });
}

// add dot on selected texture
function showSelectedTexture(param) {
  Array.from(textureButtons).map((button) => {
    if (button.children[0].dataset.texture === param) {
      button.classList.add("texture-selected");
    } else {
      button.classList.remove("texture-selected");
    }
  });
}

// tweak parameters
debug = new Pane();

const checkDebug = debug.addFolder({
  title: "check",
});

checkDebug.addInput(allTextures.check.map.repeat, "y", { min: 0, max: 3, step: 0.01 }).on("change", (ev) => {
  allTextures.check.map.repeat.y = ev.value;
});
checkDebug.addInput(allTextures.check.map.repeat, "x", { min: 0, max: 3, step: 0.01 }).on("change", (ev) => {
  allTextures.check.map.repeat.x = ev.value;
});

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
