import * as THREE from "three";

import { wood2, wood3, wood4, checkTexture } from "./loading";

const check = {
  map: checkTexture,
};

export const allTextures = {
  wood2,
  wood3,
  wood4,
  check,
};

export function createTable(shape, material) {
  const shapeObject = {
    circle: new THREE.CylinderGeometry(1, 1, 1, 64, 64),
    rect: new THREE.BoxGeometry(1, 1, 1, 64, 1, 64),
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
  table.castShadow = true;
  table.receiveShadow = false;
  table.scale.set(...scale[shape]);

  return table;
}
