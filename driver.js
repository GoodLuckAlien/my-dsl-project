
/*
 驱动整个小程序应用- 模拟运行整个小程序 JS 引擎
*/

/* 设置不同平台 */
global.platform = {}


/* 模拟启动渲染层—启动调试视图层 */
const { AppInit, autoOpen } = require('./devTool/index')

async function init (){
    await AppInit()
    global.platform.autoOpen = autoOpen
    /* 模拟加载应用文件-启动应用的逻辑层 */
    console.log(1111)
    require('./page-service')
}

init()