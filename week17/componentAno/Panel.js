

import { createElement, Text, Wrapper } from "./createElement";

import { Timeline, Animation } from "./animation"
import { ease } from "./cubicBezier"



export class Panel {
    // 只有一次设置
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) {  // attribute 
        // this.root.setAttribute(name, value);
        this[name] = value;
    }

    appendChild(child) {  // children 
        this.children.push(child);
    }

    render() {
 

        return <div class="tab-panel" style="border:solid 1px lightgreen;width:300px;">
                 <h1 style="background-color:lightgreen;width:300px;margin:0;">{this.title}</h1>
                 <div style="width:300px;min-height:300px;">
                     {this.children}
                 </div>
        </div>;
    }


    mountTo(parent) {
        this.render().mountTo(parent)
    }
}