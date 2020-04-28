import Marker from './_marker'
import { Mesh, Vector3, Shape } from 'three'
import { getPosition } from '../utils'
// 创建飞机形状
function createPlaneShape() {
  // 飞机形状
  let planeShape = new Shape()
  planeShape.moveTo(0, 0)
  planeShape.lineTo(0.2, -0.2)
  planeShape.lineTo(0.2, -1.3)
  planeShape.lineTo(1.6, -2.7)
  planeShape.lineTo(1.6, -3)
  planeShape.lineTo(0.2, -2.1)
  planeShape.lineTo(0.2, -3)
  planeShape.lineTo(0.5, -3.4)
  planeShape.lineTo(0.5, -3.7)
  planeShape.lineTo(0, -3.3)
  planeShape.lineTo(-0.5, -3.7)
  planeShape.lineTo(-0.5, -3.4)
  planeShape.lineTo(-0.2, -3)
  planeShape.lineTo(-0.2, -2.1)
  planeShape.lineTo(-1.6, -3)
  planeShape.lineTo(-1.6, -2.7)
  planeShape.lineTo(-0.2, -1.3)
  planeShape.lineTo(-0.2, -0.2)
  return planeShape
}
class BaseMarker extends Marker {
  constructor() {
    super()
  }
  // 创建飞机标注
  addPlaneMarkers(group, items) {
    let planeShape = createPlaneShape()
    let planeGeom = this.vdGeom.createPlaneMarkerGeom(planeShape)
    let planeMat = this.vdMaterial.createBoxMakerMat()
    for (let i = 0; i < items.length; i++) {
      let plane = new Mesh(planeGeom, planeMat)
      // 定位
      let position = getPosition(items[i].x, items[i].y, items[i].alt)
      plane.position.set(position.x, position.y, position.z)
      // 旋转
      plane.rotation.z = Math.degToRad(items[i].ang)

      // 标记垂直于圆心
      plane.lookAt(new Vector3(0, 0, 0))
      group.add(plane)
    }
  }
}
export default BaseMarker
