import * as THREE from "three";

const loadingBarElement = document.querySelector(".loading-bar");
const loadingPercentage = document.querySelector(".loading-percentage");
const loadingScreen = document.querySelector(".hide-screen");

export const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    setTimeout(() => {
      loadingBarElement.classList.add("ended");
      loadingBarElement.style.transform = "";
      setTimeout(() => {
        loadingPercentage.style.color = "transparent";
        loadingScreen.style.background = "transparent";

        loadingPercentage.classList.add("hide-loading-elements");
        loadingScreen.classList.add("hide-loading-elements");
      }, 1000);
    }, 1000);
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    setTimeout(() => {
      const progressRatio = itemsLoaded / itemsTotal;
      loadingPercentage.innerHTML = `${(progressRatio * 100).toFixed()}%`;
      loadingBarElement.style.transform = `scaleX(${progressRatio})`;
    }, 300);
  }
);

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const metalColorTexture = textureLoader.load("/src/assets/legs/Metal009_1K_Color.jpg");
const metalRoughness = textureLoader.load("/src/assets/legs/Metal009_1K_Roughness.jpg");
const normalMap = textureLoader.load("/src/assets/legs/Metal009_1K_NormalDX.jpg");
const metallicMap = textureLoader.load("/src/assets/legs/Metal009_1K_Metalness.jpg");

const metalColorTexture2 = textureLoader.load("/src/assets/legs/leg2/Metal012_1K_Color.jpg");
const metalRoughness2 = textureLoader.load("/src/assets/legs/leg2/Metal012_1K_Roughness.jpg");
const normalMap2 = textureLoader.load("/src/assets/legs/leg2/Metal012_1K_NormalDX.jpg");
const metallicMap2 = textureLoader.load("/src/assets/legs/leg2/Metal012_1K_Metalness.jpg");

const environmentMapTexture = cubeTextureLoader.load([
  "/src/assets/env/v2/px.png",
  "/src/assets/env/v2/nx.png",
  "/src/assets/env/v2/py.png",
  "/src/assets/env/v2/ny.png",
  "/src/assets/env/v2/pz.png",
  "/src/assets/env/v2/nz.png",
]);

export const metal = {
  map: metalColorTexture,
  roughness: 0,
  metalnessMap: metallicMap,
  metalness: 1,
  envMap: environmentMapTexture,
  envMapIntensity: 0.8,
  normalMap: normalMap,
  roughnessMap: metalRoughness,
};

export const metal2 = {
  map: metalColorTexture2,
  roughness: 0,
  metalnessMap: metallicMap2,
  metalness: 1,
  envMap: environmentMapTexture,
  envMapIntensity: 0.8,
  normalMap: normalMap2,
  roughnessMap: metalRoughness2,
};

const tableColorTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Color.jpg");
const tableRoughnessTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Roughness.jpg");
const tableNormalTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_NormalDx.jpg");
const tableDisplacementTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Displacement.jpg");

const tableColorTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood030_1K_Color.jpg");
const tableRoughnessTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood030_1K_Roughness.jpg");
const tableNormalTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood030_1K_NormalDx.jpg");

const tableColorTextureWood1 = textureLoader.load("/src/assets/table/wood1/Wood_023_basecolor.jpg");
const tableRoughnessTextureWood1 = textureLoader.load("/src/assets/table/wood1/Wood_023_roughness.jpg");
const tableNormalTextureWood1 = textureLoader.load("/src/assets/table/wood1/Wood_023_normal.jpg");
const tableAmbientOcclusionTextureWood1 = textureLoader.load("/src/assets/table/wood1/Wood_023_ambientOcclusion.jpg");

const tableColorTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_Color.jpg");
const tableRoughnessTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_Roughness.jpg");
const tableNormalTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_NormalDx.jpg");

export const checkTexture = textureLoader.load("/src/assets/image.png");

const shadowTableRect = textureLoader.load("/src/assets/shadows/tableShadow3.jpg");
const shadowTableCircle = textureLoader.load("/src/assets/shadows/circleShadow.jpg");
const shadowTextureLeg1 = textureLoader.load("/src/assets/shadows/shadowLegs1V3.jpg");
const shadowTextureLeg2 = textureLoader.load("/src/assets/shadows/shadowLegs2V2.jpg");
const shadowTextureLeg3 = textureLoader.load("/src/assets/shadows/shadowLegs3V2.jpg");

export const shadowsTextures = {
  table: {
    rectangle: shadowTableRect,
    circle: shadowTableCircle,
    outdoor: shadowTableRect,
  },
  legs: {
    rectangle: {
      leg1: shadowTextureLeg1,
      leg2: shadowTextureLeg2,
    },
    circle: {
      leg3: shadowTextureLeg3,
    },
    outdoor: {
      leg1: shadowTextureLeg1,
      leg2: shadowTextureLeg2,
    },
  },
};

export const wood1 = {
  map: tableColorTextureWood1,
  roughnessMap: tableRoughnessTextureWood1,
  roughness: 1,
  normalMap: tableNormalTextureWood1,
  aoMap: tableAmbientOcclusionTextureWood1,
  aoMapIntensity: 1,
};

export const wood2 = {
  map: tableColorTextureWood2,
  roughnessMap: tableRoughnessTextureWood2,
  roughness: 1,
  normalMap: tableNormalTextureWood2,
};

export const wood3 = {
  map: tableColorTextureWood3,
  roughnessMap: tableRoughnessTextureWood3,
  roughness: 1,
  normalMap: tableNormalTextureWood3,
};

export const wood4 = {
  map: tableColorTextureWood4,
  roughnessMap: tableRoughnessTextureWood2,
  roughness: 1,
  normalMap: tableNormalTextureWood4,
};

transformTexture([
  tableColorTextureWood4,
  tableRoughnessTextureWood4,
  tableNormalTextureWood4,
  tableColorTextureWood3,
  tableRoughnessTextureWood3,
  tableNormalTextureWood3,
  tableColorTextureWood1,
  tableRoughnessTextureWood1,
  tableNormalTextureWood1,
  tableAmbientOcclusionTextureWood1,
  tableColorTextureWood2,
  tableRoughnessTextureWood2,
  tableNormalTextureWood2,
  checkTexture,
  metalColorTexture,
  metalRoughness,
  normalMap,
  metallicMap,
  shadowTableRect,
  shadowTableCircle,
]);

function transformTexture(textures) {
  textures.map((texture) => {
    texture.repeat.y = 1;
    texture.repeat.x = 1;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
  });
}

export function transformTextureOnResize(texture, factorX, factorY) {
  if (typeof texture === "object") {
    texture.repeat.y = 1 * factorY;
    texture.repeat.x = 1 * factorX;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }
}
