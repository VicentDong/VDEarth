import './font/iconfont.css';
import './style/timeline.less';
import TimeLine from './timeline';

var myTimeLine = new TimeLine();

export function init(opt) {
  myTimeLine.init(opt);
  return myTimeLine;
}

export function toStart() {
  myTimeLine.toStart();
}
