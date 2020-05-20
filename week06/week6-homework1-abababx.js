// 我们如何用状态机处理诸如“abcabx”这样的字符串？

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

function foundB(c) {
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
    if(c === "a") {
        return foundA3;
    } else {
        return start(c);
    }
}

function foundA3(c) {
    if(c === "b") {
        return foundB3;    
    } else {
        return start(c);
    }
}

function foundB3(c) {
    if(c === "x") {
        return end;
    } else {
        return foundB(c);
    }
}

console.log(match("xabababxs"));
console.log(match("xabc"));
console.log(match("xabae"));

// function match(pattern, string) {

// }

// match("ababx", "I an abababx! haha!");
