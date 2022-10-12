import basicRectangle from "../models/tables/rectangle/tableSize.glb?url";
import roundedRectangle from "../models/tables/rectangle/rounded.glb?url";
import outdoorBasic from "../models/tables/outdoor/outdoor2.glb?url";
import basicCircle from "../models/tables/circle/circleBasic.glb?url";

import { wood2, wood3, wood4, wood1, checkTexture, metal, metal2 } from "./loadTextures";

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
  },
  outdoor: {
    outdoorBasic,
  },
};

export const allTextures = {
  wood2,
  wood3,
  wood4,
  wood1,
  check,
  metal,
  metal2,
};
