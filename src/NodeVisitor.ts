import {AstNode, Dict, Item, KeyValue, List} from "./AstNode";
import {Key} from "readline";

// 方便遍历ast树
export abstract class NodeVisitor {
    visit(root: AstNode): any{
        if (root instanceof List) {
            return this.visitList(root);
        } else if (root instanceof Dict) {
            return this.visitDict(root);
        } else if (root instanceof Item){
            return this.visitItem(root);
        } else if (root instanceof KeyValue) {
            return this.visitKeyValue(root);
        }
    }

    abstract visitList(root: List);
    abstract visitDict(root: Dict);
    abstract visitItem(root: Item);
    abstract visitKeyValue(root: KeyValue);




}