
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



let component = <MyComponent>
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
