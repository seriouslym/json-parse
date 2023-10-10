export function isNumber(char: string): boolean {
    return char.length === 1 && char >= '0' && char <= '9';
}
export function isAlpha(char: string, first: boolean = false): boolean {
    // 检查首字母 必须是_ 或者是字母  ^表示匹配输入字符串的开头位置
    if (first) {
        return /^[_a-zA-Z]/.test(char);
    }
    // 默认检查_ 字母 数字
    return /^[_a-zA-Z0-9]/.test(char);
}
export function isEscapeChar(char: string): boolean {
    // re中\s匹配特殊转义字符
    return /^\s/.test(char);
}