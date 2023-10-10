import {Parser} from "./Parser";
import {NodeVisitor} from "../NodeVisitor";
import {Dict, Item, KeyValue, List} from "../AstNode";

export class GenerateDot extends NodeVisitor{
    parser: Parser;
    content: string[];
    header: string;
    footer: string;
    label: number

    constructor(parser: Parser) {
        super();
        this.parser = parser;
        this.content = [];
        this.header = "digraph astgraph { \n" +
            "node [shape=circle, fontsize=12, fontname=\"Courier\", height=.1]; \n" +
            "ranksep=.3;\n" +
            "edge [arrowsize=.5]\n"
        this.footer = "\n}";
        this.label = 1; // 节点的编号
    }

    visitDict(root: Dict) {
        let i = this.label;
        this.content.push(`node${i} [label="Dict"]`);
        for (let j = 0; j < root.keyValues.length; j++) {
            this.label++;
            this.content.push(`node${i} -> node${this.label}`);
            this.visit(root.keyValues[j]);
        }
    }

    visitItem(root: Item) {
        let r = root.value;
        if (typeof r === 'string' || typeof r === 'number') {
            this.content.push(`node${this.label} [label="${typeof r}: ${r}"]`);
        } else if (r instanceof List) {
            this.visit(r);
        } else if (r instanceof Dict){
            this.visit(r);
        }
        this.label++;
    }

    visitList(root: List) {
        let i = this.label;
        this.content.push(`node${i} [label="List"]`);
        for (let j = 0; j < root.lists.length; j++) {
            this.label++;
            this.content.push(`node${i} -> node${this.label}`);
            this.visit(root.lists[j]);
        }
    }
    visitKeyValue(root: KeyValue) {
        let i = this.label;
        this.content.push(`node${i} [label="key: ${root.key}"]`);
        this.label++;
        this.content.push(`node${i} -> node${this.label}`);
        this.visit(root.value);
    }

    // 生成dot文本 可视化图结构用
    dot(): string {
        this.visit(this.parser.parse());
        return this.header + this.content.join('\n') + this.footer;
    }





}