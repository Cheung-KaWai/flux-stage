import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import legsModel from "../models/legs/legsModels.glb?url";

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const metalColorTexture = textureLoader.load("/src/assets/legs/Metal_006_basecolor.jpg");
const metalRoughness = textureLoader.load("/src/assets/legs/Metal_006_roughness.jpg");
const normalMap = textureLoader.load("/src/assets/legs/Metal_006_normal.jpg");
const metallicMap = textureLoader.load("/src/assets/legs/Metal_006_metallic.jpg");

metalColorTexture.repeat.y = 1;
metalColorTexture.repeat.x = 0.125;

metalColorTexture.wrapS = THREE.RepeatWrapping;
metalColorTexture.wrapT = THREE.RepeatWrapping;

const environmentMapTexture = cubeTextureLoader.load([
  "/src/assets/env/px.jpg",
  "/src/assets/env/nx.jpg",
  "/src/assets/env/py.jpg",
  "/src/assets/env/ny.jpg",
  "/src/assets/env/pz.jpg",
  "/src/assets/env/nz.jpg",
]);

const material = new THREE.MeshStandardMaterial({
  map: metalColorTexture,
  roughness: 1,
  metalnessMap: metallicMap,
  metalness: 1,
  envMap: environmentMapTexture,
  normalMap: normalMap,
  roughnessMap: metalRoughness,
});

const geometry = new THREE.BoxGeometry(1, 1, 1);

export function createTableLegsRectangle(table) {
  const dimensions = [0.05, 0.5, 0.05];
  const dimensionsTable = table.scale;
  const margin = 0.01;

  const group = new THREE.Group();

  const leg1 = new THREE.Mesh(geometry, material);
  leg1.scale.set(...dimensions);
  leg1.position.y = -dimensions[1] / 2;
  leg1.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
  leg1.position.z = (dimensionsTable.z - dimensions[0]) / 2 - margin;

  const leg2 = new THREE.Mesh(geometry, material);
  leg2.scale.set(...dimensions);
  leg2.position.y = -dimensions[1] / 2;
  leg2.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
  leg2.position.z = -(dimensionsTable.z - dimensions[0]) / 2 + margin;

  const leg3 = new THREE.Mesh(geometry, material);
  leg3.scale.set(...dimensions);
  leg3.position.y = -dimensions[1] / 2;
  leg3.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
  leg3.position.z = -(dimensionsTable.z - dimensions[0]) / 2 + margin;

  const leg4 = new THREE.Mesh(geometry, material);
  leg4.scale.set(...dimensions);
  leg4.position.y = -dimensions[1] / 2;
  leg4.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
  leg4.position.z = (dimensionsTable.z - dimensions[0]) / 2 - margin;

  group.add(leg1, leg2, leg3, leg4);

  return group;
}

export function createTableLegsRectangle2(table) {
  const dimensions = [0.05, 0.5, 0.05];
  const dimensionsTable = table.scale;
  const margin = 0.01;

  const group = new THREE.Group();

  const leg1 = new THREE.Mesh(geometry, material);
  leg1.scale.set(...dimensions);
  leg1.position.y = -dimensions[1] / 2;
  leg1.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;

  const leg2 = new THREE.Mesh(geometry, material);
  leg2.scale.set(...dimensions);
  leg2.position.y = -dimensions[1] / 2;
  leg2.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;

  const leg3 = new THREE.Mesh(geometry, material);
  leg3.scale.set(...dimensions);
  leg3.position.y = -dimensions[1];
  leg3.position.x = -(dimensionsTable.x - dimensions[0]) / 2 + margin;
  leg3.rotateX(Math.PI * 0.5);

  const leg4 = new THREE.Mesh(geometry, material);
  leg4.scale.set(...dimensions);
  leg4.position.y = -dimensions[1];
  leg4.position.x = (dimensionsTable.x - dimensions[0]) / 2 - margin;
  leg4.rotateX(Math.PI * 0.5);

  group.add(leg1, leg2, leg3, leg4);

  return group;
}

export const allLegs = {
  leg1: createTableLegsRectangle2,
  leg2: createTableLegsRectangle,
};

//test model
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.3/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(legsModel, function (glb) {
  const legs2 = glb.scene;

  legs2.traverse((child) => {
    child.material = material;
  });
  legs2.scale.set(0.25, 0.25, 0.25);
  console.log(legs2);
});
