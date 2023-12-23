const startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
const endTagReg = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
const attrReg = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:("(?:\\.|[^"])*")|('(?:\\.|[^'])*')|([^>\s]+)))?/g;
const attrLeft = /(?:"((?:\\.|[^"])*)")/g;
const commentReg = /^<!\--/;

function workMyxml(myxml, options) {
    const stack = [];
    let index = 0;
    let preText = '';
    while (myxml) {
        let textFirstIndex = myxml.indexOf('<');
        if (textFirstIndex == 0) {
            if (commentReg.test(myxml)) {
                const commentEndIndex = myxml.indexOf('-->');
                if (commentEndIndex >= 0) {
                    index = index + commentEndIndex + 3;
                    myxml = myxml.substring(commentEndIndex + 3);
                    continue;
                }
            }
            let endTagMatch = myxml.match(endTagReg);
            if (endTagMatch) {
                const curIndex = index;
                index += endTagMatch[0].length;
                myxml = myxml.substring(endTagMatch[0].length);
                parseEndTag(endTagMatch[1], curIndex, index);
                continue;
            }
            /* 如果是标签开始 */
            const startTagMatch = myxml.match(startTag)
            if (startTagMatch) {
                index += startTagMatch[0].length
                myxml = myxml.substring(startTagMatch[0].length)
                const tagName = startTagMatch[1] // view
                const rest = startTagMatch[2]  //  bind:tap="handleClick" class="text {{ customClass }}"
                const isSingle = startTagMatch[3] // false
                /* 创建一个元素节点 */
                const matchTag = {
                    tag: tagName, // 类型
                    attr: {},   // 属性
                    isSingle: isSingle ? true : false, // 是否是单标签
                }

                rest.replace(attrReg, function (match, name, value) {
                    let _value
                    if (value !== undefined) {
                        value.replace(attrLeft, (_match1, val) => {
                            _value = val
                        })
                    }
                    matchTag.attr[name] = _value !== undefined ? _value : true
                })
                if (!isSingle) {
                    stack.push(matchTag)
                }
                /* 把新的元素节点，插入到栈点元素中 */
                options.pushStack && options.pushStack(matchTag)
                continue
            }
        }
        let text;
        if (textFirstIndex > 0) {
            text = preText + myxml.substring(0, textFirstIndex);
            preText = '';
            index += textFirstIndex;
            myxml = myxml.substring(textFirstIndex);
        }
        if (textFirstIndex < 0) {
            text = preText + myxml;
            preText = '';
            myxml = '';
        }
        if (textFirstIndex === 0) {
            preText += myxml[0];
            index += 1;
            myxml = myxml.substring(1);
        }
        options.handleText && text && options.handleText(text);
    }
    parseEndTag('', 0, 0);
   
    function parseEndTag(tagName) {
        let pos;
        if (tagName) {
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].tag === tagName) {
                    break;
                }
            }
        }
        else {
            pos = 0;
        }
        if (pos >= 0) {
            for (let i = stack.length - 1; i >= pos; i--) {
                options.popStack && options.popStack(stack[i]);
            }
            stack.length = pos;
        }
    }
}


function myxmlParse(code){
    /* 根节点 */
    let root = {
        tag: "root",
        attr: {},
        children: []
    }
    const stack = []
    let currentRoot = root
    /* 压入栈 */
    const pushStack = (matchRoot) =>{
        matchRoot.children = [];
        currentRoot.children.push(matchRoot);
        if (!matchRoot.isSingle) {
            stack.push(matchRoot);
            currentRoot = matchRoot;
        }
    }
    /* 移除栈 */
    const popStack = ()=>{
        stack.pop();
        if (stack.length == 0) {
            currentRoot = root;
        }else {
            currentRoot = stack[stack.length - 1];
        }
    }

    /* 处理文本 */
    const handleText = (txt='')=>{
        txt = txt.trim()
        if (txt) {
            let currentChilds = currentRoot.children
            if (typeof currentChilds[currentChilds.length - 1] === 'string') {
                currentChilds[currentChilds.length - 1] = currentChilds[currentChilds.length - 1] + txt;
            }
            else {
                currentChilds.push(txt)
            }
        }
    }
    workMyxml(code,{
        popStack,handleText,pushStack
    })
    return root
}

module.exports = myxmlParse

