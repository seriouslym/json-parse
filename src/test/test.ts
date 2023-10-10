import {Lexer} from "../core/Lexer";
import {Parser} from "../core/Parser";
import {GenerateDot} from "../core/GenerateDot";
import * as fs from "fs";
import * as path from "path";
import {JsonParser} from "../core/JsonParser";



// let text = '["sdf", 99, [23.234, "sdf"]] ';
// text = '{"name": 1.232, "age": "2", "l": [1,2,3,{"age": [1,2,"name"]}]}'
let sourceCodePath = path.join(...[__dirname, "../../public/test.json"]);
let text = fs.readFileSync(sourceCodePath).toString();
let lexer = new Lexer(text);
// console.log(lexer.getTokens());
let parser = new Parser(lexer);






// let interpreter = new GenerateDot(parser);
// let content = interpreter.dot();
//
// console.log(content)
//
// let targetPath = path.join(...[__dirname, '../../public/ast.dot']);
// fs.writeFileSync(targetPath, content);



let jsonParser = new JsonParser(parser);
let object = jsonParser.json() as Map<string, any>;
console.log(object.get("hasNextPage"));







