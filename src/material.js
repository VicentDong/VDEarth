import {
  MeshStandardMaterial,
  PointsMaterial,
  MeshPhongMaterial,
  DoubleSide,
  MeshBasicMaterial,
  FrontSide,
  AdditiveBlending,
} from 'three'
class material {
  constructor() {}
  // 创建贴图纹理材质
  createGlobeMat(texture) {
    let mat = new MeshStandardMaterial({
      map: texture,
    })
    return mat
  }
  // 创建星星材质
  createStarMat() {
    var starsMaterial = new PointsMaterial({ color: 0x888888 })
    return starsMaterial
  }
  // 创建飞机标注材质
  createPlaneMarkerMat() {
    // 飞机材质
    var planeMaterial = new MeshPhongMaterial({
      color: 0x0fb4dd,
      side: DoubleSide,
      depthTest: true,
    })
    return planeMaterial
  }
  // 创建柱形图材质
  createBoxMakerMat() {
    var boxMarkerMaterial = new MeshPhongMaterial({
      color: '#6dc3ec',
      side: DoubleSide,
      depthTest: true,
    })
    return boxMarkerMaterial
  }
  // 创建名字的材质
  createNameMarkerMat() {
    var nameMarkerMaterial = new MeshBasicMaterial({
      color: '#fff',
      transparent: true,
    })
    return nameMarkerMaterial
  }
  // 创建粒子地球
  createGlobeParticlesMat(texture) {
    let mat = new PointsMaterial({
      size: 5,
      color: 0x208be6,
      map: texture,
      depthWrite: false,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      blending: AdditiveBlending,
    })
    return mat
  }
  // 创建框线地球
  createBallBoxMat() {
    let mat = new MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      depthTest: false,
      color: 0x268de4,
      opacity: 0.3,
    })
    return mat
  }
  // 创建闪亮点 材质
  createShinePointsMat(texture) {
    var material = new PointsMaterial({
      color: 0x268de4,
      size: 40,
      map: texture,
      depthWrite: false,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      blending: AdditiveBlending,
    })
    return material
  }
  // 创建图片标注材质
  createImgMarkerMat(texture) {
    var material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    })
    return material
  }
}

export default material
