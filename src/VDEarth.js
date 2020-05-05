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
import markerFactory from './markers/markerFactory'
import socket from './socket'
import { createOvCtrl } from './ovCtrl'
import { createThemeCtrl } from './themeCtrl'
import { createRankCtrl } from './rankCtrl'
// import { minSize } from "./utils"
// import { createModelClick } from "./eventLister"
import './images/world_grey.jpg'
import './images/world_theme1.jpg'
import './images/dot.png'
import './images/shine.png'

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
  this.baseGroup.name = 'baseGroup'
  this.scene.add(this.baseGroup)
}

// 创建星星
function createStars() {
  // 创建星点
  let stars = new model().createStars()
  this.baseGroup.add(stars)
}

// 创建对象
function createMarkers() {
  let markers = this.options.markers
  if (markers) {
    this.baseGroup.remove(this.markerGroup)
    this.markerGroup = new Group()
    this.markerGroup.name = 'markerGroup'
    let makerFac = null

    // 创建标记
    for (var i = 0; i < markers.length; i++) {
      // 新增标记
      makerFac = markerFactory.create(Object.assign(this.default.barMarker, markers[i]))
      makerFac.add(this.markerGroup)

      makerFac = markerFactory.create(Object.assign(this.default.textMarker, markers[i]))
      makerFac.add(this.markerGroup)

      makerFac = markerFactory.create(Object.assign(this.default.imgMarker, markers[i]))
      makerFac.add(this.markerGroup)
    }
    this.baseGroup.add(this.markerGroup)
  }
  this.scene.add(this.baseGroup)
}

// 创建地球
function createEarth() {
  var self = this

  self.baseGroup.children.forEach(obj => {
    if (obj.type === 'Group' && obj.name == 'globeGroup') {
      self.baseGroup.remove(obj)
    }
  })
  self.globeGroup = new Group()
  self.globeGroup.name = 'globeGroup'

  switch (parseInt(this.options.theme)) {
    // 贴图地球
    case 1: {
      // 加载贴图
      let globeTextureLoader = new TextureLoader()
      globeTextureLoader.load('./images/world_theme1.jpg', function (textrue) {
        // 创建地球模型
        let globalMesh = new model().createGlobe(self.options.radius, textrue)
        self.globeGroup.add(globalMesh)
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
        self.globeGroup.add(globelParticles)
      }
      break
    }
    case 3: {
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
        self.globeGroup.add(globelParticles)

        // 外球体
        let ballBox = new model().createBallBox(self.options.radius * 1.2)
        this.globeGroup.add(ballBox)

        // 外球亮点
        let shinePoints = new model().createShinePoints(ballBox.geometry, this.shineTexture, 30)
        this.globeGroup.add(shinePoints)
      }
    }
    default:
      break
  }
  this.baseGroup.add(this.globeGroup)
}

// socket初始化
function initSocket(callback) {
  var self = this

  // 创建连接
  var mySocket = new socket(
    this.options.socket.server,
    this.options.socket.port,
    this.options.socket.account,
    this.options.socket.password
  )
  mySocket.init(function (data) {
    if (_.isFunction(callback)) {
      callback(data)
    }
  })
}
// 图片透明度转换
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
    this.default = {
      barMarker: { type: 'bar', radius: 200, width: 5, height: 5 },
      imgMarker: {
        type: 'img',
        imgUrl: './images/fire.png',
        radius: 200,
        size: 10,
      },
      textMarker: {
        type: 'text',
        font: './fonts/SimHei_Regular.json',
        radius: 200,
        size: 10,
      },
    }

    this.options = {
      container: document.querySelector('#vdEarth'),
      radius: 200,
      dataSource: 'default',
      socket: {
        server: 'localhost',
        port: 9998,
        account: 'admin',
        password: '123456',
      },
      theme: 2,
      markers: [],
    }
  }
  init(opt = {}) {
    let self = this
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

    this.ovCtrl = createOvCtrl()
    this.themeCtrl = createThemeCtrl(this.options.theme, function (val) {
      self.options.theme = val
      createEarth.call(self)
    })
    this.rankCtrl = createRankCtrl()

    // 加载数据源
    switch (this.options.dataSource) {
      case 'socket':
        initSocket.call(this, function (data) {
          if (data.marker) {
            self.options.markers.push({ data: data.marker })
            createMarkers.call(self)
          } else if (data.overview) {
            self.ovCtrl.querySelector('.total').innerText = data.overview[0].total
            self.ovCtrl.querySelector('.cure').innerText = data.overview[0].cure
            self.ovCtrl.querySelector('.death').innerText = data.overview[0].death
            self.ovCtrl.querySelector('.new').innerText = data.overview[0].new
            self.ovCtrl.querySelector('.now').innerText = data.overview[0].now
            self.ovCtrl.querySelector('.time span').innerText = data.overview[0].time
          } else if (data.rank) {
            for (let i = 0, rows = self.rankCtrl.querySelectorAll('.item'); i < rows.length; i++) {
              rows[i].querySelector('.name').innerText = data.rank[i].name
              rows[i].querySelector('.value').innerText = data.rank[i].total
            }
          }
        })
        break
      default:
        createMarkers.call(this)
        break
    }
  }
}

export default VDEarth
