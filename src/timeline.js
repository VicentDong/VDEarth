import _ from 'lodash';

//  创建类目节点html
function createItems() {
  var timeItemEle = document.createElement('div');
  timeItemEle.classList = 'timeItems';
  this.controller.append(timeItemEle);
}
function generateItems() {
  var timeItemEle = this.controller.querySelector('.timeItems');
  var data = this.items;
  var index = this.index;
  for (var i in data) {
    var itemEle = document.createElement('div');
    itemEle.classList = 'item';

    var radio = document.createElement('div');
    radio.classList = i == index ? 'radio on' : 'radio';
    itemEle.append(radio);
    var trail = document.createElement('div');
    trail.classList = i == index ? 'trail on' : 'trail';
    itemEle.append(trail);

    var content = document.createElement('div');
    content.classList = 'content';
    content.innerHTML = data[i].name;
    itemEle.append(content);

    timeItemEle.append(itemEle);
  }
}

// 创建播放按钮
function createPlayBtn() {
  var self = this;
  var playBtn = document.createElement('div');
  playBtn.classList = 'control play iconfont icon-bofang';
  playBtn.addEventListener('click', () => {
    self.play(self.options.play);
  });
  this.controller.append(playBtn);
}

// 创建最前按钮
function createToStartBtn() {
  var self = this;
  var toStartBtn = document.createElement('div');
  toStartBtn.classList = 'control iconfont icon-zuizuo toStart';
  toStartBtn.addEventListener('click', () => {
    self.toStart(self.options.toStart);
  });
  this.controller.append(toStartBtn);
}
// 创建最后按钮
function createToEndBtn() {
  var self = this;
  var toEnd = document.createElement('div');
  toEnd.classList = 'control iconfont icon-zuiyou toEnd';
  toEnd.addEventListener('click', () => {
    self.toEnd(self.options.toEnd);
  });
  this.controller.append(toEnd);
}

// 创建快退按钮
function createToBackBtn() {
  var self = this;
  var toBackBtn = document.createElement('div');
  toBackBtn.classList = 'control iconfont icon-kuaitui toBack';
  toBackBtn.addEventListener('click', () => {
    self.toBack(self.options.toBack);
  });
  this.controller.append(toBackBtn);
}

// 创建快进按钮
function createToForwardBtn() {
  var self = this;
  var toForward = document.createElement('div');
  toForward.classList = 'control iconfont icon-kuaijin toForward';
  toForward.addEventListener('click', () => {
    self.toForward(self.options.toForward);
  });
  this.controller.append(toForward);
}

// 创建前一项按钮
function createToPrevBtn() {
  var self = this;
  var toPrevBtn = document.createElement('div');
  toPrevBtn.classList = 'control iconfont icon-zuo toPrev';
  toPrevBtn.addEventListener('click', () => {
    self.prev(self.options.toPrev);
  });
  this.controller.append(toPrevBtn);
}

// 创建后一项按钮
function createToNextBtn() {
  var self = this;
  var toNextBtn = document.createElement('div');
  toNextBtn.classList = 'control iconfont icon-tubiaozhizuo- toNext';
  toNextBtn.addEventListener('click', () => {
    self.next(self.options.toNext);
  });
  this.controller.append(toNextBtn);
}

// 创建控件
function createControls() {
  var container = this.options.container;

  // 创建timeline容器
  var timelineEle = document.createElement('div');
  timelineEle.classList = 'timeline';
  this.controller = timelineEle;
  // 添加到用户元素
  container.append(timelineEle);

  // 创建播放按钮
  if (this.options.showPlayBtn) {
    createPlayBtn.call(this);
  }
  // 创建最前按钮
  if (this.options.showStartBtn) {
    createToStartBtn.call(this);
  }
  // 创建快退按钮
  if (this.options.showBackBtn) {
    createToBackBtn.call(this);
  }
  // 创建前一项按钮
  if (this.options.showPrevBtn) {
    createToPrevBtn.call(this);
  }
  // 创建时间点容器
  createItems.call(this);
  // 创建时间项
  move.call(this);
  // 创建后一项按钮
  if (this.options.showNextBtn) {
    createToNextBtn.call(this);
  }
  // 创建快进按钮
  if (this.options.showForwardBtn) {
    createToForwardBtn.call(this);
  }
  // 创建最后按钮
  if (this.options.showEndBtn) {
    createToEndBtn.call(this);
  }
}

// 移动选中点
function move() {
  this.items = this.options.data.slice(this.start, this.end);

  var itemsEle = this.controller
    ? this.controller.querySelector('.timeItems')
    : null;
  if (itemsEle) {
    itemsEle.innerHTML = '';
  }
  generateItems.call(this);
}

class TimeLine {
  constructor() {
    this.timer = null;
    this.controller = null;
    this.index = 0;
    this.start = 0;
    this.end = 0;
    this.total = 0;
    this.items = [];
    this.speed = 0;
    this.playState = false;
    this.options = {
      // 容器
      container: null,
      // 数据
      data: [],
      // 播放间隔
      interval: 2000,
      // 类目个数
      size: 10,
      // 快进/快退速度
      speed: 5,
      // 是否显示播放按钮
      showPlayBtn: true,
      // 是否显示回到第一项按钮
      showStartBtn: true,
      // 是否显示回到最后一项按钮
      showEndBtn: true,
      // 是否显示快退按钮
      showBackBtn: true,
      // 是否显示快进按钮
      showForwardBtn: true,
      // 是否显示前一项按钮
      showNextBtn: true,
      // 是否显示后一项按钮
      showPrevBtn: true,
      // 播放
      play: null,
      // 暂停
      stop: null,
      // 第一项
      toStart: null,
      // 最后一项
      toEnd: null,
      // 快退
      toBack: null,
      // 快进
      toForward: null,
      // 下一项
      toNext: null,
      // 前一项
      toPrev: null,
      //自动播放
      autoPlay: false,
    };
  }
  get playState() {
    return this._playState;
  }
  set playState(value) {
    if (this.controller) {
      var playBtn = this.controller.querySelector('.play');
      if (value) {
        playBtn.classList.remove('icon-bofang');
        playBtn.classList.add('icon-zanting');
      } else {
        playBtn.classList.remove('icon-zanting');
        playBtn.classList.add('icon-bofang');
      }
    }
    this._playState = value;
  }

  init(opt = {}) {
    // 初始化配置
    _.merge(this.options, opt);

    // 初始化配置判断
    if (!this.options.container) {
      return null;
    }
    if (this.options.data.length <= 0) {
      var container = this.options.container;
      container.innerHTML = '请初始化控件数据';
      return null;
    }

    // 初始化属性
    this.total = this.options.data.length;
    if (this.total < this.options.size) {
      this.start = 0;
      this.index = this.total - 1;
      this.size = this.total;
    } else {
      this.start = this.total - this.options.size;
      this.index = this.options.size - 1;
      this.size = this.options.size;
    }
    this.speed = this.options.speed;
    this.end = this.total;

    // 创建控件html
    createControls.call(this);

    if (this.options.autoPlay) {
      this.play(this.options.play);
    }

    // 返回实例
    return this;
  }
  play(callback) {
    var self = this;
    this.speed = 1;
    this.playState = !this.playState;
    if (this.playState) {
      // 创建定时器
      this.timer = window.setInterval(() => {
        self.next(callback);
      }, this.options.interval);
    } else {
      this.stop(this.options.stop);
    }
  }
  stop(callback) {
    this.playState = false;
    window.clearInterval(this.timer);
    this.timer = null;
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  toStart(callback) {
    this.index = 0;
    this.start = 0;
    this.end = this.size;
    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  toEnd(callback) {
    this.index = this.size - 1;
    this.start = this.total - this.size;
    this.end = this.total;
    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  toBack(callback) {
    this.speed = this.options.speed;
    this.start -= this.speed;
    this.end -= this.speed;
    if (this.start <= 0) {
      this.end = this.size;
      this.start = 0;
    }
    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  toForward(callback) {
    this.speed = this.options.speed;
    this.start += this.speed;
    this.end += this.speed;
    if (this.end >= this.total) {
      this.end = this.total;
      this.start = this.total - this.size;
    }
    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  prev(callback) {
    this.speed = 1;
    if (this.index > 0) {
      this.index -= this.speed;
    } else if (this.start > 0) {
      this.index = 0;
      this.start -= this.speed;
      this.end -= this.speed;
    } else if (this.start == 0) {
      this.index = this.size - 1;
      this.start = this.total - this.size;
      this.end = this.total;
    }

    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
  next(callback) {
    this.speed = 1;
    if (this.index < this.size - 1) {
      this.index += this.speed;
    } else if (this.end < this.total) {
      this.index = this.size - 1;
      this.start += this.speed;
      this.end += this.speed;
    } else if (this.end == this.total) {
      this.index = 0;
      this.start = 0;
      this.end = this.size;
    }
    move.call(this);
    if (_.isFunction(callback)) {
      callback(this.items[this.index], this.index, this.start, this.end);
    }
  }
}

export default TimeLine;
