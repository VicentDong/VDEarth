export function minSize(width,height){
    let size = width > height ? height:width;
    return size
}

// 经纬度转图形position
export function getPosition(lng, lat, radius) {
    let phi = (90 - lat) * (window.Math.PI / 180),
      theta = (lng + 180) * (window.Math.PI / 180),
      x = -(radius * window.Math.sin(phi) * window.Math.cos(theta)),
      z = radius * window.Math.sin(phi) * window.Math.sin(theta),
      y = radius * window.Math.cos(phi);
    return { x: x, y: y, z: z };
  }