import { Mesh, Points } from 'three';
import material from './material';
import geometry from './geometry';
class mesh {
  constructor() {
    this.vdGeom = new geometry();
    this.vdMaterial = new material();
  }
  createGlobe(size,textrue) {
    let vdGeom = this.vdGeom.createGlobeGeom(size);
    let vdMaterial = this.vdMaterial.createGlobeMat(textrue);
    return new Mesh(vdGeom, vdMaterial);
  }
  createStars() {
    let vdGeom = this.vdGeom.createStarGeom();
    let vdMaterial = this.vdMaterial.createStarMat();
    return new Points(vdGeom, vdMaterial);
  }
}
export default mesh;
