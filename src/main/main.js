import * as THREE from "three";

// console.log(THREE);
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// 导入动画库
import gsap from "gsap";

// 目标：了解three.js最基本的内容

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// // 设置动画
// var animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   //   设置重复的次数，无限次循环-1
//   repeat: -1,
//   //   往返运动
//   yoyo: true,
//   //   delay，延迟2秒运动
//   delay: 2,
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始");
//   },
// });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

// window.addEventListener("dblclick", () => {
//   //   console.log(animate1);
//   if (animate1.isActive()) {
//     //   暂停
//     animate1.pause();
//   } else {
//     //   恢复
//     animate1.resume();
//   }
// });
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //   双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //   退出全屏，使用document对象
    document.exitFullscreen();
  }
  //   console.log(fullScreenElement);
});
function render() {
  // // 获取时钟运行的总时长
  // let time = clock.getElapsedTime();
  // console.log("时钟运行总时长：", time);
  // //   let deltaTime = clock.getDelta();
  // //     console.log("两次获取时间的间隔时间：", deltaTime);
  // let t = time % 5;
  // cube.position.x = t * 1;
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

render();