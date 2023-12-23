
const utils = require('./utils')

class Navigate {
    pageStack = [] //保存页面栈信息
    maxPageLimit = 10
    constructor(appInstance) {
        this.appInstance = appInstance
        this.navigateTo = this.navigateTo.bind(this)
        this.getCurrentPages = this.getCurrentPages.bind(this)
        this.navigateBack = this.navigateBack.bind(this)
        this.redirectTo = this.redirectTo.bind(this)
    }
    navigateTo({ url }){
        if (this.pageStack.length === this.maxPageLimit) {
            // 爆栈了，那么跳转失败
            throw new Error('页面栈已满')
        }
        const [originPath, query] = utils.parseQueryString(url)
        /* 当前最上层的 WebView 页面 */
        const stackTopPage = this.pageStack[this.pageStack.length - 1]

        /* 创建一个新的页面 */
        const page = this.appInstance.createPage(originPath)
        if(!page) return new Error('页面不存在')
        this.appInstance.openPage(page.pageId)
        if (stackTopPage) {
            /* 当前页面需要改变状态，变成未激活状态 */
            stackTopPage.unActive()
        }
        /* 把当前页面放入页面栈 */
        this.pageStack.push(page)
        setTimeout(()=>{
            /* 启动新的 WebView */
            page.launch(query)
        },500)
    }
    redirectTo(){
        /* 清除当前最上面的页面栈 */
        const stackTopPage = this.pageStack.pop()
        /* 销毁页面 */
        stackTopPage.destroy()
        /* 创建一个新的页面 */
        const page = this.appInstance.createPage()
        /* 把当前 WebView 页面放入页面栈 */
        this.pageStack.push(page)
        /* 启动新的 WebView */
        setTimeout(()=>{
            /* 启动新的 WebView */
            page.launch()
        },500)
    }
    navigateBack(){
        if (this.pageStack.length === 0) {
            throw new Error('页面栈为空')
        }
        /* 清除当前最上面的页面栈 */
        const stackLastPage = this.pageStack.pop()
        stackLastPage.destroy()
        /* 获取上一个页面 */
        const stackTopPage = this.pageStack[this.pageStack.length - 1]
        /* 上一个页面激活 */
        stackTopPage && stackTopPage.active()
    }
    /* 获取页面栈 */
    getCurrentPages(){
        return this.pageStack
    }
    /* 获取当前页面 */
    getPageInstanceById(pageId){
        let currentPage = null
        for(let i = 0;i < this.pageStack.length;i++){
            const page = this.pageStack[i]
            if(page.pageId === pageId){
                currentPage = page
                break
            }
        }
        return currentPage
    }
}

module.exports = Navigate