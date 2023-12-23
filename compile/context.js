class CodeContext {
    constructor(){
        /* 记录生成的 code 代码 */
        this.code = ''
        this.indentLevel = 2 /* 代码缩进两个字符 */
    }
    /* 拼接目标 */
    pushCode(code){
        this.code += code
    }
    /* 换行 */
    newLine(){
        this.pushCode("\n" + `  `.repeat(this.indentLevel));
    }
    /* 换行并且缩紧 */
    indent() {
        this.newLine(++this.indentLevel);
    }
    deindent(){
        this.newLine(--this.indentLevel);
    }
}

module.exports = CodeContext