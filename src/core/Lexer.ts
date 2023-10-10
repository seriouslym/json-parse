import Token from "../Token";
import {isAlpha, isEscapeChar, isNumber} from "../Utils";
import {Type} from "../Constants";
import {type} from "os";

export class Lexer {

    text: string;
    pos: number;
    currentChar: string;
    constructor(text: string) {
        // 要解析的json文本
        this.text = text;
        // 当前指针指向的位置
        this.pos = 0;
        // 当前指针指向的字符
        this.currentChar = this.text.charAt(this.pos);
    }
    // 指针往前移并更新当前字符
    advance(): void {
        this.pos++;
        if (this.pos >= this.text.length) {
            this.currentChar = null;
        } else {
            this.currentChar = this.text.charAt(this.pos);
        }
    }
    // 跳过空格 回车 换行等字符
    skipWhitespace(): void {
        while (this.currentChar !== null && isEscapeChar(this.currentChar)) {
            this.advance();
        }
    }
    // 解析 整数或者浮点数
    number(): Token {
        let start = this.pos;
        while (this.currentChar !== null && isNumber(this.currentChar)) {
            this.advance();
        }
        if (this.currentChar === '.') {
            this.advance();
            while (this.currentChar !== null && isNumber(this.currentChar)) {
                this.advance();
            }
            return new Token(Type.NUMBER, this.text.slice(start, this.pos));
        }
        return new Token(Type.NUMBER, this.text.slice(start, this.pos));
    }

    // 解析key json中的必须key由""包含
    string(): string{
        let res = "";
        while (this.currentChar !== null && this.currentChar !== '"') {
            res += this.currentChar;
            this.advance();
        }
        this.advance();
        return res;
    }

    // 判断当前字符的类型 并获取下一个token
    getNextToken(): Token {
        while (this.currentChar != null) {
            if (isEscapeChar(this.currentChar)) {
                this.skipWhitespace();
                continue;
            } else if (this.currentChar === '[') {
                this.advance();
                return new Token(Type.LEFT_BRACKET, "[");
            } else if (this.currentChar === ']') {
                this.advance();
                return new Token(Type.RIGHT_BRACKET, ']');
            } else if (this.currentChar === '{') {
                this.advance();
                return new Token(Type.LEFT_CURLY_BRACE, "{");
            } else if (this.currentChar === '}') {
                this.advance();
                return new Token(Type.RIGHT_CURLY_BRACE, "}");
            } else if (this.currentChar === ',') {
                this.advance();
                return new Token(Type.COMMA, ",");
            } else if(this.currentChar === '"') {
                this.advance();
                return new Token(Type.STRING, this.string());
            } else if(this.currentChar === ':') {
                this.advance();
                return new Token(Type.COLON, ':');
            } else if (isNumber(this.currentChar)) {
                return this.number();
            } else if (isAlpha(this.currentChar)) {
                let id = this.id();
                if (id === 'true') {
                    return new Token(Type.TRUE, "true");
                } else if (id === 'false') {
                    return new Token(Type.FALSE, "false");
                } else if (id === 'null') {
                    return new Token(Type.NULL, "null");
                }
            }
            throw new Error("parse error");
        }
        return new Token(Type.EOF, null);
    }

    // 用于解析 true false null三个特殊的字符串
    id(): string {
        let start = this.pos;
        while (this.currentChar !== null && isAlpha(this.currentChar)) {
            this.advance();
        }
        return this.text.slice(start, this.pos);
    }




    // 解析错误 抛出异常
    error(): Error {
        throw new Error('parse error');
    }

    getTokens(): Token[] {
        let res: Token[] = [];
        while (this.currentChar !== null) {
            res.push(this.getNextToken());
        }
        this.pos = 0;
        this.currentChar = this.text.charAt(this.pos);
        return res;
    }


}