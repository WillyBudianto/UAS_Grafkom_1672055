// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
// import * as THREE from '../node_modules/three/build/three.js';
// import * as THREE from './node_modules/three/build/three.module.js';
// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.js';

// ? Reference : https://sbcode.net/threejs/loaders-fbx/
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
// import { FBXLoader } from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
cam.position.z = 300;
cam.position.y = 400;
cam.lookAt(0, 0, 0)

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x707070, 1)

// * Reference : https://www.youtube.com/watch?v=iLLe8xJUc0I&list=PL5gLq0nzeozvgdrykl2tI8SZBRiYoe54Q&index=4
const planeGeo = new THREE.PlaneGeometry(1000, 1000, 500, 500);
// const grassTexture = new THREE.TextureLoader().load('../assets/image/grass_texture.jpg');
// * Reference : https://stackoverflow.com/questions/14114030/how-to-write-right-repeat-texture-with-three-js
const grassTexture = new THREE.TextureLoader().load('../assets/image/grass_texture.jpg', (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(10, 10);
});
const planeMat = new THREE.MeshBasicMaterial({ map: grassTexture });
const planeMesh = new THREE.Mesh(planeGeo, planeMat)
planeMesh.rotateX(- Math.PI/2) // * Rotate -90 degree
scene.add(planeMesh);

// * Lighting
// const light = new THREE.PointLight()
// light.position.set(0.8, 1.4, 1.0)
// scene.add(light)

// * Model & Animation
// ? Reference : https://sbcode.net/threejs/loaders-fbx/
// const fbxLoader = new FBXLoader();
// console.log("fbxLoader", fbxLoader);
// fbxLoader.setPath('../assets/model/');
// fbxLoader.load('character.fbx', (object) => {
//   scene.add(object)
// })
// fbxLoader.load('../assets/model/character.fbx', (object) => {
//   scene.add(object)
// })

// ? Reference : https://www.youtube.com/watch?v=bEakg338WGA&list=PL5gLq0nzeozvgdrykl2tI8SZBRiYoe54Q&index=9
var loader = new THREE.GLTFLoader();
// * This work is based on "Warrior Girl" (https://sketchfab.com/3d-models/warrior-girl-1581a536b8984935a31891dc685e8376) by NORBERTO-3D (https://sketchfab.com/norberto3d) licensed under CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
// loader.load('./assets/model/warrior_girl/scene.gltf', function(gltf) {
//   console.log("gltf", gltf);
// })
// console.log("loader", loader);
// * This work is based on "Dark Knight" (https://sketchfab.com/3d-models/dark-knight-e2208bdc46304f6faa18728778986f35) by Nick Scott (https://sketchfab.com/Nickjjscott) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
loader.load('./assets/model/dark_knight/scene.gltf', function(gltf) {
  console.log("gltf", gltf);
  scene.add(gltf.scene)
})
// console.log("loader", loader);



// * Update camera aspect ratio when resize the browser
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
})

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement); // Insert canvas domElement as child element of the html body

const draw = () => {
  requestAnimationFrame(draw);
  renderer.render(scene, cam);
}

draw();