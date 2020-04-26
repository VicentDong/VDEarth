import { Shape, Mesh, Math, Vector3, CanvasTexture } from 'three'
import geometry from './geometry'
import material from './material'
import { getPosition } from './utils'
import { boxMarkAnimate } from './animation'
import _ from 'lodash'

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
// canvas蒙皮文字
function createNameCanvasTexture(name) {
  let canvas = document.querySelector('#nameMarkerCanvas')
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.id = 'nameMarkerCanvas'
    canvas.width = 150
    canvas.height = 50
    document.body.append(canvas)
  }

  let ctx = canvas.getContext('2d')
  cxt.fillStyle = 'rgba(0,0,0,0)'
  cxt.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fff'
  ctx.font = 'normal 16pt "Microsoft YaHei"'
  ctx.fillText(name, 10, 10)
  let textrue = new CanvasTexture(canvas)
  return textrue
}

class marker {
  constructor() {
    this.vdGeom = new geometry()
    this.vdMaterial = new material()
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
  // 创建柱形图标注
  addBoxMarkers(group, radius, items) {
    for (let i = 0; i < items.length; i++) {
      let boxMarker = _.find(group.children, (model) => {
        return (
          model.userData.type == 'bar' && model.userData.name == items[i].name
        )
      })
      if (!boxMarker) {
        let depth = window.Math.log2(items[i].total) * 5
        let boxMarkerGeom = this.vdGeom.createBoxMarkerGeom(depth)
        let boxMarkerMat = this.vdMaterial.createBoxMakerMat()
        boxMarker = new Mesh(boxMarkerGeom, boxMarkerMat)
        // 定位
        let position = getPosition(
          parseFloat(items[i].lng),
          parseFloat(items[i].lat),
          radius

        );
        boxMarker.position.set(position.x, position.y, position.z);
        // 设置柱形图的自定义数据为遍历的数据项
        boxMarker.userData = Object.assign({ type: 'bar' }, items[i]);

        // 标记垂直于圆心
        boxMarker.lookAt(new Vector3(0, 0, 0))
        group.add(boxMarker)
      }

      // 缩放0.1倍，为后续柱形图动画预留
      boxMarker.scale.set(1, 1, 0.1);
      boxMarkAnimate(boxMarker);
    }
  }

  addNameMarkers(group, radius, items, font) {
    for (let i = 0; i < items.length; i++) {
      let nameMarker = _.find(group.children, (model) => {
        return (
          model.userData.type == 'name' && model.userData.name == items[i].name
        )
      })

      if (!nameMarker) {
        let geometry = this.vdGeom.createNameMarkerGeom(
          items[i].name + ':' + items[i].total,
          font

        );
        let material = this.vdMaterial.createNameMarkerMat();
        nameMarker = new Mesh(geometry, material);

        // 定位
        let position = getPosition(
          parseFloat(items[i].lng),
          parseFloat(items[i].lat),
          radius + window.Math.log2(items[i].total) * 5
        )
        nameMarker.position.set(position.x, position.y, position.z)
        // 标记垂直于圆心
        nameMarker.lookAt(
          new Vector3(position.x * 1.1, position.y * 1.1, position.z * 1.1)

        )
        group.add(nameMarker)
      }
      nameMarker.visible = false
      nameMarker.userData = Object.assign({ type: 'name' }, items[i])
    }
  }
  // 添加图片标注
  addImgMarkers(group, texture, items, size, radius) {
    let markerGeom = this.vdGeom.createImgMarkerGeom(size)
    let markerMat = this.vdMaterial.createImgMarkerMat(texture)

    for (let i = 0; i < items.length; i++) {
      let imgMarker = new Mesh(markerGeom, markerMat)
      // 定位
      let position = getPosition(items[i].lng, items[i].lat, radius)
      imgMarker.position.set(position.x, position.y, position.z)

      // 标记垂直于圆心
      imgMarker.lookAt(new Vector3(0, 0, 0))
      group.add(imgMarker)
    }
  }
}
export default marker
