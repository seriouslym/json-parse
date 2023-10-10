import {NodeVisitor} from "../NodeVisitor";
import {Dict, Item, KeyValue, List} from "../AstNode";
import {Parser} from "./Parser";

export class JsonParser extends NodeVisitor{
    parser: Parser;

    constructor(parser: Parser) {
        super();
        this.parser = parser;

    }

    visitDict(root: Dict): Map<string, any>{
        let res = new Map<string, any>();
        for (let each of root.keyValues) {
            res.set(each.key, this.visit(each.value));
        }
        return res;
    }

    visitItem(root: Item) {
        let v = root.value;
        if (typeof v === 'string' || typeof v === 'number' || v === false || v === true || v === null) {
            return v;
        } else if (v instanceof List) {
            return this.visitList(v);
        } else {
            return this.visitDict(v);
        }
    }

    visitKeyValue(root: KeyValue) {
    }

    visitList(root: List) {
        let res: Array<any> = new Array<any>();
        for (let each of root.lists) {
            res.push(this.visitItem(each));
        }
        return res;
    }

    json(): object {
        return this.visit(this.parser.parse());
    }


}