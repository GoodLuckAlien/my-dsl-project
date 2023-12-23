
/* dev_tool 本地调试模块  */
function devtoolClientServer() {
  if(window.wx) return
  window.wx = new WebSocket("ws://127.0.0.1:3000");
  wx.onopen = function () {
    const payload = {
      eventName: "connect",
      data: null,
    };
    window.JSBridge.postMessage(payload)
  };
  wx.onmessage = function (message) {
    window._handleNativeEvent && window._handleNativeEvent(message.data);
  };
}

devtoolClientServer()

function possNativeMessage(params) {
    wx.send(JSON.stringify(params))
}