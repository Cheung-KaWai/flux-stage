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

metalColorTexture.repeat.y = 1;
metalColorTexture.repeat.x = 0.125;

metalColorTexture.wrapS = THREE.RepeatWrapping;
metalColorTexture.wrapT = THREE.RepeatWrapping;

const environmentMapTexture = cubeTextureLoader.load([
  "/src/assets/env/v2/px.jpg",
  "/src/assets/env/v2/nx.jpg",
  "/src/assets/env/v2/py.jpg",
  "/src/assets/env/v2/ny.jpg",
  "/src/assets/env/v2/pz.jpg",
  "/src/assets/env/v2/nz.jpg",
]);

export const metal = {
  map: metalColorTexture,
  roughness: 0.2,
  metalnessMap: metallicMap,
  metalness: 1,
  envMap: environmentMapTexture,
  envMapIntensity: 1,
  normalMap: normalMap,
  roughnessMap: metalRoughness,
};

const tableColorTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Color.jpg");
const tableRoughnessTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Roughness.jpg");
const tableNormalTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_NormalDx.jpg");

const tableColorTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_Color.jpg");
const tableRoughnessTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_Roughness.jpg");
const tableNormalTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_NormalDx.jpg");
const tableAmbientOcclusionTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_AmbientOcclusion.jpg");

const tableColorTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_Color.jpg");
const tableRoughnessTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_Roughness.jpg");
const tableNormalTextureWood2 = textureLoader.load("/src/assets/table/wood2/Wood051_1K_NormalDx.jpg");

const checkTexture = textureLoader.load("/src/assets/image.png");
checkTexture.repeat.x = 1;
checkTexture.repeat.y = 0.4;

export { checkTexture };

transformTexture([
  tableColorTextureWood4,
  tableRoughnessTextureWood4,
  tableNormalTextureWood4,
  tableColorTextureWood3,
  tableRoughnessTextureWood3,
  tableNormalTextureWood3,
  tableAmbientOcclusionTextureWood3,
  tableColorTextureWood2,
  tableRoughnessTextureWood2,
  tableNormalTextureWood2,
  checkTexture,
]);

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
  aoMap: tableAmbientOcclusionTextureWood3,
  aoMapIntensity: 1,
};

export const wood4 = {
  map: tableColorTextureWood4,
  roughnessMap: tableRoughnessTextureWood4,
  roughness: 1,
  normalMap: tableNormalTextureWood4,
};

function transformTexture(textures) {
  textures.map((texture) => {
    texture.repeat.y = 0.38;
    texture.repeat.x = 1;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });
}
