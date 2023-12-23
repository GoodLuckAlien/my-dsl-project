
const CodeContext = require('../context')

function transfrom(code){
    const context = new CodeContext()
    context.pushCode('function handleJS(Page,App,Component,getCurrentPages,mydsl){')
    context.indent()
    context.pushCode(code)
    context.indent()
    context.pushCode('}')
    return context.code
}
module.exports = transfrom 