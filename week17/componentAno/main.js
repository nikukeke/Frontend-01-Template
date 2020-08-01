import { createElement, Text, Wrapper } from "./createElement";
import { Carousel } from "./Carousel.js";
import { Panel } from "./Panel";
import { TabPanel } from "./TabPanel";
import { ListView } from "./ListView";

// class MyComponent {
//     // 只有一次设置
//     constructor(config) {
//         this.children = [];
//     }

//     setAttribute(name, value) {  // attribute 
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child) {  // children 
//         this.children.push(child);
//     }

//     render() {
//         return <article>
//             <header>I'm a header</header>
//             {this.slot}
//             <footer>I'm a footer</footer>
//         </article>
//     }

//     mountTo(parent) {
//         this.slot = <div></div>
//         for (let child of this.children) { 
//             this.slot.appendChild(child)
//         }
//         this.render().mountTo(parent)
//     }
// }




// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
// ]} />

// let panel =<Panel title="this is my panel">
//     <span>this is my context</span>
// </Panel>

// let panel =<TabPanel>
//     <span title="title1">this is my context1</span>
//     <span title="title2">this is my context2</span>
//     <span title="title3">this is my context3</span>
//     <span title="title4">this is my context4</span>
// </TabPanel>

// let panel =<CarouselView>
//     <span>this is my context1</span>
//     <span>this is my context2</span>
//     <span>this is my context3</span>
//     <span>this is my context4</span>
// </CarouselView>

let data = [
    { title: '蓝猫1', url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" },
    { title: '蓝猫2', url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg" },
    { title: '蓝猫3', url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg" },
    { title: '蓝猫4', url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" },

]
let list = <ListView data={data}>
    {record => <figure>
        <img src={record.url} />
        <figcaption>{record.title}</figcaption>
    </figure>}
</ListView>

// 1.33
list.mountTo(document.body)
// window.panel = panel;
// let component = <MyComponent>
//     <div>text text text</div>
// </MyComponent>;
// let component = <div>{new Wrapper("span")}</div>;


{/* <div id="a" cls="b" style="width:100px;height:100px;background-color:pink;">
    <div>ext text tex</div> 
    <div>{1}</div>
    <div>{new Wrapper("span")}</div>
</div> */}

// component.id = "c";
// console.log(component);

// 编译后的代码
// var component = createElement(Parent, {
//     id: "a",
//     "class": "b"
// }, createElement(Child, null),
//     createElement(Child, null),
//     createElement(Child, null));
// console.log(component);
