import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  AmbientLight,
  Group,
  FontLoader,
} from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import _ from 'lodash';
import model from './model';
import marker from './markers';
import './images/world.jpg';
import socket from './socket';
import { minSize } from './utils';
import { createModelClick } from './eventLister';

// 初始化渲染器
function initRenderer() {
  this.renderer = new WebGLRenderer({ antialias: true });
  this.renderer.setSize(this.contentWidth, this.contentHeight);
  this.options.container.appendChild(this.renderer.domElement);
}

// 初始化照相机
function initCamera() {
  this.camera = new PerspectiveCamera(
    50,
    this.contentWidth / this.contentHeight,
    1,
    2000
  );
  this.camera.up.x = 0;
  this.camera.up.y = 1;
  this.camera.up.z = 0;
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = 500;
  this.camera.lookAt(0, 0, 0);
}

// 初始化灯光
function initLight() {
  // 自然光
  this.scene.add(new AmbientLight(0xffffff));
}

// 初始化场景
function initScene() {
  this.scene = new Scene();
}

// 实时更新
function animate() {
  //更新控制器
  this.controls.update();
  render.call(this);

  // 地球自转
  this.baseGroup.rotation.y -= 0.002;
  requestAnimationFrame(animate.bind(this));
}

// 渲染
function render() {
  TWEEN.update();

  this.renderer.render(this.scene, this.camera);
}

// 盘旋控制器
function initControls() {
  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  // 如果使用animate方法时，将此函数删除
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  this.controls.enableDamping = true;
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  this.controls.enableZoom = true;
  //是否自动旋转
  this.controls.autoRotate = false;
  //是否允许旋转
  this.controls.enableRotate = true;
  //设置相机距离原点的最近距离
  this.controls.minDistance = 20;
  //设置相机距离原点的最远距离
  this.controls.maxDistance = 1000;
  //是否开启右键拖拽
  this.controls.enablePan = false;
}

// 创建模型
function initObj() {
  let self = this;
  let fontloader = new FontLoader();
  // 创建地球模型组
  this.baseGroup = new Group();
  // 创建地球
  this.radius = minSize(this.contentWidth, this.contentHeight) * 0.2;
  let globalMesh = new model().createGlobe(this.radius, this.textrue);
  this.baseGroup.add(globalMesh);
  // 创建星点
  let stars = new model().createStars();
  this.baseGroup.add(stars);

  // 创建连接
  var mySocket = new socket(
    this.options.server,
    this.options.port,
    this.options.account,
    this.options.password
  );
  mySocket.init(function (data) {
    // 创建一个标记组
    self.markerGroup = new Group();
    // 创建标记
    var myMarkers = new marker();
    // 柱形
    myMarkers.addBoxMarkers(self.markerGroup, self.radius, data);
    // 加载字体
    if (self.font) {
      myMarkers.addNameMarkers(self.markerGroup, self.radius, data, self.font);
    } else {
      fontloader.load('./fonts/SimHei_Regular.json', function (font) {
        self.font = font;
        myMarkers.addNameMarkers(
          self.markerGroup,
          self.radius,
          data,
          self.font
        );
      });
    }
    self.baseGroup.add(self.markerGroup);
  });
  this.scene.add(this.baseGroup);
}

class VDEarth {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.textrue = null;
    this.font = null;
    this.light = null;
    this.controls = null;
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.options = {
      container: document.querySelector('#vdEarth'),
      server: 'localhost',
      port: 9998,
      account: 'admin',
      password: '123456',
    };
  }
  init(opt = {}) {
    var self = this;
    // 合并用户配置属性
    _.merge(this.options, opt);

    // 获取容器的宽高
    this.contentWidth = this.options.container.offsetWidth;
    this.contentHeight = this.options.container.offsetHeight;
    // 加载贴图
    let globeTextureLoader = new TextureLoader();
    globeTextureLoader.load('./images/world.jpg', function (textrue) {
      self.textrue = textrue;
      // 初始化渲染器
      initRenderer.call(self);
      // 初始化舞台
      initScene.call(self);
      // 初始化相机
      initCamera.call(self);
      // 初始化灯光
      initLight.call(self);
      // 初始化控制器
      initControls.call(self);
      // 初始化模型
      initObj.call(self);
      // 初始化点击事件
      createModelClick.call(self);
      // 初始化实时更新方法
      animate.call(self);
    });
  }
}

export default VDEarth;
