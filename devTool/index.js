
function AppInit() {
    return new Promise((reolve) => {
        // 导入express
        const express = require("express");
        // 创建web服务器
        const app = express();
        // 启动服务器

        app.use(express.static(__dirname + '/public'));

        app.listen(80, async () => {
            /* 创建长链接  */
            const sockeChanneltDriver = require('./socket-driver')
            await sockeChanneltDriver()
            reolve()
        });
    })
}



// -自动打开略览器-模拟 Native 打开一个新的页面
function autoOpen(pageid) {
    var childProcess = require("child_process");
    childProcess.exec(`open "http://127.0.0.1/page.html?pageId=${pageid}"`);
}

module.exports = {
    AppInit,
    autoOpen
}