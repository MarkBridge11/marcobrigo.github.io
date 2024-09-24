import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
const initial_position = new THREE.Vector3(5, 7, 8); //5,7,8
camera.position.copy(initial_position);

const verify_aspect = window.innerWidth / window.innerHeight;
//console.log(verify_aspect);
if(verify_aspect < 1){ 
    camera.position.z=(initial_position.z / verify_aspect);
    if(verify_aspect < 0.6) camera.position.z -= 3;
}

const renderer = new THREE.WebGLRenderer({alpha:true}); 
renderer.setSize(window.innerWidth/2,window.innerHeight/2);

const container = document.getElementById("container3D")
container.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

//Loaders
const loader = new GLTFLoader();
const url = '/static/home/models/commodore_minimal/scene.gltf';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 
loader.setDRACOLoader( dracoLoader );


//Lights
const ambientLight = new THREE.AmbientLight(0xffe0b0, 0.3); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(5, 5, 5).normalize();  // Position the light 5,5,5
scene.add(directionalLight);


//Load model and set animations
let loadedModel;
let mixer; 

loader.load(url, function (gltf) {
    loadedModel = gltf.scene;
    scene.add(gltf.scene);

    //loadedModel.scale.set(2,2,2);

    if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(gltf.scene); 
        const action = mixer.clipAction(gltf.animations[0]); 
        action.play(); 
    }
}, undefined, function (error) {
    console.error('An error occurred', error);
});

function animate(){
    requestAnimationFrame(animate);

    if (loadedModel) {
        loadedModel.rotation.y += 0.01;  
        //console.log("Camera Position: ", camera.position);
    }

    if (mixer) {
        mixer.update(0.01); 
    }

    directionalLight.lookAt(camera.position);
    controls.update();
    renderer.render(scene,camera);
}


window.addEventListener("resize",function(){
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const aspect_ratio = containerWidth / containerHeight;
    camera.aspect = aspect_ratio;
    if(camera.aspect < 1){ //in portrait mode (mobile devices), aspect ratio is less then 1
        camera.position.z = initial_position.z/camera.aspect; 
    }
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth,containerHeight);
});

animate();

