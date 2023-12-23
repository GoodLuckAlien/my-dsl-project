

/* 解析 props */
function diffProperty(node, props) {
     /* 动态添加 style */
    if (props?.props?.style) node.style = props.props.style
    /* 动态添加 class */
    if (props?.props?.class) {
        const arr = props.props.class.split(' ')
        arr.forEach(item=>{
            node.classList.add(item)
        })
    }
    /* 动态添加 src */
    if(props?.props?.src) node.src = props.props.src
    /* 处理点击事件 */
    if (props?.props?.eventtap) {
        node.onclick = function () {
            const eventName = props?.props?.eventtap
            /* 处理事件 */
            window.JSBridge.postMessage({
                type: 'event',
                eventName,
                pageId: window.pageId
            })
        }
    }
}

/* 解析指令 */
function handleDirect(directList) {
    directList.sort((a, b) => a.nodeId - b.nodeId).forEach(item => {
        const { content, nodeId, parentId, props, type, tag } = item
        /* 插入节点  */
        if (type === 'CREATE') {
            let curtag = 'div'
            switch (tag) {
                case 'view':
                    curtag = 'div'
                    break
                case 'text':
                    curtag = 'span'
                    break 
                case 'image':
                    curtag = 'img'
                    break     
                default:
                    curtag = tag
                    break
            }
            const node = document.createElement(curtag)
            node.id = 'node' + nodeId
            if (content) node.innerText = content
            diffProperty(node,props)
            if (parentId === 'root') {
                const root = document.getElementById('root')
                root.appendChild(node)
            } else {
                const parentNode = document.getElementById('node' + parentId)
                parentNode && parentNode.appendChild(node)
            }
        } else if (type === 'DELETE') {
            const parentNode = document.getElementById('node' + parentId)
            const node = document.getElementById('node' + nodeId)
            parentNode.removeChild(node)
        } else if (type === 'UPDATE') {
            const node = document.getElementById('node' + nodeId)
            if (content) {
                node.innerText = content
            }
            diffProperty(node,props)
        }
    })
    /* 初始化渲染完成，通知逻辑层执行 onReady 事件 */
    if (!window.isInit) {
        setTimeout(() => {
            window.JSBridge.postMessage({
                type: 'ready',
                pageId: window.pageId
            })
        })
    }
}

function setCssToStyleHead(styleString) {
    let styleText = ''
    styleText = styleString.replace('page', 'body')
    styleText = styleText.replace(/rpx/g, 'px')
    var headElement = document.head
    const style = document.createElement('style')
    style.innerHTML = styleText
    headElement.appendChild(style)
}

