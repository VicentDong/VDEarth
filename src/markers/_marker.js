import geometry from '../geometry'
import material from '../material'
import { Mesh } from 'three'
class Marker {
  constructor() {
    this.geom = new geometry()
    this.mat = new material()
  }
  createMesh(geom, mat) {
    return new Mesh(geom, mat)
  }
}
export default Marker
