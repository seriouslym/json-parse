import {Lexer} from "./Lexer";
import Token from "../Token";
import {Type} from "../Constants";
import {Dict, Item, ItemTypes, KeyValue, List} from "../AstNode";

export class Parser {
    lexer: Lexer;
    currentToken: Token;
    cache: Dict | List;  // 缓存
    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }


    // 验证当前token是否是给定的类型
    eat(type: Type){
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    error(): Error {
        throw new Error('parse error');
    }


    list(): List{
        let res: Array<Item> = new Array<Item>();
        // console.log("list")
        this.eat(Type.LEFT_BRACKET);
        res.push(this.item());
        while (this.currentToken.type === Type.COMMA) {
            this.eat(Type.COMMA);
            res.push(this.item());
        }
        this.eat(Type.RIGHT_BRACKET);
        return new List(res);
    }
    // string | number | list | dict | empty | null | true | false
    item(): Item {
        // 排除empty
        let res: ItemTypes;
        if (this.currentToken.type !== Type.RIGHT_BRACKET) {
            if (this.currentToken.type === Type.STRING) {
                // console.log(`string: ${this.currentToken.value}`)
                res = this.currentToken.value;
                this.eat(Type.STRING);
            } else if (this.currentToken.type === Type.NUMBER){
                // console.log(`number: ${this.currentToken.value}`);
                res = Number(this.currentToken.value);
                this.eat(Type.NUMBER);
            } else if (this.currentToken.type === Type.TRUE) {
                res = true;
                this.eat(Type.TRUE);
            } else if (this.currentToken.type === Type.FALSE) {
                res = false;
                this.eat(Type.FALSE);
            } else if (this.currentToken.type === Type.NULL) {
                res = null;
                this.eat(Type.NULL);
            } else if (this.currentToken.type === Type.LEFT_CURLY_BRACE) {
                // console.log('dict');
                res = this.dict();
            } else {
                res = this.list();
            }
            return new Item(res);
        }

    }
    // {"key":}
    dict(): Dict{
        this.eat(Type.LEFT_CURLY_BRACE);
        // parse
        let res = this.keyValueList();
        this.eat(Type.RIGHT_CURLY_BRACE);
        return new Dict(res);
    }
    //
    keyValueList(): KeyValue[] {
        let res: KeyValue[] = [];
        let [k, v] = this.keyValue();
        res.push(new KeyValue(k, v));
        while (this.currentToken.type === Type.COMMA) {
            this.eat(Type.COMMA);
            let [k, v] = this.keyValue();
            res.push(new KeyValue(k, v));
        }
        return res;
    }
    // "key": item
    keyValue(): [string, Item] {
        let key = this.currentToken.value;
        // console.log(`key: ${key}`);
        this.eat(Type.STRING);
        this.eat(Type.COLON);
        return [key, this.item()];
    }
    parse(): List | Dict {
        if (this.cache) {
            return this.cache
        }
        if (this.currentToken.type === Type.LEFT_BRACKET) {
            this.cache = this.list();
        } else {
            this.cache = this.dict();
        }
        return this.cache;
    }


}