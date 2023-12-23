/* 深比较 */
function deepEqual(x, y) {
    if (x === y) {
        return true;
    } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;

        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
}

const CREATE = 'CREATE'  /* 创建 */
const UPDATE = 'UPDATE'  /* 更新 */
const DELETE = 'DELETE'  /* 删除 */


class Render {
    constructor(render, pageInstance) {
        this.renderRuntime = render
        this.pageInstance = pageInstance
        this.vnode = null
        this.nodeId = -1
        this.directList = []
    }
    render() {
        const context = this.createRenderContext()
        const childrenArr = this.renderRuntime(context)
        const newVnode = {
            type: 'page',
            children: childrenArr
        }
        this.vnode = this.diff(newVnode, this.vnode, 'root')
        /* 发送消息绘制视图 */
        this.commit()
        
    }
    createRenderContext() {
        return {
            createNode: this.createNode.bind(this),
            getValue: this.getValue.bind(this)
        }
    }
    createNode(type, props, children) {

        return {
            type,
            props,
            children: typeof children === 'function' ? children(this.createRenderContext())  : []
        }
    }
    getValue(name) {
        /* 获取页面的 data */
        const data = this.pageInstance.pageRef.data || {}
        return data[name]
    }
    diff(newVNode, oldVNode, parentId) {
        if (newVNode && !oldVNode) {
            newVNode.parentId = parentId
            newVNode.nodeId = ++this.nodeId
            let content = null
            /* 只有一个 children 并且为 string 字符串的情况 */
            if (newVNode.children.length === 1 && typeof newVNode.children[0] === 'string') {
                content = newVNode.children[0]
            } else {
                this.diffChildren(newVNode, oldVNode, newVNode.nodeId)
            }
            /* 创建绘制指令 */
            const direct = {
                type: CREATE,
                tag: newVNode.type,
                parentId,
                nodeId: newVNode.nodeId,
                content,
                props: newVNode.props
            }
            this.directList.push(direct)
        } else if (!newVNode && oldVNode) { /* 删除元素 */
            /* 创建删除指令 */
            const direct = {
                type: DELETE,
                tag: oldVNode.tag,
                parentId,
                nodeId: oldVNode.nodeId,
            }
            this.directList.push(direct)
        } else { /* 更新元素 */
            newVNode.nodeId = oldVNode.nodeId
            newVNode.parentId = oldVNode.parentId
            const newChildren = newVNode.children
            const oldChildren = oldVNode.children
            /* 满足只有一个文本元素且相等情况 */
            const case3 = newChildren.length === 1 && oldChildren.length === 1 && typeof newChildren[0] == 'string' && typeof oldChildren[0] == 'string'
            const case1 = case3 && newChildren[0] !== oldChildren[0]
            /* 满足新老元素属性都相等的情况 */
            const case2 = deepEqual(newVNode.props, oldVNode.props)
            if (case1 || !case2) {
                const direct = {
                    type: UPDATE,
                    parentId,
                    nodeId: oldVNode.nodeId,
                    content: case1 ? newVNode.children[0] : '',
                    props: newVNode.props
                }
                this.directList.push(direct)
            }
            
            if(!case3){
                this.diffChildren(newVNode, oldVNode, newVNode.nodeId)
            }
        }
        return newVNode
    }
    diffChildren(newVNode, oldVNode, parentId) {
        const newChildren = newVNode?.children
        const oldChildren = oldVNode?.children
        if (Array.isArray(newChildren)) {
            newChildren.forEach((newChildrenNode, index) => {
                let oldChildrenNode = oldChildren ? oldChildren[index] : null
                this.diff(newChildrenNode, oldChildrenNode, parentId)
            })
        }
    }
    /* 绘制视图 */
    commit(){
        this.pageInstance.render(this.directList)
        this.directList = []
    }
}

module.exports = Render