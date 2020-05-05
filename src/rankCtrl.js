import './style/rankCtrl.less'
export function createRankCtrl() {
  let control = document.createElement('div')
  control.classList.add('rank')
  control.innerHTML = [
    '<div class="title">确诊人数</div><div class="items">',
    '<div class="item"><div class="value tri1">0</div><div class="name">美国</div><div class="bar first"></div><div class="triangle tri1"></div></div>',
    '<div class="item"><div class="value tri2">0</div><div class="name">西班牙</div><div class="bar second"></div><div class="triangle tri2"></div></div>',
    '<div class="item"><div class="value tri3">0</div><div class="name">意大利</div><div class="bar third"></div><div class="triangle tri3"></div></div>',
  ].join('')
  document.body.append(control)
  return control
}
