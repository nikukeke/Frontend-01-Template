// import { setInterval } from "timers";we

export class Timeline {
    constructor() { 
        this.animations = new Set();
        this.finishedAnimations  = new Set();
        this.addTime = new Map();
        this.requestID = null;
        this.state = "inited";
        this.tick = () => {
            let t = Date.now() - this.startTime;

            // let animations = this.animations.filter(animation => !animation.finished);
            for (let animation of this.animations) {
                // console.log(animation);
                // continue;
                let { object, property, template, start, end, duration, timingFunction, delay } = animation;
                let addTime = this.addTime.get(animation);
                if (t < delay + addTime) 
                    continue;

                let progression = timingFunction((t - delay - addTime) / duration);  // 0-1之间的数
                if (t > duration + delay + addTime) {
                    progression = 1;
                    // animations.finished = true;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation)
                }
             

                // let value = start + progression * (end - start);    
                let value = animation.valueFromProgression(progression); // value就是根据progression算出的当前值

                // console.log(object, property);
                // object[property] = template.timingFunction(start, end)(t - delay);
                object[property] = template(value);
            }
            // if (true || animations.length) {
                // requestAnimationFrame(() => this.tick())
                if(this.animations.size)
                    this.requestID = requestAnimationFrame(this.tick);
                else 
                    this.requestID = null;
            // }
        }
    }
    start(){
        if (this.state != 'inited')
            return;
        this.state = "playing"
        this.startTime = Date.now();
        this.tick();
    }

    resume(){
        if (this.state != 'paused')
            return;
        this.state = "playing"
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }
    pause(){
        if (this.state != 'playing')
            return;
        this.state = "paused"
        this.pauseTime = Date.now();
        if (this.requestID != null) {
            cancelAnimationFrame(this.requestID)
            this.requestID = null;
        }
    }
   
    reset(){
        if (this.state == 'playing')
            this.pause();
        this.animations = new Set;
        this.finishedAnimations= new Set;
        this.addTime = new Map();
        this.requestID = null;
        this.state == 'playing'
        this.startTime = Date.now();
        this.pauseTime = null;
        this.state = 'inited'
    }


    restart(){
        if (this.state == 'playing')
            this.pause();
             
        for(let animation of this.finishedAnimations)
            this.animations.add(animation);
        
        this.finishedAnimations = new Set();
        this.requestID = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add(animation, addTime) {

        this.animations.add(animation);
        // animation.finished = false;

        if (this.state === "playing" && this.requestID === null ) {
            this.tick();
        }
        if (this.state == "playing") {
            this.addTime.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
           
        } else {
            this.addTime.set(animation, addTime !== void 0 ? addTime : 0);
        }
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        // ease linear easeIn 
    }
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start);
    }
}

export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        // ease linear easeIn 
    }
    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}

// // animation是动画

// let animation1 = new Animation(object, property, start, end, duration, delay, timingFunction);
// let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction);


// let timeline = new Timeline;
// // timeline 管理多个动画
// timeline.add(animation1);
// timeline.add(animation2);

// timeline.start();
// timeline.pause();
// timeline.resume();
// timeline.stop();

// setTimeout
// setInterval
// requestAnimationFrame

