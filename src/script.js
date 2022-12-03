import './style.css';
import * as THREE from 'three'
import {MOUSE,TOUCH} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import skyImage from '../texture/height2.jpg'


//Loading


// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Import Model-----------------------------------------------
const gltfLoader = new GLTFLoader();
gltfLoader.load('./models/name.gltf', (gltfScene) => {

    gltfScene.scene.position.y=-0.15;
    gltfScene.scene.position.x=-0.7;
    gltfScene.scene.position.z=0.5
    ;

    gltfScene.scene.scale.set(0.2,0.2,0.2);

    // gltfScene.layers.set(1);
    scene.add(gltfScene.scene);
});

//Import Model-----------------------------------------------
// const gltfLoader2 = new GLTFLoader();
// gltfLoader2.load('./models/scene.gltf', (gltfScene2) => {

//     gltfScene2.scene.position.y=-0.15;
//     gltfScene2.scene.position.x=-0.7;
//     gltfScene2.scene.position.z=0.5
//     ;

//     // gltfScene2.scene.scale.set(0.2,0.2,0.2);

//     // gltfScene.layers.set(1);
//     scene.add(gltfScene2.scene);
// });

// Moon

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./texture/NormalMap.png')
const textureLoader2 = new THREE.TextureLoader()
const moonTexture = textureLoader2.load('./texture/moon.jpg')

const moonSphere = new THREE.SphereGeometry(.5, 64, 64)
const material = new THREE.MeshStandardMaterial();
material.metalness=0.2
material.roughness=0.6
material.map=moonTexture
material.normalMap = normalTexture

const moon = new THREE.Mesh(moonSphere,material)
scene.add(moon)

//Stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }  
  Array(200).fill().forEach(addStar);


  //SKySphere
const skySphere = new THREE.SphereGeometry(50, 64, 64)
const skyTexture = new THREE.TextureLoader().load( './texture/sky4.jpg' );
const skyMaterial = new THREE.MeshBasicMaterial( { 
    map: skyTexture 
} );

const sky = new THREE.Mesh(skySphere, skyMaterial)
sky.material.side = THREE.BackSide;
sky.rotation.z = 0;
sky.rotation.y = 2;
// sky.layers.set(1)
scene.add(sky)

// Lights

const pointLight = new THREE.PointLight(0x00FFFF, 0.5)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 1.2
scene.add(pointLight)

const light = new THREE.AmbientLight( 0xffffff, 0.075 ); 
scene.add( light );

//Light 2 Red
const pointLight2 = new THREE.PointLight(0x96ff)
pointLight2.position.set(-2.03, 1.23, -0.07)
pointLight2.intensity = 0.1
scene.add(pointLight2)

// const redLight= gui.addFolder('Red Light')

// redLight.add(pointLight2.position, 'x').min(-10).max(10).step(.01)
// redLight.add(pointLight2.position, 'y').min(-10).max(10).step(.01)
// redLight.add(pointLight2.position, 'z').min(-10).max(10).step(.01)
// redLight.add(pointLight2,'intensity').min(-10).max(10).step(.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5)
// scene.add(pointLightHelper2)

//Light 3 Blue
const pointLight3 = new THREE.PointLight(0x96ff, 1)
pointLight3.position.set(1.56, -1.31, -0.43)
pointLight3.intensity = 0.1
scene.add(pointLight3)

// const blueLight= gui.addFolder('Blue Light')

// blueLight.add(pointLight3.position, 'x').min(-10).max(10).step(.01)
// blueLight.add(pointLight3.position, 'y').min(-10).max(10).step(.01)
// blueLight.add(pointLight3.position, 'z').min(-10).max(10).step(.01)
// blueLight.add(pointLight3,'intensity').min(-10).max(10).step(.01)

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.5)
// scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2


scene.add(camera)

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03;

controls.enableZoom = false
controls.enablePan = false

controls.minPolarAngle = 0; 
controls.maxPolarAngle = Math.PI/0.3;

controls.minAzimuthAngle = - 1.745; 
controls.maxAzimuthAngle = 1.745; 

// Mouse buttons
controls.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

// Touch fingers
controls.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

controls.target.set(0, 0, 1)

// Bloom pass
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
)
bloomPass.threshold = 0
bloomPass.strength = 0.6
bloomPass.radius = 0

const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);





/**
 * Animate
 */

//On Hover effect
document.addEventListener('mousemove',onDocumentMouseMove)

let mouseX=0;
let mouseY=0;
let mouseZ=0;

let targetX=0;
let targetY=0;
let targetZ=0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;
const windowZ = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX=(event.clientX-windowX)
    mouseY=(event.clientY-windowY)
    mouseZ=(event.clientZ-windowY)
}


//On Scrool Parallax effect
// const updateSphere = () =>{
//     moon.position.y=window.scrollY*-.002
// }
// window.addEventListener('scroll', updateSphere)


// Start tick on first frame
const clock = new THREE.Clock()

const tick = () =>
{
    //On Hover update
    targetX=mouseX*0.002
    // targetY=mouseY*0.002
    targetZ=mouseZ*0.002

    //Update camera
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    moon.rotation.y = .5 * elapsedTime
    moon.rotation.z  = .5 * elapsedTime

    moon.rotation.y += .5 * (targetX-moon.rotation.y)
    moon.rotation.x += .5 * (targetY-moon.rotation.x)
    moon.position.z += -.5 * (targetY-moon.rotation.x)
    

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    // camera.layers.set(1);
    bloomComposer.render();
}

tick()