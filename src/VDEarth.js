import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  AmbientLight,
  AxesHelper,
  FontLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import _ from 'lodash';
import model from './model';
import group from './group';
import marker from './markers';
import './images/world.jpg';

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
  // var bgTexture = new TextureLoader().load('./images/field.jpg');
  // this.scene.background = bgTexture;
}

// 实时更新
function animate() {
  //更新控制器
  this.controls.update();
  render.call(this);

  this.layer.rotation.y -= 0.002;
  requestAnimationFrame(animate.bind(this));
}

// 渲染
function render() {
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

// 创建对象
function initObj() {
  let self = this;
  // 创建地球
  let globalMesh = new model().createGlobe(this.textrue);
  // 创建星点
  let stars = new model().createStars();
  // 创建地球模型组
  let baseGroup = new group();
  let globalGroup = baseGroup.add(globalMesh).add(stars);

  // 创建标记
  var myMarkers = new marker();
  myMarkers.addBoxMarkers(baseGroup, this.options.data);

  // 加载字体
  let fontloader = new FontLoader();
  if (this.font) {
    myMarkers.addNameMarkers(baseGroup, self.options.data, font);
  } else {
    fontloader.load('./fonts/SimHei_Regular.json', function (font) {
      self.font = font;
      myMarkers.addNameMarkers(baseGroup, self.options.data, font);
    });
  }
  this.layer = globalGroup;
  this.scene.add(globalGroup);
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
    this.layer = null;
    this.options = {
      container: document.querySelector('#vdEarth'),
      data: [],
    };
  }
  init(opt = {}) {
    _.merge(this.options, opt);

    var self = this;

    this.contentWidth = this.options.container.offsetWidth;
    this.contentHeight = this.options.container.offsetHeight;
    // 加载贴图
    let globeTextureLoader = new TextureLoader();
    globeTextureLoader.load('./images/world.jpg', function (textrue) {
      self.textrue = textrue;
      initRenderer.call(self);
      initScene.call(self);
      initCamera.call(self);
      initLight.call(self);
      initControls.call(self);
      initObj.call(self);
      animate.call(self);
    });
  }
}

export default VDEarth;
