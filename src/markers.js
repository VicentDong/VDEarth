import { Shape, Mesh, Math, Vector3, CanvasTexture } from 'three';
import geometry from './geometry';
import material from './material';

// 创建飞机形状
function createPlaneShape() {
  // 飞机形状
  let planeShape = new Shape();
  planeShape.moveTo(0, 0);
  planeShape.lineTo(0.2, -0.2);
  planeShape.lineTo(0.2, -1.3);
  planeShape.lineTo(1.6, -2.7);
  planeShape.lineTo(1.6, -3);
  planeShape.lineTo(0.2, -2.1);
  planeShape.lineTo(0.2, -3);
  planeShape.lineTo(0.5, -3.4);
  planeShape.lineTo(0.5, -3.7);
  planeShape.lineTo(0, -3.3);
  planeShape.lineTo(-0.5, -3.7);
  planeShape.lineTo(-0.5, -3.4);
  planeShape.lineTo(-0.2, -3);
  planeShape.lineTo(-0.2, -2.1);
  planeShape.lineTo(-1.6, -3);
  planeShape.lineTo(-1.6, -2.7);
  planeShape.lineTo(-0.2, -1.3);
  planeShape.lineTo(-0.2, -0.2);
  return planeShape;
}

// 经纬度转图形position
function getPosition(lng, lat, radius) {
  let phi = (90 - lat) * (window.Math.PI / 180),
    theta = (lng + 180) * (window.Math.PI / 180),
    x = -(radius * window.Math.sin(phi) * window.Math.cos(theta)),
    z = radius * window.Math.sin(phi) * window.Math.sin(theta),
    y = radius * window.Math.cos(phi);
  return { x: x, y: y, z: z };
}

function createNameCanvasTexture(name) {
  let canvas = document.querySelector('#nameMarkerCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'nameMarkerCanvas';
    canvas.width = 150;
    canvas.height = 50;
    document.body.append(canvas);
  }

  let ctx = canvas.getContext('2d');
  cxt.fillStyle = 'rgba(0,0,0,0)';
  cxt.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = 'normal 16pt "Microsoft YaHei"';
  ctx.fillText(name, 10, 10);
  let textrue = new CanvasTexture(canvas);
  return textrue;
}

class marker {
  constructor() {
    this.vdGeom = new geometry();
    this.vdMaterial = new material();
  }
  addPlaneMarkers(group, items) {
    let planeShape = createPlaneShape();
    let planeGeom = this.vdGeom.createPlaneMarkerGeom(planeShape);
    let planeMat = this.vdMaterial.createBoxMakerMat();
    for (let i = 0; i < items.length; i++) {
      let plane = new Mesh(planeGeom, planeMat);
      // 定位
      let position = getPosition(items[i].x, items[i].y, items[i].alt);
      plane.position.set(position.x, position.y, position.z);
      // 旋转
      plane.rotation.z = Math.degToRad(items[i].ang);

      // 标记垂直于圆心
      plane.lookAt(new Vector3(0, 0, 0));
      group.add(plane);
    }
  }
  addBoxMarkers(group, items) {
    for (let i = 0; i < items.length; i++) {
      let boxMarkerGeom = this.vdGeom.createBoxMarkerGeom(
        items[i].value / 10000
      );
      let boxMarkerMat = this.vdMaterial.createBoxMakerMat();
      let boxMarker = new Mesh(boxMarkerGeom, boxMarkerMat);
      // 定位
      let position = getPosition(
        items[i].position[0],
        items[i].position[1],
        200
      );
      boxMarker.position.set(position.x, position.y, position.z);

      // 标记垂直于圆心
      boxMarker.lookAt(new Vector3(0, 0, 0));
      group.add(boxMarker);
    }
  }
  addNameMarkers(group, items, font) {
    for (let i = 0; i < items.length; i++) {
      // let textrue = createNameCanvasTexture(items[i].name);
      let geometry = this.vdGeom.createNameMarkerGeom(items[i].name, font);
      let material = this.vdMaterial.createNameMarkerMat();
      var nameMarker = new Mesh(geometry, material);
      // 定位
      let position = getPosition(
        items[i].position[0],
        items[i].position[1],
        200
      );
      nameMarker.position.set(position.x, position.y, position.z);
      // 标记垂直于圆心
      nameMarker.lookAt(new Vector3(0, 0, 0));

      group.add(nameMarker);
    }
  }
}
export default marker;
