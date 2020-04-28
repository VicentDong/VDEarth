import SvgMarker from './svgMarker'
import ImgMarker from './imgMarker'
import TextMarker from './textMarker'
import BaseMarker from './baseMarker'
import BarMarker from './barMarker'

class MarkerFactory {
  constructor() {}
  static create(opt) {
    let result = null
    switch (opt.type) {
      case 'svg':
        result = new SvgMarker(opt)
        break
      case 'img':
        result = new ImgMarker(opt)
        break
      case 'text':
        result = new TextMarker(opt)
        break
      case 'base':
        result = new BaseMarker(opt)
        break
      case 'bar':
        result = new BarMarker(opt)
        break
      default:
        throw new Error('marker type is error,the type should be svg,img,text,base,bar')
    }
    return result
  }
}
export default MarkerFactory
