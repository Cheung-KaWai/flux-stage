import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function createTable(shape, material) {
  const shapeObject = {
    circle: new THREE.CylinderGeometry(1, 1, 0.05, 64, 32),
    rect: new THREE.BoxGeometry(1, 1, 1, 64, 64, 64),
  };

  // sizes in meters
  const scale = {
    rect: [1.5, 0.05, 0.5],
    circle: [1, 1, 1],
  };

  const geometry = shapeObject[shape];
  geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
  );
  const table = new THREE.Mesh(geometry, material);
  table.scale.set(...scale[shape]);
  return table;
}

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

tableColorTextureWood.repeat.x = 3;
tableColorTextureWood.repeat.y = 2;
tableColorTextureWood.wrapS = THREE.RepeatWrapping;
tableColorTextureWood.wrapT = THREE.RepeatWrapping;
