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
import socket from './socket';

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
  let fontloader = new FontLoader();
  // 创建地球
  let globalMesh = new model().createGlobe(this.textrue);
  // 创建星点
  let stars = new model().createStars();
  // 创建地球模型组
  let baseGroup = new group();
  let globalGroup = baseGroup.add(globalMesh).add(stars);

  // 创建标记
  var myMarkers = new marker();
  socket.load(function (data) {
    myMarkers.addBoxMarkers(baseGroup, data);
    // 加载字体
    if (self.font) {
      myMarkers.addNameMarkers(baseGroup, self.options.data, font);
    } else {
      fontloader.load('./fonts/SimHei_Regular.json', function (font) {
        self.font = font;
        myMarkers.addNameMarkers(baseGroup, self.options.data, font);
      });
    }
  });
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
    this.data = [
      {
        name: '中国',
        position: [116.2, 39.55],
        value: Math.random() * 1000000,
      },
      {
        name: '中非共和国',
        position: [18.35, 4.23],
        value: Math.random() * 1000000,
      },
      {
        name: '智利',
        position: [-70.4, -33.24],
        value: Math.random() * 1000000,
      },
      {
        name: '乍得',
        position: [14.59, 12.1],
        value: Math.random() * 1000000,
      },
      {
        name: '赞比亚',
        position: [28.16, -15.28],
        value: Math.random() * 1000000,
      },
      {
        name: '越南',
        position: [105.55, 21.05],
        value: Math.random() * 1000000,
      },
      {
        name: '约旦',
        position: [35.52, 31.57],
        value: Math.random() * 1000000,
      },
      {
        name: '英属维尔京群岛',
        position: [-64.37, 18.27],
        value: Math.random() * 1000000,
      },
      {
        name: '英国',
        position: [-0.05, 51.36],
        value: Math.random() * 1000000,
      },
      {
        name: '印度尼西亚',
        position: [106.49, -6.09],
        value: Math.random() * 1000000,
      },
      {
        name: '印度',
        position: [77.13, 28.37],
        value: Math.random() * 1000000,
      },
      {
        name: '意大利',
        position: [12.29, 41.54],
        value: Math.random() * 1000000,
      },
      {
        name: '以色列',
        position: [35.12, 31.47],
        value: Math.random() * 1000000,
      },
      {
        name: '伊朗',
        position: [51.3, 35.44],
        value: Math.random() * 1000000,
      },
      {
        name: '伊拉克',
        position: [44.3, 33.2],
        value: Math.random() * 1000000,
      },
      {
        name: '亚美尼亚',
        position: [44.31, 40.1],
        value: Math.random() * 1000000,
      },
      {
        name: '牙买加',
        position: [-76.5, 18.0],
        value: Math.random() * 1000000,
      },
      {
        name: '匈牙利',
        position: [19.05, 47.29],
        value: Math.random() * 1000000,
      },
      {
        name: '新西兰',
        position: [174.46, -41.19],
        value: Math.random() * 1000000,
      },
      {
        name: '新喀里多尼亚',
        position: [166.3, -22.17],
        value: Math.random() * 1000000,
      },
      {
        name: '希腊',
        position: [23.46, 37.58],
        value: Math.random() * 1000000,
      },
      {
        name: '西班牙',
        position: [-3.45, 40.25],
        value: Math.random() * 1000000,
      },
      {
        name: '乌兹别克斯坦',
        position: [69.1, 41.2],
        value: Math.random() * 1000000,
      },
      {
        name: '乌拉圭',
        position: [-56.11, -34.5],
        value: Math.random() * 1000000,
      },
      {
        name: '乌克兰',
        position: [30.28, 50.3],
        value: Math.random() * 1000000,
      },
      {
        name: '乌干达',
        position: [32.3, 0.2],
        value: Math.random() * 1000000,
      },
      {
        name: '文莱',
        position: [115.0, 4.52],
        value: Math.random() * 1000000,
      },
      {
        name: '委内瑞拉',
        position: [-66.55, 10.3],
        value: Math.random() * 1000000,
      },
      {
        name: '危地马拉',
        position: [-90.22, 14.4],
        value: Math.random() * 1000000,
      },
      {
        name: '瓦努阿图',
        position: [168.18, -17.45],
        value: Math.random() * 1000000,
      },
      {
        name: '土库曼斯坦',
        position: [57.5, 38.0],
        value: Math.random() * 1000000,
      },
      {
        name: '土耳其',
        position: [32.54, 39.57],
        value: Math.random() * 1000000,
      },
      {
        name: '图瓦卢',
        position: [179.13, -8.31],
        value: Math.random() * 1000000,
      },
      {
        name: '突尼斯',
        position: [10.11, 36.5],
        value: Math.random() * 1000000,
      },
      {
        name: '汤加',
        position: [-174.0, -21.1],
        value: Math.random() * 1000000,
      },
      {
        name: '坦桑尼亚',
        position: [35.45, -6.08],
        value: Math.random() * 1000000,
      },
      {
        name: '泰国',
        position: [100.35, 13.45],
        value: Math.random() * 1000000,
      },
      {
        name: '塔吉克斯坦',
        position: [68.48, 38.33],
        value: Math.random() * 1000000,
      },
      {
        name: '索马里',
        position: [45.25, 2.02],
        value: Math.random() * 1000000,
      },
      {
        name: '所罗门群岛',
        position: [159.57, -9.27],
        value: Math.random() * 1000000,
      },
      {
        name: '苏里南',
        position: [-55.1, 5.5],
        value: Math.random() * 1000000,
      },
      {
        name: '苏丹',
        position: [32.35, 15.31],
        value: Math.random() * 1000000,
      },
      {
        name: '斯威士兰',
        position: [31.06, -26.18],
        value: Math.random() * 1000000,
      },
      {
        name: '斯洛文尼亚',
        position: [14.33, 46.04],
        value: Math.random() * 1000000,
      },
      {
        name: '斯洛伐克',
        position: [17.07, 48.1],
        value: Math.random() * 1000000,
      },
      {
        name: '圣文森特和格林纳丁斯',
        position: [-61.1, 13.1],
        value: Math.random() * 1000000,
      },
      {
        name: '圣皮埃尔和密克隆',
        position: [-56.12, 46.46],
        value: Math.random() * 1000000,
      },
      {
        name: '圣马力诺',
        position: [12.3, 43.55],
        value: Math.random() * 1000000,
      },
      {
        name: '圣卢西亚',
        position: [-60.58, 14.02],
        value: Math.random() * 1000000,
      },
      {
        name: '圣基茨和尼维斯',
        position: [-62.43, 17.17],
        value: Math.random() * 1000000,
      },
      {
        name: '圣多美和普林西比',
        position: [6.39, 0.1],
        value: Math.random() * 1000000,
      },
      {
        name: '沙特阿拉伯',
        position: [46.42, 24.41],
        value: Math.random() * 1000000,
      },
      {
        name: '塞浦路斯',
        position: [33.25, 35.1],
        value: Math.random() * 1000000,
      },
      {
        name: '塞内加尔',
        position: [-17.29, 14.34],
        value: Math.random() * 1000000,
      },
      {
        name: '塞拉利昂',
        position: [-13.17, 8.3],
        value: Math.random() * 1000000,
      },
      {
        name: '萨摩亚',
        position: [-171.5, -13.5],
        value: Math.random() * 1000000,
      },
      {
        name: '萨尔瓦多',
        position: [-89.1, 13.4],
        value: Math.random() * 1000000,
      },
      {
        name: '瑞士',
        position: [7.28, 46.57],
        value: Math.random() * 1000000,
      },
      {
        name: '瑞典',
        position: [18.03, 59.2],
        value: Math.random() * 1000000,
      },
      {
        name: '葡萄牙',
        position: [-9.1, 38.42],
        value: Math.random() * 1000000,
      },
      {
        name: '帕劳',
        position: [134.28, 7.2],
        value: Math.random() * 1000000,
      },
      {
        name: '诺福克岛',
        position: [168.43, -45.2],
        value: Math.random() * 1000000,
      },
      {
        name: '挪威',
        position: [10.45, 59.55],
        value: Math.random() * 1000000,
      },
      {
        name: '尼日利亚',
        position: [7.32, 9.05],
        value: Math.random() * 1000000,
      },
      {
        name: '尼日尔',
        position: [2.06, 13.27],
        value: Math.random() * 1000000,
      },
      {
        name: '尼加拉瓜',
        position: [-86.2, 12.06],
        value: Math.random() * 1000000,
      },
      {
        name: '尼泊尔',
        position: [85.2, 27.45],
        value: Math.random() * 1000000,
      },
      {
        name: '南斯拉夫',
        position: [20.37, 44.5],
        value: Math.random() * 1000000,
      },
      {
        name: '纳米比亚',
        position: [17.04, -22.35],
        value: Math.random() * 1000000,
      },
      {
        name: '墨西哥',
        position: [-99.1, 19.2],
        value: Math.random() * 1000000,
      },
      {
        name: '莫桑比克',
        position: [32.32, -25.58],
        value: Math.random() * 1000000,
      },
      {
        name: '摩尔多瓦共和国',
        position: [28.5, 47.02],
        value: Math.random() * 1000000,
      },
      {
        name: '缅甸',
        position: [96.2, 16.45],
        value: Math.random() * 1000000,
      },
      {
        name: '秘鲁',
        position: [-77.0, -12.0],
        value: Math.random() * 1000000,
      },
      {
        name: '孟加拉国',
        position: [90.26, 23.43],
        value: Math.random() * 1000000,
      },
      {
        name: '美属维尔京群岛',
        position: [-64.56, 18.21],
        value: Math.random() * 1000000,
      },
      {
        name: '美属萨摩亚',
        position: [-170.43, -14.16],
        value: Math.random() * 1000000,
      },
      {
        name: '美国',
        position: [-77.02, 39.91],
        value: Math.random() * 1000000,
      },
      {
        name: '毛里塔尼亚',
        position: [57.3, -20.1],
        value: Math.random() * 1000000,
      },
      {
        name: '马约特岛',
        position: [45.14, -12.48],
        value: Math.random() * 1000000,
      },
      {
        name: '马提尼克岛',
        position: [-61.02, 14.36],
        value: Math.random() * 1000000,
      },
      {
        name: '马其顿',
        position: [21.26, 42.01],
        value: Math.random() * 1000000,
      },
      {
        name: '马里',
        position: [-7.55, 12.34],
        value: Math.random() * 1000000,
      },
      {
        name: '马来西亚',
        position: [101.41, 3.09],
        value: Math.random() * 1000000,
      },
      {
        name: '马拉维',
        position: [33.48, -14.0],
        value: Math.random() * 1000000,
      },
      {
        name: '马耳他',
        position: [14.31, 35.54],
        value: Math.random() * 1000000,
      },
      {
        name: '马尔代夫',
        position: [73.28, 4.0],
        value: Math.random() * 1000000,
      },
      {
        name: '马达加斯加',
        position: [47.31, -18.55],
        value: Math.random() * 1000000,
      },
      {
        name: '罗马尼亚',
        position: [26.1, 44.27],
        value: Math.random() * 1000000,
      },
      {
        name: '卢旺达',
        position: [30.04, -1.59],
        value: Math.random() * 1000000,
      },
      {
        name: '卢森堡',
        position: [6.09, 49.37],
        value: Math.random() * 1000000,
      },
      {
        name: '列支敦士登',
        position: [9.31, 47.08],
        value: Math.random() * 1000000,
      },
      {
        name: '利比里亚',
        position: [-10.47, 6.18],
        value: Math.random() * 1000000,
      },
      {
        name: '立陶宛',
        position: [25.19, 54.38],
        value: Math.random() * 1000000,
      },
      {
        name: '黎巴嫩',
        position: [35.31, 33.53],
        value: Math.random() * 1000000,
      },
      {
        name: '老挝',
        position: [102.36, 17.58],
        value: Math.random() * 1000000,
      },
      {
        name: '莱索托',
        position: [27.3, -29.18],
        value: Math.random() * 1000000,
      },
      {
        name: '拉脱维亚',
        position: [24.08, 56.53],
        value: Math.random() * 1000000,
      },
      {
        name: '肯尼亚',
        position: [36.48, -1.17],
        value: Math.random() * 1000000,
      },
      {
        name: '克罗地亚',
        position: [15.58, 45.5],
        value: Math.random() * 1000000,
      },
      {
        name: '科威特',
        position: [48.0, 29.3],
        value: Math.random() * 1000000,
      },
      {
        name: '科特迪瓦',
        position: [-5.17, 6.49],
        value: Math.random() * 1000000,
      },
      {
        name: '科摩罗',
        position: [43.16, -11.4],
        value: Math.random() * 1000000,
      },
      {
        name: '开曼群岛',
        position: [-81.24, 19.2],
        value: Math.random() * 1000000,
      },
      {
        name: '卡塔尔',
        position: [51.35, 25.15],
        value: Math.random() * 1000000,
      },
      {
        name: '喀麦隆',
        position: [11.35, 3.5],
        value: Math.random() * 1000000,
      },
      {
        name: '津巴布韦',
        position: [31.02, -17.43],
        value: Math.random() * 1000000,
      },
      {
        name: '捷克共和国',
        position: [14.22, 50.05],
        value: Math.random() * 1000000,
      },
      {
        name: '柬埔寨',
        position: [104.55, 11.33],
        value: Math.random() * 1000000,
      },
      {
        name: '加蓬',
        position: [9.26, 0.25],
        value: Math.random() * 1000000,
      },
      {
        name: '加纳',
        position: [-0.06, 5.35],
        value: Math.random() * 1000000,
      },
      {
        name: '加拿大',
        position: [-75.42, 45.27],
        value: Math.random() * 1000000,
      },
      {
        name: '几内亚比绍',
        position: [-15.45, 11.45],
        value: Math.random() * 1000000,
      },
      {
        name: '几内亚',
        position: [-13.49, 9.29],
        value: Math.random() * 1000000,
      },
      {
        name: '吉尔吉斯斯坦',
        position: [74.46, 42.54],
        value: Math.random() * 1000000,
      },
      {
        name: '吉布提',
        position: [42.2, 11.08],
        value: Math.random() * 1000000,
      },
      {
        name: '基里巴斯',
        position: [173.0, 1.3],
        value: Math.random() * 1000000,
      },
      {
        name: '洪都拉斯',
        position: [-87.14, 14.05],
        value: Math.random() * 1000000,
      },
      {
        name: '赫德岛和麦当劳群岛',
        position: [74.0, -53.0],
        value: Math.random() * 1000000,
      },
      {
        name: '荷属安的列斯',
        position: [-69.0, 12.05],
        value: Math.random() * 1000000,
      },
      {
        name: '荷兰',
        position: [4.54, 52.23],
        value: Math.random() * 1000000,
      },
      {
        name: '韩国',
        position: [126.58, 37.31],
        value: Math.random() * 1000000,
      },
      {
        name: '海地',
        position: [-72.2, 18.4],
        value: Math.random() * 1000000,
      },
      {
        name: '哈萨克斯坦',
        position: [71.3, 51.1],
        value: Math.random() * 1000000,
      },
      {
        name: '圭亚那',
        position: [-58.12, 6.5],
        value: Math.random() * 1000000,
      },
      {
        name: '瓜德罗普岛',
        position: [-61.44, 16.0],
        value: Math.random() * 1000000,
      },
      {
        name: '古巴',
        position: [-82.22, 23.08],
        value: Math.random() * 1000000,
      },
      {
        name: '根西岛',
        position: [-2.33, 49.26],
        value: Math.random() * 1000000,
      },
      {
        name: '格鲁吉亚',
        position: [44.5, 41.43],
        value: Math.random() * 1000000,
      },
      {
        name: '格陵兰',
        position: [-51.35, 64.1],
        value: Math.random() * 1000000,
      },
      {
        name: '哥斯达黎加',
        position: [-84.02, 9.55],
        value: Math.random() * 1000000,
      },
      {
        name: '哥伦比亚',
        position: [-74.0, 4.34],
        value: Math.random() * 1000000,
      },
      {
        name: '刚果',
        position: [15.12, -4.09],
        value: Math.random() * 1000000,
      },
      {
        name: '刚果(扎伊尔)',
        position: [15.15, -4.2],
        value: Math.random() * 1000000,
      },
      {
        name: '冈比亚',
        position: [-16.4, 13.28],
        value: Math.random() * 1000000,
      },
      {
        name: '福克兰群岛(马尔维纳斯群岛)',
        position: [-59.51, -51.4],
        value: Math.random() * 1000000,
      },
      {
        name: '佛得角',
        position: [-23.34, 15.02],
        value: Math.random() * 1000000,
      },
      {
        name: '芬兰',
        position: [25.03, 60.15],
        value: Math.random() * 1000000,
      },
      {
        name: '斐济',
        position: [178.3, -18.06],
        value: Math.random() * 1000000,
      },
      {
        name: '菲律宾',
        position: [121.03, 14.4],
        value: Math.random() * 1000000,
      },
      {
        name: '法属圭亚那',
        position: [-52.18, 5.05],
        value: Math.random() * 1000000,
      },
      {
        name: '法属波利尼西亚',
        position: [-149.34, -17.32],
        value: Math.random() * 1000000,
      },
      {
        name: '法罗群岛',
        position: [-6.56, 62.05],
        value: Math.random() * 1000000,
      },
      {
        name: '法国',
        position: [2.2, 48.5],
        value: Math.random() * 1000000,
      },
      {
        name: '厄立特里亚',
        position: [38.55, 15.19],
        value: Math.random() * 1000000,
      },
      {
        name: '厄瓜多尔',
        position: [-78.35, -0.15],
        value: Math.random() * 1000000,
      },
      {
        name: '俄罗斯',
        position: [37.35, 55.45],
        value: Math.random() * 1000000,
      },
      {
        name: '多米尼加共和国',
        position: [-69.59, 18.3],
        value: Math.random() * 1000000,
      },
      {
        name: '多米尼加',
        position: [-61.24, 15.2],
        value: Math.random() * 1000000,
      },
      {
        name: '多哥',
        position: [1.2, 6.09],
        value: Math.random() * 1000000,
      },
      {
        name: '东帝汶',
        position: [125.34, -8.29],
        value: Math.random() * 1000000,
      },
      {
        name: '德国',
        position: [13.25, 52.3],
        value: Math.random() * 1000000,
      },
      {
        name: '丹麦',
        position: [12.34, 55.41],
        value: Math.random() * 1000000,
      },
      {
        name: '赤道几内亚',
        position: [8.5, 3.45],
        value: Math.random() * 1000000,
      },
      {
        name: '朝鲜',
        position: [125.3, 39.09],
        value: Math.random() * 1000000,
      },
      {
        name: '布隆迪',
        position: [29.18, -3.16],
        value: Math.random() * 1000000,
      },
      {
        name: '布基纳法索',
        position: [-1.3, 12.15],
        value: Math.random() * 1000000,
      },
      {
        name: '不丹',
        position: [89.45, 27.31],
        value: Math.random() * 1000000,
      },
      {
        name: '博茨瓦纳',
        position: [25.57, -24.45],
        value: Math.random() * 1000000,
      },
      {
        name: '伯利兹',
        position: [-88.3, 17.18],
        value: Math.random() * 1000000,
      },
      {
        name: '玻利维亚',
        position: [-68.1, -16.2],
        value: Math.random() * 1000000,
      },
      {
        name: '波斯尼亚和黑塞哥维那',
        position: [18.26, 43.52],
        value: Math.random() * 1000000,
      },
      {
        name: '波兰',
        position: [21.0, 52.13],
        value: Math.random() * 1000000,
      },
      {
        name: '波多黎各',
        position: [-66.07, 18.28],
        value: Math.random() * 1000000,
      },
      {
        name: '冰岛',
        position: [-21.57, 64.1],
        value: Math.random() * 1000000,
      },
      {
        name: '比利时',
        position: [4.21, 50.51],
        value: Math.random() * 1000000,
      },
      {
        name: '比勒陀利亚',
        position: [28.12, -25.44],
        value: Math.random() * 1000000,
      },
      {
        name: '贝宁',
        position: [2.42, 6.23],
        value: Math.random() * 1000000,
      },
      {
        name: '北马里亚纳群岛',
        position: [145.45, 15.12],
        value: Math.random() * 1000000,
      },
      {
        name: '保加利亚',
        position: [23.2, 42.45],
        value: Math.random() * 1000000,
      },
      {
        name: '白俄罗斯',
        position: [27.3, 53.52],
        value: Math.random() * 1000000,
      },
      {
        name: '巴西',
        position: [-47.55, -15.47],
        value: Math.random() * 1000000,
      },
      {
        name: '巴拿马',
        position: [-79.25, 9.0],
        value: Math.random() * 1000000,
      },
      {
        name: '巴林',
        position: [50.3, 26.1],
        value: Math.random() * 1000000,
      },
      {
        name: '巴拉圭',
        position: [-57.3, -25.1],
        value: Math.random() * 1000000,
      },
      {
        name: '巴基斯坦',
        position: [73.1, 33.4],
        value: Math.random() * 1000000,
      },
      {
        name: '巴哈马',
        position: [-77.2, 25.05],
        value: Math.random() * 1000000,
      },
      {
        name: '巴布亚新几内亚',
        position: [147.08, -9.24],
        value: Math.random() * 1000000,
      },
      {
        name: '巴巴多斯',
        position: [-59.3, 13.05],
        value: Math.random() * 1000000,
      },
      {
        name: '澳大利亚',
        position: [149.08, -35.15],
        value: Math.random() * 1000000,
      },
      {
        name: '奥地利',
        position: [16.22, 48.12],
        value: Math.random() * 1000000,
      },
      {
        name: '安提瓜和巴布达',
        position: [-61.48, 17.2],
        value: Math.random() * 1000000,
      },
      {
        name: '安哥拉',
        position: [13.15, -8.5],
        value: Math.random() * 1000000,
      },
      {
        name: '安道尔',
        position: [1.32, 42.31],
        value: Math.random() * 1000000,
      },
      {
        name: '爱沙尼亚',
        position: [24.48, 59.22],
        value: Math.random() * 1000000,
      },
      {
        name: '爱尔兰',
        position: [-6.15, 53.21],
        value: Math.random() * 1000000,
      },
      {
        name: '埃塞俄比亚',
        position: [38.42, 9.02],
        value: Math.random() * 1000000,
      },
      {
        name: '埃及',
        position: [31.14, 30.01],
        value: Math.random() * 1000000,
      },
      {
        name: '阿塞拜疆',
        position: [49.56, 40.29],
        value: Math.random() * 1000000,
      },
      {
        name: '阿曼',
        position: [58.36, 23.37],
        value: Math.random() * 1000000,
      },
      {
        name: '阿鲁巴',
        position: [-70.02, 12.32],
        value: Math.random() * 1000000,
      },
      {
        name: '阿联酋',
        position: [54.22, 24.28],
        value: Math.random() * 1000000,
      },
      {
        name: '阿拉伯叙利亚共和国',
        position: [36.18, 33.3],
        value: Math.random() * 1000000,
      },
      {
        name: '阿拉伯利比亚民众国',
        position: [13.07, 32.49],
        value: Math.random() * 1000000,
      },
      {
        name: '阿根廷',
        position: [-60.0, -36.3],
        value: Math.random() * 1000000,
      },
      {
        name: '阿富汗',
        position: [69.11, 34.28],
        value: Math.random() * 1000000,
      },
      {
        name: '阿尔及利亚',
        position: [3.08, 36.42],
        value: Math.random() * 1000000,
      },
      {
        name: '阿尔巴尼亚',
        position: [19.49, 41.18],
        value: Math.random() * 1000000,
      },
    ];

    this.options = {
      container: document.querySelector('#vdEarth'),
      server: 'localhost',
      port: 9998,
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
