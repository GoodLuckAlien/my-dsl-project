
const Render = require('./render')

let notion = 'my_dsl_'
let id = 0

/* 这个实例用于业务使用 */
function PageRefInstance(config){
    const pageController = this
    class PageElement {
       constructor(){
          for(let key in config){
            if(config.hasOwnProperty(key)) this[key] = config[key]
          }
       }
       getPageId(){
         return pageController.pageId
       }
       setData(mergeData){
          /* 合并 */
         Object.assign(this.data,mergeData)
         /* 更新数据 */
         pageController.renderer.render()
       }
    }
    pageController.pageRef = new PageElement()
}

/* 这个实例 */
class Page {
   constructor(appInstance,pageConfig){
      this.pageId = notion + (++id)
      this.appInstance = appInstance
      const { path, js, render,css} = pageConfig
      this.css = css
      this.page = path
      /* 页面对应的 render 函数 */
      this.renderer = new Render(render,this)
      /* 页面对应的实例,这里执行业务的页面文件 index.js */
      js(PageRefInstance.bind(this), null, null, null, global.mydsl)
      
   }
   launch(query={}){
      /* 执行页面的 onload 方法 */
      this.appInstance.pageReady(this.pageId) 
      this.appInstance.styleSheet(this.pageId,this.css) 
      this.pageRef.onLoad && this.pageRef.onLoad(query)
      this.renderer.render()
   }
   /* 获取页面 id */
   getPageId(){
       return this.pageId
   }
   /* 页面隐藏时候触发 */
   unActive(){
      this.pageRef.onHide && this.pageRef.onHide()
   }
   /* 页面显示时候触发 */
   active(){
      this.pageRef.onShow && this.pageRef.onShow()
   }
   /* 触发更新 */
   render(directList){
      this.appInstance.render(this.pageId,directList)
   }
}

module.exports = Page