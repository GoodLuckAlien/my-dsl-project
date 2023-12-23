/* 读取整个小程序应用信息 */
const fs = require('fs')
const CodeContext = require('./context')

/* 解析 myxml  */
const myxmlTransfrom = require('./myxml/transfrom')
const myxmlParse = require('./myxml/parse')
const jsTransfrom = require('./js/transfrom')

/* 读取小程序应用的 app.json 文件，分析页面 */
function analyticProject(path){
   return new Promise((resolve)=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            const projectConfig = JSON.parse(data)
            /* 获取整个应用的 page 页面 */
            const { pages } = projectConfig
            resolve(pages)
        })
   })
}

const readPath = '../project/'
const writePath = '../page-service.js'
const jsNotion = '.js'
const myxmlNotion = '.myxml'
const mycssNotion = '.mycss'
const pageCodes = []

/* 解析 myxml */
function walkMyxml(pagePath){
    const path = readPath + pagePath + myxmlNotion
    const isExists = fs.existsSync(path)
    if(!isExists) return ''
    const code = fs.readFileSync(path,'utf-8')
    const ast = myxmlParse(code)
    return myxmlTransfrom(ast)
}
/* 解析 mycss */
function walkMycss(pagePath){
    const path = readPath + pagePath + mycssNotion
    const isExists = fs.existsSync(path)
    if(!isExists) return ''
    const code = fs.readFileSync(path,'utf-8')
    return  `${JSON.stringify(code)}` 
}
/* 解析 JS */
function walkJS(pagePath){
    const path = readPath + pagePath + jsNotion
    const isExists = fs.existsSync(path)
    if(!isExists) return ''
    const code = fs.readFileSync(path,'utf-8')
    return jsTransfrom(code)
}
/* 解析页面配置信息 */
function analyticPage(pagePath){
    const isExists = fs.existsSync(readPath + pagePath + jsNotion)
    if(!isExists) return
    const code =`{
        path:'${pagePath}',
        js:${walkJS(pagePath)},
        render:${walkMyxml(pagePath)},
        css:${walkMycss(pagePath)}
    }`
    pageCodes.push(code)
}
/* 读取 app.js 内容 */
function walkAppJs(){
    const code = fs.readFileSync(readPath + 'app.js','utf-8')
    return jsTransfrom(code)
}

analyticProject(readPath + 'app.json').then(pages=>{
    pages.forEach(analyticPage)
    /* 生成目标代码 */
    const codeContext = new CodeContext()
    codeContext.pushCode('const pages = [')
    codeContext.indent()
    pageCodes.forEach((pageCode,index)=>{
         if(index === pageCodes.length - 1) codeContext.pushCode(pageCode)
         else codeContext.pushCode(pageCode + ',')
         codeContext.indent()
    })
    codeContext.indent()
    codeContext.pushCode(']')
    codeContext.indent()
    /* 装载 app */
    const appCode = walkAppJs()
    codeContext.pushCode(appCode)
    codeContext.indent()
    /* 运行 app */
    codeContext.pushCode(`const app = require('./code/index')`)
    codeContext.indent()
    codeContext.pushCode(`handleJS(null,app.bind(null,pages))`)
    /* 写入 code */
    fs.writeFileSync(writePath,codeContext.code)    
})