// 使用有限状态机处理字符串

// - 在一个字符串中，找到字符"a"
function match(string) {
    for (let c of string) {
        if (c == "a")
            return true;
    }
    return false;
}

match("I am groot");


// - 在一个字符串中，找到字符 "ab"
function match(string) {
    let foundA = false;
    for (let c of string) {
        if (c == "a") {
            foundA = true;
        } else if (foundA && c == "b") {
            return true;
        } else {
            foundA = false;
        }
    }
    return false;
}
console.log(match("I am groot"));
console.log(match("acb"));



// - 在一个字符串中，找到字符 "abcdef" 
function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for (let c of string) {
        if (c == "a") {
            foundA = true;
        } else if (foundA && c == "b") {
            foundB = true;
        } else if (foundB && c == "c") {
            foundC = true;
        } else if (foundC && c == "d") {
            foundD = true;
        } else if (foundD && c == "e") {
            foundE = true;
        } else if (foundE && c == "f") {
            return true;
        } else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}

console.log(match("I abcdot"));


// 每个函数是一个状态
function state(input) {  // 函数参数就是输入
    // 在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next; // 返回值作为下一个状态
}


///////////以下是调用///////////
while(input) {
    // 获取输入
    state = state(input); // 把状态机的返回值作为下一个状态
}