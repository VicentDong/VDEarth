import _ from 'lodash'

function reconnect() {
  console.log('重新连接')
}
function open() {
  // Web Socket 已连接上，使用 send() 方法发送数据
  this.ws.send(this.account + ':' + this.password)
}

// 接受数据执行回调方法
function receive(evt, callback) {
  var data = evt.data;
  if (_.isFunction(callback)) {
    callback(JSON.parse(data))
  }
}
function close() {
  // 关闭 websocket

  console.log('连接已关闭...')
  reconnect()
}
function reload() {
  this.ws.send('reload')
}
class socket {
  constructor(server, port, account, password) {
    this.account = account
    this.password = password
    this.server = server
    this.port = port
  }

  init(onmessage) {
    if ('WebSocket' in window) {
      try {
        this.uri = 'ws://' + this.server + ':' + this.port
        this.ws = new WebSocket(this.uri)
        this.ws.onopen = () => {
          open.call(this)
        }
        this.ws.onmessage = (evt) => {
          receive.call(this, evt, onmessage)
        }
        this.ws.onclose = () => {
          close.call(this)
        }
        window.onbeforeunload = () => {
          reload()
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      // 浏览器不支持 WebSocket
      console.log('您的浏览器不支持 WebSocket!')
    }
  }
}

export default socket
