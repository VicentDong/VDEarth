import './style/ovCtrl.less'
export function createOvCtrl() {
  let ovCtrl = document.createElement('div')
  ovCtrl.classList.add('overview')
  ovCtrl.innerHTML = [
    '<div class="title">全球实时疫情</div>',
    '<div class="time">更新时间：<span>2020-04-22 15:41:34</span></div>',
    '<div class="tab"><div class="total"> 84290 </div> <div>累计确诊</div> </div>',
    '<div class="tab"><div class="cure"> 78063 </div> <div>累计治愈</div> </div>',
    '<div class="tab"><div class="death"> 4642 </div> <div>累计死亡</div> </div>',
    '<div class="tab"><div class="new"> 78063 </div> <div>新增确诊</div> </div>',
    '<div class="tab"><div class="now"> 1585 </div> <div>现有确诊</div> </div>',
  ].join('')
  document.body.append(ovCtrl)
  return ovCtrl
}
