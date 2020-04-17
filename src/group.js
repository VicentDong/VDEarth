import { Group } from 'three';

class group {
  constructor() {
    this._group = new Group();
  }
  add(mesh) {
    this._group.add(mesh);
    return this._group;
  }
}
export default group;
