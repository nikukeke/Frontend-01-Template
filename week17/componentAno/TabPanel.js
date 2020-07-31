

import { createElement, Text, Wrapper } from "./createElement";

import { Timeline, Animation } from "./animation"
import { ease } from "./cubicBezier"



export class TabPanel {
    // 只有一次设置
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    setAttribute(name, value) {  // attribute 
        // this.root.setAttribute(name, value);
        this[name] = value;
    }

    appendChild(child) {  // children 
        this.children.push(child);
    }
    select(i){
        for(let view of this.childViews) {
            view.style.display = 'none';
        }
        this.childViews[i].style.display = "";
    }
    render() {
        return <div class="tab-panel" style="border:solid 1px lightgreen;width:300px;">
                 <h1 style="background-color:lightgreen;width:300px;margin:0;">title</h1>
                 <div>
                     {this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>)}
                 </div>
        </div>;
    }


    mountTo(parent) {
        this.render().mountTo(parent)
    }
}