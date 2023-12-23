 /* 指令解析器 */
 function handleDirect(directList){
    directList.sort((a,b)=> a.nodeId - b.nodeId ).forEach(item=>{
        const { content , nodeId, parentId, props, type, tag } = item
        /* 插入节点  */
        if(type ==='CREATE'){
           let curtag = 'div'
           switch(tag){
               case 'view':
               curtag = 'div'
                break
               default:
               curtag = tag
                break  
           }
           const node = document.createElement(curtag)
           node.id = 'node' + nodeId
           if(content) node.innerText = content
           /* 处理点击事件 */
           if(props.style) node.style = props.style
           if(props.onClick) {
            node.onclick = function(){
                /* 向 js 层发送事件 */
                NativeToJs({ type:'click', nodeId })
            }
           }
           if(parentId === 'root'){
               const root = document.getElementById('root')
               root.appendChild(node)
           }else{
               const parentNode = document.getElementById('node'+ parentId)
               parentNode && parentNode.appendChild(node)
           }
        }else if(type === 'DELETE'){
            const parentNode = document.getElementById('node'+ parentId)
            const node = document.getElementById('node'+ nodeId)
            parentNode.removeChild(node)
        }
    })
}