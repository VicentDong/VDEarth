import _ from 'lodash';
class socket {
  constructor(server, port, account, password) {
    this.account = account;
    this.password = password;
    this.server = server;
    this.port = port;
  }
  static load(callback) {
    if ('WebSocket' in window) {
      // 打开一个 web socket
      var uri = 'ws://' + this.server + ':' + this.port;
      var ws = new WebSocket(uri);
      // 连接建立后的回调函数
      ws.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send(this.account + ':' + this.password);
      };

      // 接收到服务器消息后的回调函数
      ws.onmessage = function (evt) {
        var data = evt.data;
        if (_.isFunction(callback)) {
          console.log(data);
          callback(data);
        }
      };

      // 连接关闭后的回调函数
      ws.onclose = function () {
        // 关闭 websocket
        console.log('连接已关闭...');
      };
    } else {
      // 浏览器不支持 WebSocket
      console.log('您的浏览器不支持 WebSocket!');
    }
  }
}

export default socket;
