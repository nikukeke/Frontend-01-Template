// 监听 识别 分发
// let element = document.body;
function enableGesture(element) {
    let contexts = Object.create(null);
    let MOUSE_SYMBOL = Symbol("mouse");

    if (document.ontouchstart !== null)
        element.addEventListener("mousedown", (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                // console.log(event.clientX, event.clientY);
                move(event, contexts[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseend);
            }
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseend);
        })

    element.addEventListener("touchstart", event => {
        // console.log(event)
        // console.log(event.changedTouches[0]);
        // console.log("start")
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    })
    element.addEventListener("touchmove", event => {
        console.log("move")
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            move(touch, contexts[touch.identifier]);
        }
    })
    element.addEventListener("touchend", event => {
        console.log("end")
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier]
        }
    })
    element.addEventListener("touchcancel", event => {
        console.log("cancel")
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier]
        }
    })
    // touchend 和 touchcancel只触发一个


    // tap
    // pan --- panstart panmove panend
    // flick
    // press --- pressstart pressend
    let start = (point, context) => {

        element.dispatchEvent(Object.assign(new CustomEvent('start'), {
            // element.dispatchEvent(new CustomEvent('start',{
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }))
        context.startX = point.clientX, context.startY = point.clientY;
        context.moves = []
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timoutHandler = setTimeout(() => {
            if (context.isPan)
                return;
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            // console.log("pressstart"); 
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500)
        // console.log("start",point.clientX, point.clientY)
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        // console.log(point.clientX);
        // console.log(context);
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            // console.log("presscancel") 
            element.dispatchEvent(new CustomEvent('presscancel', {}))
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            // console.log("panstart");
            element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                // element.dispatchEvent(new CustomEvent('panstart',{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }))
        }

        // console.log("move", dx, dy)

        if (context.isPan) {

            context.moves.push({
                dx, dy,
                t: Date.now()
            });
            context.moves = context.moves.filter(record => Date.now() - record.t < 300);
            // console.log("pan"); 
            let e = new CustomEvent('pan');
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(e);

        }
    }

    let end = (point, context) => {
        // console.log("end",point.clientX, point.clientY)
        if (context.isPan) {
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            let record = context.moves[0]
            // console.log(context.moves);
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            let isFlick = speed > 2.5
            // console.log(speed);
            if (isFlick) {
                // console.log('flick');
                element.dispatchEvent(new CustomEvent('flick', {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed
                }))
            }
            element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed,
                isFlick: isFlick
            }))
            // console.log("panend");
        }
        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap', {}))
            // console.log("tap");
        }
        if (context.isPress) {
            element.dispatchEvent(new CustomEvent('pressend', {}))
            // console.log("pressend");
        }
        clearTimeout(context.timoutHandler);
    }

    let cancel = (point, context) => {
        // console.log("cancel",point.clientX, point.clientY)
        // console.log("canceled")
        element.dispatchEvent(new CustomEvent('canceled', {}))
        clearTimeout(context.timoutHandler);
    }
}