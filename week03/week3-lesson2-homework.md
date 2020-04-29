- JavaScript | 语句，对象
  - 根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。



object 

一个对象有属性，有一个prototype，但是prototype可能为空值。



function object [函数对象]

函数对象创建和初始化对象会有constructor



ordinary object [基本对象]

所有的对象都支持有默认的行为和基本的内部方法

 

exotic object [外来对象]

对象没有默认的行为或者基本的内部方法。



standard object [标准对象]

有明确的定义



built-in object [构造对象]

对象基于ECMAScript标准

标准构造对象基于ECMAScript标准。ECMAScript标准



boolean object

对象类型里的一个成员作为内置boolean类型的构造器

boolean对象是基于boolean构造器制造的用new 表达式，支持一个布尔值



string object 

对象类型里的一个成员作为内置string类型的构造器

string对象是基于string构造器制造的new表达式，提供一个字符串的值作为一个argument。对象结果有一个内的插槽放字符串值对应的值。一个string对象可以作为一个函数通过一个string值通过call指向string构造器



number object

对象类型里的一个成员作为内置number类型的构造器

number对象是基于number构造器制造的new表达式，提供一个数值作为一个argument，对象结果有一个内的插槽放数值数值对应的值。一个数值对象可以作为一个函数通过一个number值通过call指向number构造器



The Object Type

一个对象逻辑上是收集属性，每一个特性是数据特性或者访问特性。

一个数据特性联系一个键值对 一个ECMAScript值和一系列的布尔特性。一个入口特性把键值对和一或个两个热口函数，和一些列的布尔特性。一个入口函数用于去存取一个ECMAScript值去关联一个特性。



特性用键值联系起来。一个特性值是一个ECMAScript String值或一个Sy mbol值。所有的String和Symbol值，包括空字符串，作为有效的特性值。一个特性名是一个特性key的 String value。



属性特性

特性被用作工作规范去定义和解释对象属性的状态。一个数据属性联系一个key value 和 特性表

