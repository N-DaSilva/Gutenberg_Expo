import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "../node_modules/three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";

// SCENE
const scene = new THREE.Scene();

// Import
const manager = new THREE.LoadingManager();

const loadingPage = document.getElementById("loader");
const progressBar = document.getElementById("progress");
const loadNumber = document.getElementById("load_number");

manager.onLoad = function () {
    loadingPage.classList.add("fade-out");
};
manager.onProgress = function (item, loaded, total) {
    progressBar.max = total;
    progressBar.value = loaded;
    loadNumber.innerHTML = `${loaded * 2} % `;
};

const loader = new GLTFLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);

loader.load("model/compressed-atelier-gutenberg2.glb", (glb) => {
    glb.scene.scale.set(35, 35, 35);
    glb.scene.position.set(-290, -150, 0);
    scene.add(glb.scene);
});

// LIGHTS
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(1000, 600, 500);
light.target.position.set(0, 0, 0);
scene.add(light);

const backlight = new THREE.DirectionalLight(0xffaa00, 1);
backlight.position.set(-500, 200, 0);
backlight.target.position.set(0, 0, 0);
scene.add(backlight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// CAMERA
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);
camera.position.set(0.01, 0.001, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.rotateSpeed = -0.25;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2.5;
controls.maxAzimuthAngle = Math.PI - 0.8;
controls.minAzimuthAngle = Math.PI - 2.4;
controls.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown", // down arrow
};

// Gestion du redimensionnement
const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);
onResize();

let isFirstPerson = false;
let firstPersonControls = null;

function toggleControls() {
    if (isFirstPerson) {
        firstPersonControls.dispose();
        controls.enabled = true;
    } else {
        controls.enabled = false; 
        firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
        firstPersonControls.lookSpeed = 0;
        firstPersonControls.movementSpeed = 0;
    }
    isFirstPerson = !isFirstPerson;
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

etape1 = document.getElementById("etape1");
etape2 = document.getElementById("etape2");
etape3 = document.getElementById("etape3");

document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersectsHover = raycaster.intersectObjects(scene.children, true);
    if (intersectsHover.length > 0) {
        if (intersectsHover[0].object.name === "table-inclinee") {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    }
});

document.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        console.log("Objet cliqué :", intersects[0].object.name);

        if (intersects[0].object.name === "table-inclinee") {
            toggleControls();

            const box = new THREE.Box3().setFromObject(intersects[0].object);
            const center = new THREE.Vector3();
            box.getCenter(center);
            console.log("Centre de l'objet:", center);

            const newPosition = new THREE.Vector3(
                center.x,
                center.y + 40,
                center.z - 20
            );

            const tl = gsap.timeline();
            tl.to(camera.position, {
                duration: 1.5,
                x: newPosition.x,
                y: newPosition.y,
                z: newPosition.z,
                ease: "power2.inOut",
                onUpdate: () => {
                    firstPersonControls.lookAt(center.x, center.y, center.z - 2);
                },
                onComplete: () => {
                    showEtape(etape1);
                },
            });
        }
    }
});

function showEtape(etape) {
    etape.style.opacity = 1;
}

function hideEtape(etape) {
    etape.style.opacity = 0;
}

document.getElementById("retour").addEventListener("click", () => {
    hideEtape(etape1);
    const tl = gsap.timeline();
    tl.to(camera.position, {
        duration: 1.5,
        x: 0.01,
        y: 0.001,
        z: 0,
        onUpdate: () => {
            firstPersonControls.lookAt(0, 0, 0);
        },
        onComplete: () => {
            toggleControls();
        },
    });
});

// Fonction animate
function animate() {
    if (isFirstPerson) {
        firstPersonControls.update(0.1);
    } else {
        controls.update();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// document.addEventListener('click', onMouseDown);

// function onMouseDown(event) {
//
//     const tl = gsap.timeline();
//     tl.to(camera.position, {
//         duration: 1,
//         x:0,
//         y:80,
//         z:100,
//         onUpdate: () => {
//             camera.lookAt(-100, 0, 70);
//         }
//     });

//     document.addEventListener('click', () => {
//
//         const tl = gsap.timeline();
//         tl.to(camera.position, {
//             duration: 1,
//             x:250,
//             y:140,
//             z:0,
//             onUpdate: () => {
//                 camera.lookAt(0,50,0);
//             }
//         });
//     });

// }
