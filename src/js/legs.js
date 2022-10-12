import * as THREE from "three";
import { metal } from "./loadTextures";

import leg1 from "../models/legs/rectangle/legSize.glb?url";
import leg2 from "../models/legs/rectangle/leg2.glb?url";
import leg3 from "../models/legs/circle/leg3.glb?url";

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

export function positionLeg(leg1, leg2, factor, shadow1, shadow2) {
  const offsetShadow = 0.15;

  leg2.position.x = -0.75 * factor + offsetShadow;
  leg1.position.x = 0.75 * factor - offsetShadow;
  shadow1.position.x = 0.75 * factor - offsetShadow;
  shadow2.position.x = -0.75 * factor + offsetShadow;
}
