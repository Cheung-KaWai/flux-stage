import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const tableColorTextureWood = textureLoader.load(
  "/src/assets/table/wood/Wood_027_basecolor.jpg"
);

const tableColorTextureWood2 = textureLoader.load(
  "/src/assets/table/wood2/Wood_023_basecolor.jpg"
);

const tableColorTextureWood3 = textureLoader.load(
  "/src/assets/table/wood3/Wood_025_basecolor.jpg"
);

const wood = {
  map: tableColorTextureWood,
};
const wood2 = {
  map: tableColorTextureWood2,
};

const wood3 = {
  map: tableColorTextureWood3,
};

export const allTextures = {
  wood,
  wood2,
  wood3,
};

export function transformTexture(texture) {
  texture.repeat.y = 2;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.rotation = Math.PI * 0.5;
  return texture;
}

export function createTable(shape, material) {
  const shapeObject = {
    circle: new THREE.CylinderGeometry(1, 1, 1, 64, 32),
    rect: new THREE.BoxGeometry(1, 1, 1, 64, 64, 64),
    oval: new THREE.CylinderGeometry(1, 1, 1, 64, 32),
  };

  // sizes in meters
  const scale = {
    rect: [1.5, 0.05, 0.6],
    circle: [0.5, 0.05, 0.5],
    oval: [0.75, 0.05, 0.3],
  };

  const geometry = shapeObject[shape];
  const table = new THREE.Mesh(geometry, material);
  table.scale.set(...scale[shape]);

  return table;
}
