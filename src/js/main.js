import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { allTextures, listModels } from "./table";
import { listLegModels, legsMaterial, positionLeg } from "./legs";
import { Pane } from "tweakpane";
import { loadingManager, transformTextureOnResize } from "./loadTextures";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.3/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let dimensions = {
  width: window.innerWidth * 0.74,
  height: window.innerHeight,
};

let canvas,
  camera,
  ambientLight,
  scene,
  controls,
  renderer,
  table,
  tableLeg1,
  tableLeg2,
  material,
  debug,
  directLight,
  floor;
let currentShape = "rectangle";
let currentLegMaterial = new THREE.MeshStandardMaterial(allTextures.metal);
let currentTexture = allTextures.wood4;
let currentScale = { x: 1, y: 1, z: 1 };
let rescale = {
  rectangle: {
    x: 150,
    y: 5,
    z: 60,
  },
  circle: {
    x: 150,
    z: 150,
  },
  outdoor: {
    x: 150,
    y: 5,
    z: 60,
  },
};

const inputFields = Array.from(document.querySelectorAll(".configuration-size-inputField"));
const shapeTypes = Array.from(document.querySelectorAll(".shape-type"));
const legTypes = Array.from(document.querySelectorAll(".leg"));
const toggle = document.querySelector("#arrow");
const resetValues = [150, 60, 150, 5];

const shapeButtons = Array.from(document.querySelectorAll(".shape"));
const legButtons = Array.from(document.querySelectorAll(".leg"));
const textureButtons = Array.from(document.querySelectorAll(".texture-container"));
const textureButtonsLeg = Array.from(document.querySelectorAll(".texture-leg"));

// create basic scene
function init() {
  canvas = document.querySelector("#canvas");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#fff");

  camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 100);
  camera.position.set(1, 0.3, 2);

  controls = new OrbitControls(camera, canvas);
  // controls.enablePan = false;
  // controls.minDistance = 1.0;
  // controls.maxDistance = 3.0;
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.enableDamping = true;

  ambientLight = new THREE.AmbientLight("#fff", 3.1); // 3.1

  directLight = new THREE.DirectionalLight("#fff", 0.3);
  directLight.castShadow = true;
  directLight.position.set(0, 2, 0);
  directLight.shadow.camera.near = 1;
  directLight.shadow.camera.far = 2.5;
  directLight.shadow.camera.top = 1;
  directLight.shadow.camera.right = 2;
  directLight.shadow.camera.bottom = -1;
  directLight.shadow.camera.left = -2;
  directLight.shadow.mapSize.width = 1024;
  directLight.shadow.mapSize.height = 1024;
  // const directHelper = new THREE.DirectionalLightHelper(directLight);
  // scene.add(directHelper);
  const directionalLightCameraHelper = new THREE.CameraHelper(directLight.shadow.camera);
  directionalLightCameraHelper.visible = false;
  scene.add(directionalLightCameraHelper);

  directLight.shadow.radius = 10;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  // renderer.outputEncoding = THREE.sRGBEncoding;

  // basic table
  material = new THREE.MeshStandardMaterial(allTextures.wood4);
  loadTableModel(listModels.rectangle.basicRectangle, material);
  loadLegModel(listLegModels.rectangle.leg1, currentLegMaterial);

  //floor for shadow
  addFloor();

  window.addEventListener("resize", onWindowResize);
  scene.add(camera, ambientLight, directLight);
  animate();
}

function onWindowResize() {
  // update dimensions
  let factor;
  if (toggle.dataset.toggle === "hide") {
    factor = 1;
  } else {
    factor = 0.74;
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

function addFloor() {
  floor = new THREE.Mesh(
    new THREE.CircleGeometry(20, 32),
    new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.7 })
  );
  floor.receiveShadow = true;
  floor.position.set(0, -0.41, 0);
  floor.rotateX(-Math.PI * 0.5);

  scene.add(floor);
}

function loadTableModel(model, material) {
  gltfLoader.load(model, function (glb) {
    if (table) {
      scene.remove(table);
    }
    table = glb.scene;
    table.traverse((child) => {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = false;
    });
    scene.add(table);
  });
}

function loadLegModel(model, material) {
  gltfLoader.load(model, function (glb) {
    scene.remove(tableLeg1, tableLeg2);

    tableLeg1 = glb.scene;
    tableLeg1.traverse((child) => {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = false;
    });
    scene.add(tableLeg1);

    if (currentShape === "circle") return;

    tableLeg2 = tableLeg1.clone();
    tableLeg2.rotateY(Math.PI);
    positionLeg(tableLeg1, tableLeg2, currentScale.x);
    scene.add(tableLeg2);
  });
}

function loadCircleLegModel(model, material) {
  gltfLoader.load(model, function (glb) {
    scene.remove(tableLeg1, tableLeg2);

    tableLeg1 = glb.scene;
    tableLeg1.traverse((child) => {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = false;
    });
    scene.add(tableLeg1);
  });
}

//change table size
const size = document.querySelector(".configuration-size");
size.addEventListener("change", (event) => {
  const orientation = event.target.dataset.orientation;
  const size = event.target.value;

  if (orientation === "circle") {
    table.scale.x = size / rescale.circle.x;
    table.scale.z = size / rescale.circle.z;
  } else {
    const factor = size / rescale.rectangle[orientation];
    table.scale[orientation] = factor;

    // fix repeat texture when resizing
    currentScale[orientation] = factor;
    let arrayValues = Object.entries(currentTexture);
    arrayValues.map((item) => {
      transformTextureOnResize(item[1], currentScale.x, currentScale.z);
    });

    table.material = new THREE.MeshStandardMaterial(Object.fromEntries(arrayValues));
    table.material.needsUpdate = true;

    if (orientation === "x") {
      positionLeg(tableLeg1, tableLeg2, factor);
    }
  }
  currentScale[orientation] = size / rescale[currentShape][orientation];
});

// change shape and show relevent inputfield size
const shape = document.querySelector(".configuration-shape");
shape.addEventListener("click", (event) => {
  const objectShape = event.target.dataset.shape;
  const objectType = event.target.dataset.version;
  currentScale = { x: 1, z: 1 };

  if (objectShape && objectShape !== "circle") {
    material = ResetRepeatAndReturnMaterial();
    currentShape = objectShape;
    if (objectType) {
      loadTableModel(listModels[objectShape][objectType], material);
      addBorderElement(objectType, shapeTypes, "version");
    } else {
      // load first model of shape table and legs
      scene.remove(table);
      scene.remove(tableLeg1, tableLeg2);
      loadLegModel(Object.values(listLegModels[currentShape])[0], currentLegMaterial);
      loadTableModel(Object.values(listModels[objectShape])[0], material);
      addBorderFirsElement(currentShape, shapeTypes);
    }
    positionLeg(tableLeg1, tableLeg2, 1);
    ResetUIConfigurator();
    addBorderElement(objectShape, shapeButtons, "shape");
    addBorderFirsElement(currentShape, legButtons);
  }

  if (objectShape && objectShape == "circle") {
    material = ResetRepeatAndReturnMaterial();
    currentShape = objectShape;
    scene.remove(table);

    if (objectType) {
      loadTableModel(listModels[objectShape][objectType], material);
      addBorderElement(objectType, shapeTypes, "version");
    } else {
      // load first model of shape table and legs
      scene.remove(tableLeg1, tableLeg2);
      loadTableModel(Object.values(listModels[currentShape])[0], material);
      loadCircleLegModel(Object.values(listLegModels[currentShape])[0], currentLegMaterial);
      addBorderFirsElement(currentShape, shapeTypes);
    }
    ResetUIConfigurator();
    addBorderElement(objectShape, shapeButtons, "shape");
    addBorderFirsElement(currentShape, legButtons);
  }
});

function ResetUIConfigurator() {
  showRelevantInput(currentShape);
  // reset values
  Array.from(document.querySelectorAll(".select")).map((input, index) => {
    input.value = resetValues[index];
  });
}

//change texture material
const textures = document.querySelector(".configuration-texture");
textures.addEventListener("click", (event) => {
  const data = event.target.dataset.texture;
  currentTexture = allTextures[data];
  if (data) {
    const newMaterial = new THREE.MeshStandardMaterial(fixRepeatAndReturnTexture());
    table.traverse((child) => {
      child.material = newMaterial;
      child.material.needsUpdate = true;
    });

    showSelectedElement(data, textureButtons, "texture");
  }
});

// change texture material leg
const texturesLeg = document.querySelector(".configuration-texture-legs");
texturesLeg.addEventListener("click", (event) => {
  const data = event.target.dataset.texture;
  if (data) {
    currentLegMaterial = new THREE.MeshStandardMaterial(allTextures[data]);
    tableLeg1.traverse((child) => {
      child.material = currentLegMaterial;
      child.material.needsUpdate = true;
    });
    tableLeg2.traverse((child) => {
      child.material = currentLegMaterial;
      child.material.needsUpdate = true;
    });
    addBorderElement(data, textureButtonsLeg, "texture");
  }
});

//change types legs
const typeLeg = document.querySelector(".configuration-legs");
typeLeg.addEventListener("click", (event) => {
  const data = event.target.dataset.leg;
  if (data) {
    loadLegModel(listLegModels[currentShape][data], currentLegMaterial);
    addBorderElement(data, legButtons, "leg");
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

// underline option
// function underline(param, list, data) {
//   Array.from(list).map((button) => {
//     if (button.dataset[data] === param) {
//       button.classList.add("underline");
//     } else {
//       button.classList.remove("underline");
//     }
//   });
// }

// add dot on selected texture
function showSelectedElement(param, list, dataset) {
  list.map((button) => {
    const value = button.children[0].dataset[dataset];
    if (value === param) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

function addBorderElement(param, list, dataset) {
  list.map((button) => {
    if (button.dataset[dataset] === param) {
      button.classList.add("border");
    } else {
      button.classList.remove("border");
    }
  });
}

function addBorderFirsElement(shape, list) {
  list.map((el) => el.classList.remove("border"));
  for (let element of list) {
    if (element.dataset.shape.includes(shape)) {
      element.classList.add("border");
      break;
    }
  }
}

function showRelevantInput(objectShape) {
  inputFields.map((input) => {
    if (input.dataset.type.includes(objectShape)) {
      input.classList.remove("hide");
    } else {
      input.classList.add("hide");
    }
  });

  shapeTypes.map((shape) => {
    if (shape.dataset.shape.includes(objectShape)) {
      shape.classList.remove("hide");
    } else {
      shape.classList.add("hide");
    }
  });

  legTypes.map((leg) => {
    if (leg.dataset.type.includes(objectShape)) {
      leg.classList.remove("hide");
    } else {
      leg.classList.add("hide");
    }
  });
}

function fixRepeatAndReturnTexture() {
  let arrayValues = Object.entries(currentTexture);
  arrayValues.map((item) => {
    transformTextureOnResize(item[1], currentScale.x, currentScale.z);
  });
  return Object.fromEntries(arrayValues);
}

function ResetRepeatAndReturnMaterial() {
  let arrayValues = Object.entries(currentTexture);
  arrayValues.map((item) => {
    transformTextureOnResize(item[1], 1, 1);
  });
  return new THREE.MeshStandardMaterial(Object.fromEntries(arrayValues));
}

init();

////////////////////////////////// DEBUG ///////////////////////////////////////////
// tweak parameters
// debug = new Pane({ container: document.querySelector(".debug") });

// const checkDebug = debug.addFolder({
//   title: "check",
//   expanded: false,
// });

// checkDebug.addInput(allTextures.check.map.repeat, "y", { min: 0, max: 3, step: 0.01 }).on("change", (ev) => {
//   allTextures.check.map.repeat.y = ev.value;
// });
// checkDebug.addInput(allTextures.check.map.repeat, "x", { min: 0, max: 3, step: 0.01 }).on("change", (ev) => {
//   allTextures.check.map.repeat.x = ev.value;
// });

// const tableDebug = debug.addFolder({
//   title: "table",
//   expanded: false,
// });
// tableDebug
//   .addInput(material, "roughness", { min: 0, max: 1, step: 0.1 })
//   .on("change", (ev) => (material.roughness = ev.value));

// tableDebug
//   .addInput(material, "metalness", { min: 0, max: 1, step: 0.1 })
//   .on("change", (ev) => (material.metalness = ev.value));

// const legsDebug = debug.addFolder({
//   title: "legs",
//   expanded: false,
// });

// legsDebug
//   .addInput(tableLeg1.children[0].material, "metalness", {
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
