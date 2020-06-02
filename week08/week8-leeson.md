# 选择器语法--重学css

#### 选择器语法

- 简单选择器

  - *
    - 可以组合使用
  - Div svg|a （namespace-xml的知识）
    - Tag (现在所有的标签都是html下的)
  - .cls
    - 空格分割多个 (属性选择器的特例)
  - #id
    - [attr=value] 还有~和|的
  - :hover
    - 和html完全无关、从用户交互、浏览器机制等
  - ::before
    - 本来没有 硬选出来

- 复合选择器

  - <简单选择器><简单选择器><简单选择器>

  - *或者div必须写在最前面

    简单选择器写在一起就是复合选择器，与的关系

    *和text letter写在最前面，伪类和伪元素写在最后面

- 复杂选择器

  - <复合选择器><sp><复合选择器>  子孙关系

  - <复合选择器>">"<复合选择器>  子选择器

  - <复合选择器>"~"<复合选择器> siblings相关

  - <复合选择器>"+"<复合选择器> siblings相关

  - <复合选择器>"||"<复合选择器> label4加的，table中选中一列，一般不用

    复杂选择器就是把复合选择器用操作符链接 

    在复杂选择器之上还有选择器列表，就是以逗号分隔的

    三代的是都可以无回溯的

#### 选择器优先级

- 简单选择器计数

  [行内，id，class，tag]

- 练习

  - div#a.b .c[id=x] [0,1,3,1]
  - #a:not(#b)[0,2,0,0]
  - *.a[0,0,1,0]
  - div.a [0,0,1,1]

  -- # > [id=x]

  -- . = [id=x]

  -- #a :not(#a)

  -- * 不改变specificity



群里小伙伴的解释

- div#a.b .c[id=x]
  - div [0, 0, 0, 1]
  - div#a [0, 1, 0, 1]
  - div#a.b [0, 1, 1, 1]
  - div#a.b .c [0, 1, 2, 1]
  - div#a.b .c [0, 1, 3, 1]
- \- #a:not(#b)
    \- #a [0, 1, 0, 0]
    \- #a:not(#b) [0, 2, 0, 0] // :not 使用参数中的选择器的优先级
  *.a
    \- * [0, 0, 0, 0] // * 号不参与计算
    \- *.a [0, 0, 1, 0]

link

​	https://specifishity.com

​	https://www.w3.org/wiki/Css/Training/Priority_level_of_selector

​	http://www.standardista.com/css3/css-specificity/.    ---

​	https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity

​	https://drafts.csswg.org/selectors-3/#specificity 

​	https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity

​	https://www.w3.org/TR/CSS2/cascade.html#specificity

​	https://www.w3.org/TR/2018/WD-selectors-4-20181121/#specificity-rules 

​	https://www.w3.org/TR/2016/WD-CSS22-20160412/cascade.html#specificity

#### 伪类

- :any-link.
- :link :visited  (link没访问的 visited访问过的) 跟超链接相关的选择器
- :hover  本来是跟超链接相关的，后来就是全部都加上了。鼠标悬停的状态
- :active  真对有交互的，比如说按钮点一下  
- :focus  焦点性，可以用tab切这个focus的元素，用tab键切换，切到上面，点一下回车就变成active
- :target
  - Active 和 focus 既可以键盘触发也可以鼠标触发，hover只可以被鼠标触发，target 如果当锚点用会有target



- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child

什么时候computed CSS，start-tag。

这些伪类哪些实现不了的？

​	:nth-last-child、:last-child、:only-child。

:only-child至少标签结束，完后再往后扫一个token才知道是不是:only-child。last-child也是一样。

:nth-last-child也是一样的，你要看end-tag的后的下一个token是什么样的。

:first-child是可以实现的，因为start-tag来的时候，它是不是:first-child我们已经知道了，因为它前面有没有我们是可以知道的。

:nth-child()也可以知道的，因为start-tag来的时候我们已经知道它是第几个child了。

:empty比较特殊，虽然说没办法在start-tag那里知道，但是其实我们只需要再往后看一个token，我们就知道它是不是empty，因为如果是:empty，start-tag后面就会紧跟着一个end-tag，如果是个selfclosing那我们马上就知道了。

所以大部分浏览器都会实现:empty :nth-child() :first-child，nth-child就看缘分了。

这里涉及了css回溯。

- 逻辑型
  - :not伪类 在level3只能放复合选择器。在level4里面可以放选择器列表。所以使用的时候最好放简单选择器
  - :where :has 



伪元素

- ::before  无中生有，怎么做语义，怎么是表现。

- ::after  无中生有

- ::first-letter

  - font系列
  - color系列
  - background系列
  - word-spacing
  - letter-spacing 
  - text-decoration
  - text-transform
  - line-height
  - float
  - vertical-align 
  - 盒模型系列: margin padding border

- ::first-line

  - font系列

  - color系列

  - background系列

  - word-spacing

  - letter-spacing 

  - text-decoration

  - text-transform

  - line-height

    

Q: 为什么first-letter可以设置float之类的，而first-line不行呢？

float脱离流出去，和first-line定义矛盾了。

Q: first-line为什么能改字体？

first-line其实不是先算好哪些文字在first-line里面，去应用这些特性，而是我们在排版的过程当中，把first-line的属性直接加到文字上。first-line除了line-height无关，其他所有属性都是关于文字，没有作用于盒的。

我们要在layout操作computedCSS





作业: 编写一个match函数

function match(selecor, element) {

​	return true;

}



match("div #id.class", document.getElementById('id'));



标签 	源代码

元素 	语义

盒 		表现 before和after可能产生多个盒

将来大部分css排版和渲染都是针对盒





盒(BOX)



有了盒的概念，再有盒模型。

一个基础的盒 分为4层

content padding(边距) border margin(留白)

盒真实的宽度 四层

浏览器表现的width默认的是content-width。

不符合人的直觉，宽度怎么不包含边框，所以有一个补丁box-sizing。

Box-sizing是border-box，width就表示包含边框和边距和内容。

Layout-width layout-height

getstyle可以把layout-width算出来 



正常流

- 正常流排版
  - 收集盒进行
  - 计算盒在行中排布
  - 计算行中的排布

​	正常流的行模型



一个inline-box如果里面没任何的文字。那么基线在底部

Vertical-align baseline，有文字是文字的小边缘，没文字的话是盒的下边缘。

一般用Vertical-align bottom top middle，否则就很容易出现惊喜

行模型，我们始终是根据行中最高的元素作为行高，保证最高的元素对齐是正确的。

Q：可以理解为一行的行高是行高最高的子元素的行高么？

如果有子元素超过了line-height属性是的。所以越撑越大。





### float与clear

- float可换行
- margin可生效
- 不能用真的br
- 不和别人混合的话很方便
- float会导致重排，但范围很小
- float在first-line上不生效



脱离文档流--不再任何一个行盒里

上节课相关:

​	First-letter 相当于html源码里的first-letter

​	First-line 相当于css排版的first-line



### margin折叠

- 只发生在bfc里，inline，float里面没有。

- Overflow:hidden; inline-block，产生一个新的容器，产生bfc。

- overflow:visible不影响

- Flex-item也是独立的bfc

- 不存在怎么创建bfc，只要里面默认能容纳正常流它都是新bfc，只有一种特例就是overflow:visible。

- ！记住bfc合并规则，overflow:visible




### overflow:visible与BFC

bfc是一个正常流排版的



Block-container是里面可以容纳block的东西

Block-level 是可以放进正常流里面的东西

Block-box 就是里外都是block的东西



Block-level 表示可以被放入bfc

Block-container 表示可以容纳bfc

Block-box = Block-level + Block-container 

Block-box 如果overflow: visible ，那么就跟父bfc合并



Block-level boxes that are also block containers are called block boxes.

Block-level boxes 作为box扔进正常流

Block-container 它里面容纳正常流

Block box 就是里外都是block的东西



flex inline-flex

table inline-table

Grid inline-grid

block inline-block

Block-container只有inline 和 block是，flex不是，但是flex子元素是

哪些是block-level，前四个。

既是block-level，又是block-container的。 Block 

Flex是block-level不是block-container，所以不产生bfc，flex-item是产生bfc的(display:flex除外)

里面只要包含正常流，就产生bfc。一般最子一级产生bfc。



## Flex

- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布

可能table和grid特殊一点，正常流和flex都是这三步



- 分行
  - 根据主轴尺寸，把元素进行分行
  - 若设置了no-wrap，则强行分配进第一行
- 计算主轴方向
  - 把所有Flex元素
  - 把主轴方向的声誉尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
- 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高flex-align和item-align，确定元素具体位置



Q:first-line能选中盒子，还有其他的元素能选中盒子么？

除了四个伪元素选择器，没有任何选择器可以选中盒子。