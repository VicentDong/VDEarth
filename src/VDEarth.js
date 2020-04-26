import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  AmbientLight,
  Group,
  FontLoader,
} from 'three'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import _ from 'lodash'
import model from './model'
import marker from './markers'
import socket from './socket'
// import { minSize } from "./utils"
// import { createModelClick } from "./eventLister"
import './images/world_grey.jpg'
import './images/world_theme1.jpg'
import './images/dot.png'
import './images/shine.png'
import './images/fire.png'

// 初始化渲染器
function initRenderer() {
  this.renderer = new WebGLRenderer({ antialias: true })
  this.renderer.setSize(this.contentWidth, this.contentHeight)
  this.options.container.appendChild(this.renderer.domElement)
}

// 初始化照相机
function initCamera() {
  this.camera = new PerspectiveCamera(50, this.contentWidth / this.contentHeight, 1, 2000)
  this.camera.up.x = 0
  this.camera.up.y = 1
  this.camera.up.z = 0
  this.camera.position.x = 0
  this.camera.position.y = 0
  this.camera.position.z = 1000
  this.camera.lookAt(0, 0, 0)
}

// 初始化灯光
function initLight() {
  // 自然光
  this.scene.add(new AmbientLight(0xffffff))
}

// 初始化场景
function initScene() {
  this.scene = new Scene()
  // var bgTexture = new TextureLoader().load('./images/field.jpg');
  // this.scene.background = bgTexture;
}

// 实时更新
function animate() {
  //更新控制器
  this.controls.update()
  render.call(this)
  if (this.baseGroup) {
    // 地球自转
    this.baseGroup.rotation.y -= 0.002
  }
  requestAnimationFrame(animate.bind(this))
}

// 渲染
function render() {
  TWEEN.update()

  this.renderer.render(this.scene, this.camera)
}

// 盘旋控制器
function initControls() {
  this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  // 如果使用animate方法时，将此函数删除
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  this.controls.enableDamping = true
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  this.controls.enableZoom = true
  //是否自动旋转
  this.controls.autoRotate = false
  //是否允许旋转
  this.controls.enableRotate = true
  //设置相机距离原点的最近距离
  this.controls.minDistance = 20
  //设置相机距离原点的最远距离
  this.controls.maxDistance = 1000
  //是否开启右键拖拽
  this.controls.enablePan = false
}

// 创建组
function initGroups() {
  // 创建基础组
  this.baseGroup = new Group()
  this.scene.add(this.baseGroup)
}

// 创建星星
function createStars() {
  // 创建星点
  let stars = new model().createStars()
  this.baseGroup.add(stars)
}

// 创建对象
// function initObj() {
//   let self = this
//   let fontloader = new FontLoader()

//   // 创建连接
//   var mySocket = new socket(
//     this.options.server,
//     this.options.port,
//     this.options.account,
//     this.options.password
//   )
//   mySocket.init(function (data) {
//     self.markerGroup = new Group()
//     // 创建标记
//     var myMarkers = new marker()
//     // 柱形
//     myMarkers.addBoxMarkers(self.markerGroup, self.radius, data)
//     // 加载字体
//     if (self.font) {
//       myMarkers.addNameMarkers(self.markerGroup, self.radius, data, self.font)
//     } else {
//       fontloader.load('./fonts/SimHei_Regular.json', function (font) {
//         self.font = font
//         myMarkers.addNameMarkers(self.markerGroup, self.radius, data, self.font)
//       })
//     }
//     self.baseGroup.add(self.markerGroup)
//   })
//   this.scene.add(this.baseGroup)
// }

// 创建地球
function createEarth() {
  var self = this
  switch (this.options.theme) {
    // 贴图地球
    case 1: {
      // 加载贴图
      let globeTextureLoader = new TextureLoader()
      globeTextureLoader.load('./images/world_theme1.jpg', function (textrue) {
        // 创建地球模型
        let globalMesh = new model().createGlobe(self.options.radius, textrue)
        self.baseGroup.add(globalMesh)
      })
      break
    }
    // 粒子地球
    case 2: {
      this.earthImgPath = './images/world_grey.jpg'
      this.dotTexture = new TextureLoader().load('./images/dot.png')
      this.shineTexture = new TextureLoader().load('./images/shine.png')
      var earthSrcImgEle = document.createElement('img')
      earthSrcImgEle.src = this.earthImgPath
      earthSrcImgEle.onload = () => {
        computeImgData.call(self, earthSrcImgEle)
        // 球体
        let globelParticles = new model().createGlobeParticles(
          self.options.radius, // 半径
          250, // 分割数
          self.earthImg,
          self.dotTexture
        )
        self.baseGroup.add(globelParticles)

        // 外球体
        let ballBox = new model().createBallBox(self.options.radius * 1.2)
        this.baseGroup.add(ballBox)

        // 外球亮点
        let shinePoints = new model().createShinePoints(ballBox.geometry, this.shineTexture, 30)
        this.baseGroup.add(shinePoints)
      }
      break
    }
    default:
      break
  }
}

function computeImgData(ele) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = ele.width
  canvas.height = ele.height
  ctx.drawImage(ele, 0, 0, ele.width, ele.height)
  // 图片高度
  this.earthImg = ctx.getImageData(0, 0, ele.width, ele.height)
}
class VDEarth {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.font = null
    this.light = null
    this.controls = null
    this.contentWidth = 0
    this.contentHeight = 0

    this.options = {
      container: document.querySelector('#vdEarth'),
      radius: 200,
      server: 'localhost',
      port: 9998,
      account: 'admin',
      password: '123456',
      theme: 2,
    }
  }
  init(opt = {}) {
    _.merge(this.options, opt)
    this.contentWidth = this.options.container.offsetWidth
    this.contentHeight = this.options.container.offsetHeight
    // 初始化
    initRenderer.call(this)
    initScene.call(this)
    initCamera.call(this)
    initLight.call(this)
    initControls.call(this)
    initGroups.call(this)
    createStars.call(this)
    animate.call(this)
    createEarth.call(this)
  }
}

export default VDEarth
