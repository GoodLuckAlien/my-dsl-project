/* 向 Native 发布事件 */
function publishNativeMessage(params) {
    possNativeMessage(params);
  }
  
  /* 触发 Native 方法, 触发回调函数 */
  function invokeNativeEvent(name, params, callbackId) {
    const message = {
      eventType: "invoke",
      type: name,
      data: params,
      callbackId,
    };
    possNativeMessage(message);
  }
  
  class JSBridge {
    /* 保存 */
    eventHandlers = new Map();
    responseCallbacks = new Map();
    callbackID = 0;
    constructor() {
      window._handleNativeCallback = this.handleNativeCallback.bind(this);
      window._handleNativeEvent = this.handleNativeEvent.bind(this);
    }
    /* 向逻辑层发送消息 */
    postMessage(params) {
      publishNativeMessage(params);
    }
    /* 向逻辑层发送消息,等待回调函数 */
    invoke(name, payload, callback) {
      this.callbackID++; 
      /* 将回调函数保存起来 */
      this.responseCallbacks.set(this.callbackID, callback);
      invokeNativeEvent(name, payload, this.callbackID);
    }
    /* 处理逻辑层返回的事件回调 */
    handleNativeCallback(jsonResponse) {
      const res = JSON.parse(jsonResponse);
      const { callbackID, ...params } = res;
      const callback = this.responseCallbacks.get(callbackID); 
      /* 取出回调函数并且执行 */
      callback && callback(params); 
      /* 删除对应的回调函数 */
      this.responseCallbacks.delete(callbackID);
    }
    /* 处理逻辑层返回事件 */
    handleNativeEvent(jsonResponse) {
      const res = JSON.parse(jsonResponse);
      console.log(res)
      const { eventName, ...params } = res;
      const callback = this.eventHandlers.get(eventName);
      callback && callback(params);
    }
    /* 绑定注册事件 */
    registerEvent(name, callback) {
      this.eventHandlers.set(name, callback);
    }
    /* 解绑事件 */
    unRegisterEvent(name) {
      this.eventHandlers.delete(name);
    }
  }
  
  if(!window.JSBridge) window.JSBridge = new JSBridge()