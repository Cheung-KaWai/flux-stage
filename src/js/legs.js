import * as THREE from "three";
import { metal } from "./loadTextures";

import leg1 from "../models/legs/rectangle/testLeg.glb?url";
import leg2 from "../models/legs/rectangle/testLeg2.glb?url";
// import leg3 from "../models/legs/circle/circleLegs1.glb?url";
import leg3 from "../models/legs/circle/legCircle2.glb?url";

export const listLegModels = {
  rectangle: {
    leg1,
    leg2,
  },
  circle: {
    leg3,
  },
  outdoor: {
    leg1,
    leg2,
  },
};

export const legsMaterial = {
  metal: new THREE.MeshStandardMaterial(metal),
};

export function positionLeg(leg1, leg2, factor) {
  const offset = 0.15;

  leg2.position.x = -0.75 * factor + offset;
  leg1.position.x = 0.75 * factor - offset;
}

// export function repositionLegs(leg1, leg2, factor) {
//   const offset = 0.15;

//   leg1.position.x = 0.75 * factor - offset;
//   leg2.position.x = -0.75 * factor + offset;
// }

// const material = new THREE.MeshStandardMaterial(metal);
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// export function createTableLegsRectangle(table) {
//   const dimensions = [0.05, 0.5, 0.05];
//   const dimensionsTable = table.scale;
//   const margin = 0.01;

//   const group = new THREE.Group();

//   const leg1 = new THREE.Mesh(geometry, material);
//   leg1.castShadow = true;
//   leg1.receiveShadow = false;

//   leg1.scale.set(...dimensions);
//   leg1.position.y = -dimensions[1] / 2;
//   leg1.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
//   leg1.position.z = (dimensionsTable.z - dimensions[0]) / 2 - margin;

//   const leg2 = new THREE.Mesh(geometry, material);
//   leg2.castShadow = true;
//   leg2.receiveShadow = false;
//   leg2.scale.set(...dimensions);
//   leg2.position.y = -dimensions[1] / 2;
//   leg2.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
//   leg2.position.z = -(dimensionsTable.z - dimensions[0]) / 2 + margin;

//   const leg3 = new THREE.Mesh(geometry, material);
//   leg3.castShadow = true;
//   leg3.receiveShadow = false;
//   leg3.scale.set(...dimensions);
//   leg3.position.y = -dimensions[1] / 2;
//   leg3.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
//   leg3.position.z = -(dimensionsTable.z - dimensions[0]) / 2 + margin;

//   const leg4 = new THREE.Mesh(geometry, material);
//   leg4.castShadow = true;
//   leg4.receiveShadow = false;
//   leg4.scale.set(...dimensions);
//   leg4.position.y = -dimensions[1] / 2;
//   leg4.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
//   leg4.position.z = (dimensionsTable.z - dimensions[0]) / 2 - margin;

//   group.add(leg1, leg2, leg3, leg4);

//   return group;
// }

// export function createTableLegsRectangle2(table) {
//   const dimensions = [0.05, 0.5, 0.05];
//   const dimensionsTable = table.scale;
//   const margin = 0.01;

//   const group = new THREE.Group();

//   const leg1 = new THREE.Mesh(geometry, material);
//   leg1.castShadow = true;
//   leg1.receiveShadow = false;
//   leg1.scale.set(...dimensions);
//   leg1.position.y = -dimensions[1] / 2;
//   leg1.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;

//   const leg2 = new THREE.Mesh(geometry, material);
//   leg2.castShadow = true;
//   leg2.receiveShadow = false;
//   leg2.scale.set(...dimensions);
//   leg2.position.y = -dimensions[1] / 2;
//   leg2.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;

//   const leg3 = new THREE.Mesh(geometry, material);
//   leg3.castShadow = true;
//   leg3.receiveShadow = false;
//   leg3.scale.set(...dimensions);
//   leg3.position.y = -dimensions[1] - 0.025;
//   leg3.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
//   leg3.rotateX(Math.PI * 0.5);

//   const leg4 = new THREE.Mesh(geometry, material);
//   leg4.castShadow = true;
//   leg4.receiveShadow = false;
//   leg4.scale.set(...dimensions);
//   leg4.position.y = -dimensions[1] - 0.025;
//   leg4.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
//   leg4.rotateX(Math.PI * 0.5);

//   group.add(leg1, leg2, leg3, leg4);

//   return group;
// }

// export const allLegs = {
//   leg1: createTableLegsRectangle2,
//   leg2: createTableLegsRectangle,
// };

//test model
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.3/");
// const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader);

// gltfLoader.load(legsModel, function (glb) {
//   const legs2 = glb.scene;

//   legs2.traverse((child) => {
//     child.material = material;
//   });
//   legs2.scale.set(0.25, 0.25, 0.25);
// });
