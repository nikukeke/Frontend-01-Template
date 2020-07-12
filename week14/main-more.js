// require("./foo.js")
// import "./foo";
// let component = <Cls id="a" />


// ----
// component.id 
// component.id = "b"
// component.setAttribute("id","a");


// ----
// let component;
// component.setAttribute("id","a");


// ----
// React = {}
// React.createElement = function createElement(Cls, attributes) {
//     // console.log(arguments);
//     var o = new Cls;

//     for (let name in attributes) {
//         o[name] = attributes[name];
//     }
//     return o;
// }


// ----
// function createElement(Cls, attributes) {
//     // console.log(arguments);
//     var o = new Cls;

//     for (let name in attributes) {
//         o[name] = attributes[name];
//     }
//     return o;
// }

// babel的能力，把它编译成一个普通的函数
// class Div {

// }
// div 小写 字符串
// 大写 class function

// let component = <Div id="a" class="b" />
// // component.setAttribute("id","a");

// console.log(component);


// ----
// 很大程度决定里组件体系的设计
// 声明语言和编程语言的交界
// 决定里组件系统里的每个组件如何去写
// 框架代码
function createElement(Cls, attributes, ...children) {
    // console.log(arguments)
    // debugger
    // var o = new Cls;
    let o;
    if (typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        })
    }



    for (let name in attributes) {
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name])
    }
    console.log(children);
    // 所以在JSX里，父子树构建，先子后父

    for (let child of children) {
        if (typeof child === "string")
            child = new Text(child);
        // console.log(child);
        o.appendChild(child);
        // o.children.push(child)
        // console.log("Parent::appendChild", child);
    }

    return o;
}
class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text)
    }


    mountTo(parent) {
        parent.appendChild(this.root);
    }

}
class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);

    }

    mountTo(parent) {
        parent.appendChild(this.root);

        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }

}

// 用户代码
class MyComponent {
    // 只有一次设置
    constructor(config) {
        this.children = [];
        // this.root = document.createElement("div");
        // console.log('config', config);
    }
    // set cls(v) {  // property
    //     console.log('Parent::class',v)
    // }
    // set id(v) {  // property
    //     console.log('Parent::id',v)
    // }
    setAttribute(name, value) {  // attribute
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }
    // appendChild(child) {  // children
    //     console.log('Parent::appendChild', child);
    // }

    appendChild(child) {  // children
        // child.mountTo(this.root);
        this.children.push(child); 
    }

    render() { 
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent) {
        // parent.appendChild(this.root);
        
        this.slot = <div></div>
        for (let child of this.children) {
            // child.mountTo(this.root) 
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }

}



let component =  <MyComponent>
                    <div>text text text</div>
                </MyComponent>;
// let component = <div>{new Wrapper("span")}</div>;


{/* <div id="a" cls="b" style="width:100px;height:100px;background-color:pink;">
    <div>ext text tex</div> 
    <div>{1}</div>
    <div>{new Wrapper("span")}</div>
</div> */}

// component.id = "c";
// console.log(component);
component.mountTo(document.body)

// 编译后的代码
// var component = createElement(Parent, {
//     id: "a",
//     "class": "b"
// }, createElement(Child, null),
//     createElement(Child, null),
//     createElement(Child, null));
console.log(component);
