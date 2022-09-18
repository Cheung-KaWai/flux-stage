import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const tableColorTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Color.jpg");
transformTexture(tableColorTextureWood4);
const tableRoughnessTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_Roughness.jpg");
const tableNormalTextureWood4 = textureLoader.load("/src/assets/table/wood4/Wood066_1K_NormalDx.jpg");

const tableColorTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_Color.jpg");
transformTexture(tableColorTextureWood3);
const tableRoughnessTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_Roughness.jpg");
const tableNormalTextureWood3 = textureLoader.load("/src/assets/table/wood3/Wood073_1K_NormalDx.jpg");

const checkTexture = textureLoader.load("/src/assets/image.png");

const wood3 = {
  map: tableColorTextureWood3,
  roughnessMap: tableRoughnessTextureWood3,
  roughness: 1,
  normalMap: tableNormalTextureWood3,
};

const wood4 = {
  map: tableColorTextureWood4,
  roughnessMap: tableRoughnessTextureWood4,
  roughness: 1,
  normalMap: tableNormalTextureWood4,
};

const check = {
  map: checkTexture,
};

export const allTextures = {
  wood3,
  wood4,
  check,
};

function transformTexture(texture) {
  texture.repeat.y = 0.5;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
}

export function createTable(shape, material) {
  const shapeObject = {
    circle: new THREE.CylinderGeometry(1, 1, 1, 64, 32),
    rect: new THREE.BoxGeometry(1, 1, 1, 64, 64, 64),
    // oval: new THREE.CylinderGeometry(1, 1, 1, 64, 32),
  };

  // sizes in meters
  const scale = {
    rect: [1.5, 0.05, 0.6],
    circle: [0.5, 0.05, 0.5],
    // oval: [0.75, 0.05, 0.3],
  };

  const geometry = shapeObject[shape];
  const table = new THREE.Mesh(geometry, material);
  table.scale.set(...scale[shape]);

  return table;
}
