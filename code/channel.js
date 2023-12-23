


class Channel {
    constructor(appInstance){
        this.appInstance = appInstance
        global.platform.accept = this.acceptClientMessage.bind(this)
    }
    /* 向渲染端发送事件 */
    postClientMessage(pageId,eventName,direct){
        const message = {
            pageId,
            eventName,
            data:direct
        }
        global.platform.send  && global.platform.send(message)
    }
    /* 接收渲染端事件 */
    acceptClientMessage(message){
        const { type ,...params } = JSON.parse(message)
        this.appInstance.handleMessage(type,params)
    }
    openPage(pageId){
        global.platform.autoOpen && global.platform.autoOpen(pageId)
    }
}

module.exports = Channel