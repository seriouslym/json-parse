### 代码结构
+ src源代码
  + core核心
  + test测试
  + AstNode：抽象语法树节点定义
  + Constants：类型枚举
  + NodeVisitor：遍历树节点
  + Token：token的定义
  + Utils：通用方法
+ public存放测试json，可视化ast结构
### 简单Json解析器，主要分为三个部分
+ Lexer
  + 也可以称为tokenizer，将原始字符串，解析为一个个的token序列
  + 其核心就是getNextToken方法，其根据当前字符的类型，解析返回对应的token
+ Parser
  + 借助Lexer得到token序列，并按照递归下降方法识别合法的Json字符串
  + Json的语法规则
    + 有数组([])和对象({})两个数据结构
    + 数据里面顺序存放着value集合，对象以key-value的形式存放
    + value可以是number、string、null、true、false、数组和对象
  + 用正规式将上述语法描述出来，即Parser里面的方法
    + list: [item(,item)*]
    + dict: {keyValueList}
    + keyValueList: keyValue(, keyValue)*
    + keyValue: key:item
    + key: string
    + item: number | string | true | false | null | list | dict
  + 递归下降方法
    + 每一个规则翻译成一个函数，
    + 引用该规则 -> 调用对应函数。
    + 引用token -> 调用eat()函数
    + | -> if else if
    + ()* -> while()
+ JsonParser GenerateDot
  + 都继承了NodeVisitor抽象类，重写visitX方法
  + GenerateDot 在遍历过程中生成dot文件实现可视化
  + JsonParser 解析封装返回json对象

当翻译好上述方法后，就能识别json了，但是仅仅是识别，并不能做额外的操作，根本原因是我们在隐形遍历树结构过程中没有保留相关信息
为此，我们在递归下降过程中显示的构造树节点，方便后续操作。这个过程就是抽象语法树（Abstract Syntax Tree）构建的过程
(ast相关节点定义在AstNode.ts文件中)

当我们构造好了ast树后，就可以遍历树，完成对象封装等操作。

 
