// 我们如何用状态机处理诸如“abcabx”这样的字符串？
// 严格的状态不允许写state(c)
function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if(c === "a") {
        return foundA;
    } else {
        return start;
    }
}

function end (c) {
    return end;
}

function foundA(c){
    if(c === "b") {
        return foundB;
    } else {
        return start(c);
    }
}

function foundB(c){
    if(c === "c") {
        return foundC;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if(c === "a") {
        return foundA2;
    } else {
        return start(c);
    }
}

function foundA2(c) {
    if(c === "b") {
        return foundB2;    
    } else {
        return start(c);
    }
}

function foundB2(c) {
    if(c === "x") {
        return end;
    } else {
        return foundB(c);
    }
}

console.log(match("eabcabcabxsd"));


function match(pattern, string) {

}
match("ababx", "I an ababx! haha!");


// Q:参考资料？
fxm

Q:画状态转移图？
后面有

Q:kmp应该比状态机效率更高吧，毕竟有坏字符和好字符
kmp在这个问题上写出来是等效的，除非你有哪一个算法写的是错的，两个时间复杂度是完全一致的

Q:为什么正规的状态机不推荐直接写 state(c) 这样的？
正规的状态机比较涉及到多个状态合并，所以你一旦有了二重状态，就不是合并了。它就没有办法和
别的状态做合并，这个就是一个比较严重的问题了

Q:状态机一般用于什么方面？
游戏，敌人的ai，处理字符串，编译原理，ai

Q:没有太明白state(c)，这个传参是什么意思？
传进来就是字符，状态机的输入

Q:构建AST抽象语法树 是不是也可以用状态机哦
AST的构建的话有两个主要的算法一个是LR,一个是LL。LR的构建抽象语法树是需要状态机的。LL就是
硬写

Q:挑战题是不是应该用一个数组或其他缓存？
应该是需要数组的因为挑战的pattern是根据状态树的长度生成的。挑战题所有的状态都不是手写的。

Q:为什么状态机无法封装
所有的状态机，(在每一个机器里，我们可以做计算、存储、输出)，而我们现在的状态机实现方式已经
简化为以一个函数了，所以你用任何的数据结构和时间机制你最后写出来的东西一定比函数裸写还要更
复杂，所以状态我认为没有封装的必要。因为你不管封装成什么，你只要自由的写逻辑去传函数，既然
你要传函数，那么最后你必须要产生事件这样的。反正要写个函数，为什么不把每个状态写成函数呢？
当然也可以有别的写法。

状态机没法封装，但是状态机处理字符串。还是可以封装的，比如说正则就是状态机处理字符串的一种
封装。

Q:为啥状态机不能有副作用哦？做解析的时候怎么存数据呢？
存数据是可以存的
状态机不可以有影响输出的内容
改外面是没问题的，别让外面改里面
有对外输出型的副作用
不能外面的影响他自己

Q:react中的生命周期函数是有限状态机吗?
不是
多数的状态 都跟 状态机没有关系，大部分状态跟状态模式有关系

Q:Meal状态机是异步输出吗？
你也可以把它设计为异步输出，这取决于你在状态机里做的事情。

Q:好想用generator来试试实现状态机
generator是可以实现的

Q:答疑 02.18.10



