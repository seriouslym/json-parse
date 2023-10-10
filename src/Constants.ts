import Token from "./Token";

export enum Type {

    STRING = "STRING",
    NUMBER = "NUMBER",
    EOF = "EOF",
    LEFT_BRACKET = "LEFT_BRACKET",
    RIGHT_BRACKET = "RIGHT_BRACKET",
    LEFT_CURLY_BRACE = "LEFT_CURLY_BRACE", // {
    RIGHT_CURLY_BRACE = "RIGHT_CURLY_BRACE", // }
    PROGRAM = "PROGRAM", // pascal关键字
    COLON = "COLON", // 冒号
    COMMA = "COMMA", // 逗号
    LIST = "LIST",
    DICT = "DICT",
    TRUE = "TRUE",
    FALSE = "FALSE",
    NULL = "NULL",

}

