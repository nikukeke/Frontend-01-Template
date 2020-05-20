// 我们如何用状态机处理诸如“abcabx”这样的字符串？
// 严格的状态不允许写state(c)
function match(string) {
    let state = start;
    for (let c of string) {
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

function end(c) {
    return end;
}

function foundA(c) {
    if(c === "b"){
        return foundB;
    } else {
        return start(c);
    }
}

function foundB(c) {
    if(c === "c"){
        // return foundC;
        return end;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if(c === "d"){
        return foundD;
    } else {
        return start(c);
    }
}

function foundD(c) {
    if(c === "e"){
        return foundE;
    } else {
        return start(c);
    }
}

function foundE(c) {
    if(c === "f"){
        return end;
    } else {
        return start(c);
    }
}

console.log(match("I am grabcdefgoot"))
console.log(match("aabcc"))


// 我们如何用状态机处理诸如“abcabx”这样的字符串？