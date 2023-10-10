export class AstNode {

}

export class List extends AstNode {
    lists: Array<Item>;
    constructor(lists: Array<Item>) {
        super();
        this.lists = lists;
    }

}

export type ItemTypes = string | number | List | Dict | false | true | null;
export class Item extends AstNode {
    value: ItemTypes;
    constructor(value: ItemTypes) {
        super();
        this.value = value;
    }
}

export class Dict extends AstNode {
    keyValues: KeyValue[];
    constructor(keyValues: KeyValue[]) {
        super();
        this.keyValues = keyValues;
    }
}
export class KeyValue extends AstNode {
    key: string;
    value: Item;

    constructor(key: string, value: Item) {
        super();
        this.key = key;
        this.value = value;
    }

}