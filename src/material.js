import {
  MeshStandardMaterial,
  PointsMaterial,
  MeshPhongMaterial,
  DoubleSide,
  MeshBasicMaterial,
} from 'three';
class material {
  constructor() {}
  createGlobeMat(texture) {
    let mat = new MeshStandardMaterial({
      map: texture,
    });
    return mat;
  }
  createStarMat() {
    var starsMaterial = new PointsMaterial({ color: 0x8e8e8e });
    return starsMaterial;
  }
  createPlaneMarkerMat() {
    // 飞机材质
    var planeMaterial = new MeshPhongMaterial({
      color: 0x0fb4dd,
      side: DoubleSide,
      depthTest: true,
    });
    return planeMaterial;
  }
  createBoxMakerMat() {
    var boxMarkerMaterial = new MeshPhongMaterial({
      color: '#6dc3ec',
      side: DoubleSide,
      depthTest: true,
    });
    return boxMarkerMaterial;
  }
  createNameMarkerMat() {
    var nameMarkerMaterial = new MeshBasicMaterial({
      color: '#fff',
      transparent: true,
    });
    return nameMarkerMaterial;
  }
}

export default material;
