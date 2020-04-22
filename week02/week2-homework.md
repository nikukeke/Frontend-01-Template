## 课后作业：

- ##### 写一个正则表达式 匹配所有 Number 直接量

- ##### 写一个 UTF-8 Encoding 的函数

- ##### 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号



1、写一个正则表达式 匹配所有 Number 直接量

思路、(正负号)(0或者十进制数)(小数点)(数字)(e)(正负号)(1)(0)次幂

`/^(-)?([0]|[1-9][0-9]*)?(\.)?(\d)*([e][-]?[1][0]*)*$/`

可匹配

1.0

1.

.0

12.6e10

12.6e-10

12

-12

但是也可以匹配.



2、写一个 UTF-8 Encoding 的函数

思路：有点没看懂题目，我理解的是传一个字符串进去，转成二进制。在判断它是多少字节？

资料：

​	如果只有一个字节则其最高二进制位为0

​	如果是多字节，其第一个字节从最高位开始，连续的二进制位数为1的个数决定了其他编码的位数，其余各字节均以10开头。

​	 UTF-8编码方式

```
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```



`        function UTF8_Encoding(string) {

​            let code = string.charCodeAt().toString(2); 

​            let bit = 0;

​            let len = 0; 

​            for (let i = 0; i < code.length; i++) {

​                if (code[i] != 0) {

​                    len++; 

​                    bit = max(bit,len); 

​                } else if (code[0] == 0){

​                    bit = 1;

​                    return bit;

​                } else { 

​                    len = 0;

​                }

​            }    

​            return new Buffer(bit);

​        }



​        function max(a,b) {

​            if(a>=b) {

​                return a;

​            } else if (a<b) {

​                return b;

​            }

​        }`



3、写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

*DoubleStringCharacter* **::
** *SourceCharacter* but not one of **"** or **\** or *LineTerminator* <LS>
 <PS>
 **\** *EscapeSequence
 LineContinuation*

*SingleStringCharacter* **::
** *SourceCharacter* but not one of **'** or **\** or *LineTerminator* <LS>
 <PS>
 **\** *EscapeSequence
 LineContinuation*



`^"["\\]|(\x[0-1]{2})|(\u[0-9a-fA-F]{4})|['"\bfnrtv]"$`

`^'["\\]|(\x[0-1]{2})|(\u[0-9a-fA-F]{4})|['"\bfnrtv]'$`

ps.我正则太菜了，时间不足了，我先预习了,5555



