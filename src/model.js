import { Mesh, Points } from 'three'
import material from './material'
import geometry from './geometry'
class mesh {
  constructor() {
    this.vdGeom = new geometry()
    this.vdMaterial = new material()
  }
  // 创建地球mesh
  createGlobe(size, textrue) {
    let vdGeom = this.vdGeom.createGlobeGeom(size)
    let vdMaterial = this.vdMaterial.createGlobeMat(textrue)
    return new Mesh(vdGeom, vdMaterial)
  }
  // 创建星星mesh
  createStars() {
    let vdGeom = this.vdGeom.createStarGeom()
    let vdMaterial = this.vdMaterial.createStarMat()
    return new Points(vdGeom, vdMaterial)
  }
  // 创建粒子mesh
  createGlobeParticles(size, step, img, texture) {
    let vdGeom = this.vdGeom.createGlobeParticlesGeom(size, step, img)
    let vdMaterial = this.vdMaterial.createGlobeParticlesMat(texture)
    return new Points(vdGeom, vdMaterial)
  }
  // 创建线框球mesh
  createBallBox(size) {
    let vdGeom = this.vdGeom.createBallBoxGeom(size)
    let vdMaterial = this.vdMaterial.createBallBoxMat()
    return new Mesh(vdGeom, vdMaterial)
  }
  // 创建闪点mesh
  createShinePoints(geom, shineTexture, count) {
    let vdGeom = this.vdGeom.createShinePointsGeom(geom, count)
    let vdMaterial = this.vdMaterial.createShinePointsMat(shineTexture)
    return new Points(vdGeom, vdMaterial)
  }
}
export default mesh
