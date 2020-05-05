import {
  SphereGeometry,
  Geometry,
  Vector3,
  Math,
  ShapeGeometry,
  BoxGeometry,
  PlaneGeometry,
  TextGeometry,
  BufferGeometry,
  Spherical,
  BufferAttribute,
} from 'three'

function isLandByUV(c, f, img) {
  if (!img) {
    // 底图数据
    console.error('data error!')
  }
  let n = parseInt(img.width * c), // 根据横纵百分比计算图象坐标系中的坐标
    o = parseInt(img.height * f) // 根据横纵百分比计算图象坐标系中的坐标
  return 0 === img.data[4 * (o * img.width + n)] // 查找底图中对应像素点的rgba值并判断
}

class vdGeom {
  constructor() {}

  // 创建地球geom
  createGlobeGeom(size) {
    let geom = new SphereGeometry(size, 200, 200)
    return geom
  }
  // 创建星星geom
  createStarGeom() {
    let starsGeometry = new Geometry()
    for (let i = 0; i < 2000; i++) {
      let starVector = new Vector3(
        Math.randFloatSpread(2000),
        Math.randFloatSpread(2000),
        Math.randFloatSpread(2000)
      )
      starsGeometry.vertices.push(starVector)
    }
    return starsGeometry
  }
  // 创建飞机标注geom
  createPlaneMarkerGeom(shape) {
    let planeGeometry = new ShapeGeometry(shape)
    return planeGeometry
  }
  // 创建柱形图geom
  createBarMarkerGeom(depth, width, height) {
    let boxGeometry = new BoxGeometry(width, height, depth)
    boxGeometry.translate(0, 0, -depth / 2)
    return boxGeometry
  }

  // 创建粒子 geom
  createGlobeParticlesGeom(size, step, img) {
    let bufferGeom = new BufferGeometry()
    let positions = []
    let sizes = []
    let spherical = new Spherical()
    spherical.radius = size
    for (let i = 0; i < step; i++) {
      let vec = new Vector3()
      // 每个纬线圈内的角度均分
      let radians = (step * (1 - window.Math.sin((i / step) * window.Math.PI))) / step + 0.5

      for (let j = 0; j < step; j += radians) {
        let c = j / step, // 底图上的横向百分比
          f = i / step // 底图上的纵向百分比

        if (isLandByUV(c, f, img)) {
          // 根据横纵百分比判断在底图中的像素值
          // 横纵百分比转换为theta和phi夹角
          spherical.theta = c * window.Math.PI * 2 - window.Math.PI / 2
          spherical.phi = f * window.Math.PI
          // 夹角转换为世界坐标
          vec.setFromSpherical(spherical)
          positions.push(vec.x)
          positions.push(vec.y)
          positions.push(vec.z)
          if (j % 3 === 0) {
            sizes.push(6.0)
          }
        }
      }
    }

    let typedArr1 = new Float32Array(positions.length),
      typedArr2 = new Float32Array(sizes.length)
    for (let j = 0; j < positions.length; j++) {
      typedArr1[j] = positions[j]
    }
    for (let j = 0; j < sizes.length; j++) {
      typedArr2[j] = sizes[j]
    }
    bufferGeom.addAttribute('position', new BufferAttribute(typedArr1, 3))
    bufferGeom.addAttribute('size', new BufferAttribute(typedArr2, 1))
    bufferGeom.computeBoundingSphere()

    return bufferGeom
  }
  // 创建外层球体 geom
  createBallBoxGeom(size) {
    let geom = new SphereGeometry(size, 8, 8)
    return geom
  }
  // 创建外层上的亮点 geom
  createShinePointsGeom(geom, count) {
    let bufferGeom = new BufferGeometry()
    let vertices = geom.vertices
    let vects = []

    for (let i = 0; i < count; i++) {
      var randVect = vertices[parseInt(vertices.length * window.Math.random())]
      vects.push(randVect.x)
      vects.push(randVect.y)
      vects.push(randVect.z)
    }
    let vectors = new Float32Array(vects.length)
    for (var j = 0; j < vects.length; j++) {
      vectors[j] = vects[j]
    }

    bufferGeom.setAttribute('position', new BufferAttribute(vectors, 3))
    return bufferGeom
  }
  // 创建贴图标注
  createImgMarkerGeom(size) {
    let geom = new PlaneGeometry(size, size)
    return geom
  }
  // 名称标注geom
  createNameMarkerGeom(name, font) {
    let textGeo = new TextGeometry(name, {
      font: font,
      size: 4,
      height: 0.5,
      curveSegments: 0.1,
      bevelEnabled: false,
    })
    // 文字居中
    textGeo.center()
    return textGeo
  }
}
export default vdGeom
