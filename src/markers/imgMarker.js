import Marker from './_marker'
import { Mesh, Vector3, TextureLoader } from 'three'
import { getPosition } from '../utils'
class ImgMarker extends Marker {
  constructor(opt) {
    super()
    this.opt = opt
  }
  // 添加图片标注 列表
  add(group) {
    let self = this
    let items = this.opt.data
    let imgMarker = null
    // 加载贴图
    let textureLoader = new TextureLoader()
    textureLoader.load(this.opt.imgUrl, function (texture) {
      for (var i = 0; i < items.length; i++) {
        imgMarker = _.find(group.children, model => {
          return model.userData.type == 'img' && model.userData.name == items[i].name
        })
        if (!imgMarker) {
          let markerGeom = self.geom.createImgMarkerGeom(self.opt.size)
          let markerMat = self.mat.createImgMarkerMat(texture)
          imgMarker = self.createMesh(markerGeom, markerMat)
          // 定位
          // 定位
          let position = getPosition(
            parseFloat(items[i].lng),
            parseFloat(items[i].lat),
            self.opt.radius
          )
          imgMarker.position.set(position.x, position.y, position.z)

          // 设置柱形图的自定义数据为遍历的数据项
          imgMarker.userData = Object.assign({ type: self.opt.type }, items[i])
          // 标记垂直于圆心
          imgMarker.lookAt(new Vector3(0, 0, 0))
          group.add(imgMarker)
        }
      }
    })
  }
}
export default ImgMarker
