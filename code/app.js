
const Navigate = require('./navigate')
const Page = require('./page')
const Channel = require('./channel')


class AppIntance {
    /**
     * 
     * @param {*} query  应用初始化
     * @param {*} appConfig 
     * @param {*} pageServices 
     */
    constructor(appConfig, pageServices) {
        /* 初始化参数 */
        this.appConfig = appConfig
        this.pageServices = pageServices
        this.initApp()
    }
    initApp() {
        /* 建立通信 */
        this.channel = new Channel(this)
        this.navigate = new Navigate(this)
        process.nextTick(()=>{
            this.launch()
        })
    }
    /* 初始化小程序应用 */
    launch(){
        this.appConfig.onLaunch()
         /* 初始化第一个页面 */
        const fristPage = this.pageServices[0]
        this.navigate.navigateTo({ url:fristPage.path + '?init=true' })
    }
    /* 创建一个新页面 */
    createPage(path) {
        /* 获取路由 */
        let pageConfig = null
        for(let i=0;i< this.pageServices.length;i++){
            const currentPageConfig = this.pageServices[i]
            if(currentPageConfig.path === path){
                pageConfig = currentPageConfig
                break
            }
        }
        return new Page(this,pageConfig)
    }
    render(pageId,directList){
        this.channel.postClientMessage(pageId,'render',directList)
    }
    styleSheet(pageId,styleString){
        this.channel.postClientMessage(pageId,'style',styleString)
    }
    pageReady(pageId){
        this.channel.postClientMessage(pageId,'ready',{})
    }
    openPage(pageId){
        this.channel.openPage(pageId)
    }
    /* 通过页面 id 获取页面 */
    getPageInstanceById(pageId){
        return this.navigate.getPageInstanceById(pageId)
    }
    /* 处理渲染层事件 */
    handleMessage(type, params){
        if(type === 'event'){
            this.handleEvent(params)
        }else if(type === 'ready'){
            const pageControllerInstance = this.getPageInstanceById(params.pageId)
            const pageRefIntance = pageControllerInstance.pageRef
            pageRefIntance.onReady && pageRefIntance.onReady.call(pageRefIntance)
        }
    } 
    /* 处理事件 */
    handleEvent(params){
        const { pageId, eventName, ...otherParams } = params
        const pageControllerInstance = this.getPageInstanceById(pageId)
        const pageRefIntance = pageControllerInstance.pageRef
        const funEvent = pageRefIntance[eventName] || pageRefIntance['methods']?.[eventName]
        funEvent.call(pageRefIntance,otherParams)
    }
}

module.exports = AppIntance
