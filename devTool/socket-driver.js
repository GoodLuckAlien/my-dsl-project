function sockeChanneltDriver() {
    return new Promise((resolve) => {
        const WebSocket = require('ws')
        const WebSocketServer = WebSocket.Server;

        // 创建 websocket 服务器 监听在 3000 端口
        const wss = new WebSocketServer({ port: 3000 })
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                setImmediate(() => {
                    global.platform.accept && global.platform.accept(message.toString())
                })
            })
            global.platform.send = function (params) {
                ws.send(JSON.stringify(params))
            } 
        })
        resolve()
    })
}

module.exports = sockeChanneltDriver