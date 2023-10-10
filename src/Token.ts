import {Type} from "./Constants";


//
export default class Token {
    type: Type; // token的类型，是一个枚举类型
    value: string; // 用来保存token的值（12.23， true, false, null, :）等
    constructor(type: Type, value: string) {
        this.type = type;
        this.value = value;
    }
}