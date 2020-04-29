import Marker from './_marker'
import { Vector3, FontLoader } from 'three'
import { getPosition } from '../utils'
class TextMarker extends Marker {
  constructor(opt) {
    super()
    this.opt = opt
  }
  // 添加多个文字标注
  add(group) {
    let items = this.opt.data
    let self = this
    let fontloader = new FontLoader()
    fontloader.load(this.opt.font, function (font) {
      if (!font) {
        return new Error('no font json found')
      }
      for (let i = 0; i < items.length; i++) {
        let nameMarker = _.find(group.children, model => {
          return model.userData.type == 'name' && model.userData.name == items[i].name
        })

        if (!nameMarker) {
          let geometry = self.geom.createNameMarkerGeom(items[i].name + ':' + items[i].total, font)
          let material = self.mat.createNameMarkerMat()
          nameMarker = self.createMesh(geometry, material)

          // 定位
          let position = getPosition(
            parseFloat(items[i].lng),
            parseFloat(items[i].lat),
            self.opt.radius
          )
          nameMarker.position.set(position.x, position.y - 10, position.z)
          // 标记垂直于圆心
          nameMarker.lookAt(new Vector3(position.x * 1.1, position.y * 1.1, position.z * 1.1))
          group.add(nameMarker)
        }
        // nameMarker.visible = false
        nameMarker.userData = Object.assign({ type: self.opt.type }, items[i])
      }
    })
  }
}
export default TextMarker
