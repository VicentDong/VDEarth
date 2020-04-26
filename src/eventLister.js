import { Vector2, Raycaster } from 'three'
import _ from 'lodash'
// 获取mesh
function getAllMeshes(obj, meshArr) {
  obj.children.forEach((element) => {
    if (element.type == 'Mesh') {
      meshArr.push(element)
    } else if (element.children.length > 0) {
      getAllMeshes(element, meshArr)
    }
  })
}
// 柱状标记点击事件
export function createModelClick() {
  var self = this
  //点击事件
  window.addEventListener(
    'click',
    function (e) {
      if (self.seledModel) {
        self.seledModel.object.material.color.set('#6dc3ec')
      }
      if (self.nameModel) {
        self.nameModel.visible = false
      }
      var mouse = new Vector2()
      mouse.x =
        ((e.clientX - window.innerWidth + self.contentWidth) /
          self.contentWidth) *
          2 -
        1
      mouse.y =
        -(
          (e.clientY - window.innerHeight + self.contentHeight) /
          self.contentHeight
        ) *
          2 +
        1

      var raycaster = new Raycaster()
      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, self.camera)

      var objects = []
      getAllMeshes(self.markerGroup, objects)

      //射线和模型求交，选中一系列直线
      var intersects = raycaster.intersectObjects(objects)
      if (intersects.length > 0) {
        for (var i = 0; i < intersects.length; i++) {
          var ele = intersects[i]
          if (ele.object.userData && ele.object.userData.type === 'bar') {
            self.seledModel = ele
            ele.object.material.color.set('#e0ef08')

            self.nameModel = _.find(self.markerGroup.children, (model) => {
              return (
                model.userData.type == 'name' &&
                model.userData.name == ele.object.userData.name
              )
            })
            if (self.nameModel) {
              self.nameModel.visible = true
            }

            return
          }
          self.seledModel = null
          self.nameModel = null
        }
      } else {
        self.seledModel = null
        self.nameModel = null
      }
    },
    false
  )
}
