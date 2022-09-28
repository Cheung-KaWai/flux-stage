import basicRectangle from "../models/tables/rectangle/test.glb?url";
import roundedRectangle from "../models/tables/rectangle/rounded.glb?url";
import gapRectangle from "../models/tables/rectangle/gap.glb?url";
import basicCircle from "../models/tables/circle/basicCircle.glb?url";
import roundedCircle from "../models/tables/circle/roundedCircle.glb?url";

import { wood2, wood3, wood4, wood1, checkTexture, metal } from "./loadTextures";

const check = {
  map: checkTexture,
};

export const listModels = {
  rectangle: {
    basicRectangle,
    roundedRectangle,
  },
  circle: {
    basicCircle,
    roundedCircle,
  },
  outdoor: {
    gapRectangle,
  },
};

export const allTextures = {
  wood2,
  wood3,
  wood4,
  wood1,
  check,
  metal,
};

// export function createTable(shape, material) {
//   const shapeObject = {
//     circle: new THREE.CylinderGeometry(1, 1, 1, 64, 64),
//     rect: new THREE.BoxGeometry(1, 1, 1),
//     // oval: new THREE.CylinderGeometry(1, 1, 1, 64, 32),
//   };

//   // sizes in meters
//   const scale = {
//     rect: [1.5, 0.025, 0.6],
//     circle: [0.5, 0.025, 0.5],
//     // oval: [0.75, 0.05, 0.3],
//   };

//   const geometry = shapeObject[shape];
//   const table = new THREE.Mesh(geometry, material);
//   table.castShadow = true;
//   table.receiveShadow = false;
//   table.scale.set(...scale[shape]);
//   return table;
// }
