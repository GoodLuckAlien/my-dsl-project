const CodeContext = require('../context')

function generateAttrNode(node,context){
    if(!node.attr) return 
    const attr = node.attr
    Object.keys(attr).forEach((key,index)=>{
        /* 处理事件 */
        if(key.indexOf('bind:')===0){
            const newkey = key.replace('bind:','event')
            context.pushCode(`"${newkey}": "${attr[key]}"`);
        }
        else if(/\{\{.*?\}\}/.test(attr[key])){
            /*
           如果  attr[key] 为 text {{ customClass }}
           result = [
                '{{ customClass }}',
                index: 5,
                input: 'text {{ customClass }}',
                groups: undefined
            ]
            */
           const result = attr[key].match(/\{\{.*?\}\}/)  
           const value = result[0].slice(2,-2).trim()
           const code1 = `context.getValue('${value}')`
           const code2 = attr[key].replace(result[0],"${" + code1 + "}" )
           context.pushCode(`"${key}"`)
           context.pushCode(":")
           context.pushCode("`" + code2 + "`")
        }else{
            context.pushCode(`"${key}": "${attr[key]}"`);
        }
        if(index < Object.keys(attr).length -1 ){
            context.pushCode(`,`)
        }
    })
}

function generateChildrenNode(node,context){
    if(typeof node === 'string'){
        if(/\{\{.*?\}\}/.test(node)){
            const result = node.match(/\{\{.*?\}\}/)  
            const value = result[0].slice(2,-2).trim()
            const code1 = `context.getValue('${value}')`
            context.pushCode(code1) 
        }else{
            context.pushCode(`"${node}"`)
        }
        return
    }
    context.pushCode(`context.createNode(`);
    context.pushCode(`"${node.tag}", `);
    context.pushCode("{");
    context.indent();
    context.pushCode(`"props":{ `);
    // 标签属性
    generateAttrNode(node, context);
    context.pushCode("}");
    context.pushCode("}");
    if (node.children && node.children.length > 0) {
        context.pushCode(`, `);
        generateChildrenFunction(node.children, context);
    }
    context.pushCode(")")
}

function generateChildrenFunction(nodes, context) {
    context.pushCode(`function (context) {`);
    context.indent();
    context.pushCode("return [");
    for (let i = 0; i < nodes.length; i++) {
      const currentNode = nodes[i];
      const nextNode = nodes[i + 1];
      generateChildrenNode(currentNode, context);
      if (nextNode) {
        context.pushCode(", ");
      }
    }
    context.deindent();
    context.pushCode("]");
    context.deindent();
    context.pushCode("}");
  }

function transfrom(root){
    const context = new CodeContext()
    /* root 为空指针，root 的 children 为 myxml 中真正的内容 */
    const children = root.children
    generateChildrenFunction(children, context)
    return context.code
}

module.exports = transfrom