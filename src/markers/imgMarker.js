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
    // 加载贴图
    let textureLoader = new TextureLoader()
    textureLoader.load(this.opt.imgUrl, function (texture) {
      let data = self.opt.data
      for (var i = 0; i < data.length; i++) {
        let imgMarker = _.find(group.children, model => {
          return model.userData.type == 'img' && model.userData.name == data[i].name
        })
        if (!imgMarker) {
          let markerGeom = self.geom.createImgMarkerGeom(self.opt.size)
          let markerMat = self.mat.createImgMarkerMat(texture)
          imgMarker = self.createMesh(markerGeom, markerMat)
          // 定位
          let position = getPosition(
            parseFloat(data[i].lng),
            parseFloat(data[i].lat),
            self.opt.radius
          )
          imgMarker.position.set(position.x, position.y, position.z)

          // 标记垂直于圆心
          imgMarker.lookAt(new Vector3(0, 0, 0))
          group.add(imgMarker)
        }
        // 设置柱形图的自定义数据为遍历的数据项
        imgMarker.userData = Object.assign({ type: self.opt }, data[i])
      }
    })
  }
}
export default ImgMarker
