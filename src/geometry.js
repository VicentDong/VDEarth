import {
  SphereGeometry,
  Geometry,
  Vector3,
  Math,
  ShapeGeometry,
  BoxGeometry,
  PlaneGeometry,
  TextGeometry,
  Matrix4,
  ImageBitmapLoader,
} from 'three';

class vdGeom {
  constructor() {}
  createGlobeGeom(size) {
    let geom = new SphereGeometry(size, 200, 200);
    return geom;
  }
  createStarGeom() {
    let starsGeometry = new Geometry();
    for (let i = 0; i < 2000; i++) {
      let starVector = new Vector3(
        Math.randFloatSpread(2000),
        Math.randFloatSpread(2000),
        Math.randFloatSpread(2000)
      );
      starsGeometry.vertices.push(starVector);
    }
    return starsGeometry;
  }
  createPlaneMarkerGeom(shape) {
    let planeGeometry = new ShapeGeometry(shape);
    return planeGeometry;
  }
  createBoxMarkerGeom(depth) {
    let boxGeometry = new BoxGeometry(2, 2, depth);
    return boxGeometry;
  }
  createNameMarkerGeom(name, font) {
    // let nameGeometry = new PlaneGeometry(100, 150, 50);
    let textGeo = new TextGeometry(name, {
      font: font,
      size: 4,
      height: 0.5,
      curveSegments: 0.1,
      bevelEnabled: false,
    });
    // 文字居中
    textGeo.center();

    // textGeo.applyMatrix4(new Matrix4().makeRotationY(Math.PI));
    return textGeo;
  }
}
export default vdGeom;
