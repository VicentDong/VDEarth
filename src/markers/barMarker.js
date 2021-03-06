import Marker from './_marker'
import { Mesh, Vector3 } from 'three'
import { getPosition } from '../utils'
class BarMarker extends Marker {
  constructor(opt) {
    super()
    this.opt = opt
  }
  // 创建柱形图标注
  add(group) {
    let barMarker = null
    let data = this.opt.data
    for (let i = 0; i < data.length; i++) {
      barMarker = _.find(group.children, model => {
        return model.userData.type == 'bar' && model.userData.name == data[i].name
      })
      if (!barMarker) {
        let depth = window.Math.log2(data[i].total) * 5
        let barMarkerGeom = this.geom.createBarMarkerGeom(depth, this.opt.width, this.opt.height)
        let barMarkerMat = this.mat.createBarMakerMat()
        barMarker = this.createMesh(barMarkerGeom, barMarkerMat)
        // 定位
        let position = getPosition(
          parseFloat(data[i].lng),
          parseFloat(data[i].lat),
          this.opt.radius
        )
        barMarker.position.set(position.x, position.y, position.z)

        // 标记垂直于圆心
        barMarker.lookAt(new Vector3(0, 0, 0))
        group.add(barMarker)
      }
      // 设置柱形图的自定义数据为遍历的数据项
      barMarker.userData = Object.assign({ type: this.opt.type }, data[i])
      // 缩放0.1倍，为后续柱形图动画预留
      // barMarker.scale.set(1, 1, 0.1)
      // boxMarkAnimate(barMarker)
    }
  }
}
export default BarMarker
