import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(35, 25, 35);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, 20);
scene.add(sunLight);

const pointLight = new THREE.PointLight(0xfff4cc, 0.7);
pointLight.position.set(10, 10, -10);
scene.add(pointLight);

const groundGeo = new THREE.PlaneGeometry(100, 100);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x6fbf73 });
const ground = new THREE.Mesh(groundGeo, grassMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const roadGeometry = new THREE.BoxGeometry(10, 1, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

const road4 = new THREE.Mesh(roadGeometry, roadMaterial);
road4.position.set(0, 0.5, 0);
road4.rotation.y = Math.PI / 2;
scene.add(road4);

const object1Geo = new THREE.BoxGeometry(10, 8, 18);
const object1Mat = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 });
const object1 = new THREE.Mesh(object1Geo, object1Mat);
object1.position.set(-35, 4, 30);
scene.add(object1);

const object2Geo = new THREE.BoxGeometry(14, 8, 18);
const object2Mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
const object2 = new THREE.Mesh(object2Geo, object2Mat);
object2.position.set(-6, 4, 30);
scene.add(object2);

const object3Geo = new THREE.BoxGeometry(29, 8, 18);
const object3Mat = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 });
const object3 = new THREE.Mesh(object3Geo, object3Mat);
object3.position.set(20, 4, 30);
scene.add(object3);

const object4Geo = new THREE.BoxGeometry(50, 8, 12);
const object4Mat = new THREE.MeshStandardMaterial({ color: 0x4682B4 });
const object4 = new THREE.Mesh(object4Geo, object4Mat);
object4.position.set(5, 4, -20);
scene.add(object4);

const treeMat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });
const treeGeo = new THREE.ConeGeometry(1.5, 4, 8);
const treePositions = [
  [-25, 2, -10],
  [-25, 2, 10],
  [20, 2, 10],
  [-20, 2, 30],
  [-26, 2, 30],
  [-28, 2, 35],
  [-27, 2, 25]
];
treePositions.forEach(([x, y, z]) => {
  const tree = new THREE.Mesh(treeGeo, treeMat);
  tree.position.set(x, y, z);
  scene.add(tree);
});

const lampMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const lampHeadMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffcc,
  emissive: 0xffff99,
  emissiveIntensity: 0.5
});

const lampPositions = [
  [-8, 3, -10],
  [-5, 3, 10],
  [-8, 3, -25],
  [5, 3, -10],
  [5, 3, 10]
];
lampPositions.forEach(([x, y, z]) => {
  const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
  const pole = new THREE.Mesh(poleGeo, lampMaterial);
  pole.position.set(x, 3.3, z);
  scene.add(pole);

  const headGeo = new THREE.SphereGeometry(0.5, 12, 12);
  const head = new THREE.Mesh(headGeo, lampHeadMaterial);
  head.position.set(x, 6.5, z);
  scene.add(head);

  const lampLight = new THREE.PointLight(0xffeeaa, 1, 15);
  lampLight.position.set(x, 6.5, z);
  scene.add(lampLight);
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
