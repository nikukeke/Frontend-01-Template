// var tty = require('tty');
// var ttys = require('ttys');
// // var rl = require('readline'); 

// var stdin = ttys.stdin;
// var stdout = ttys.stdout;
// // console.log("hello");
// // stdout.write("hello  world\n");
// // stdout.write("\033[1A");

// // stdout.write("apollo\n");
// // console.log('aa')

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// async function ask(question) {
//     return new Promise((resolve, reject) => {
//         rl.question(question, (answer) => {
//             // TODO: Log the answer in a database
//             resolve(answer)
//             console.log('aaa')
//             // rl.close();
//         });
//     })
// }

// void async function(){
//     console.log(await ask("your project name?"))
// }


// stdin_test.js
// var stdin = process.openStdin();
// stdin.on('data', function(chunk) { console.log("Got chunk: " + chunk); });

// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

// https://nodejs.org/docs/latest-v13.x/api/readline.html


var stdin = process.stdin;
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline'); 

var stdin = ttys.stdin;
var stdout = ttys.stdout;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );
// on any data into stdin
// stdin.on('data', function (key) {
//     // ctrl-c ( end of text )
//     if (key === '\u0003') {
//         process.exit();
//     }
//     // write the key to stdout all normal like
//     process.stdout.write(key.toString().charCodeAt(0).toString());
// });
 
function getChar(){
    return new Promise(resolve => {
        stdin.once('data', function (key) {
            resolve(key);
        })
    })
}

function up(n = 1){
    stdout.write('\033['+n+'A');
}

function down(n = 1){
    stdout.write('\033['+n+'B');
}

function right(n = 1){
    stdout.write('\033['+n+'C');
}

function left(n = 1){
    stdout.write('\033['+n+'D');
}

void async function() {
    stdout.write('Which framework do you want to use?\n');
    let answer = await select(["vue","react","angular"]); 
    stdout.write('You selected ' + answer + "!!!\n");
    process.exit();
}()

async function select(choices) {
    let selected = 0;
    for(let i = 0 ; i <choices.length; i++) { 
        let choice = choices[i];
        if(i === selected) {
            stdout.write("[\x1B[32mx\x1B[0m] " + choice + "\n");
        } else {
            stdout.write("[ ] " + choice + "\n");
        } 
    }

    up(choices.length);
    right()
    while(true) {
        let char = await getChar(); 
        if(char === "\u0003"){
            process.exit();
            break;
        } 
        if(char === "w" && selected > 0) {
            stdout.write(" ");
            left()
            selected--;
            up();
            stdout.write("\x1B[32mx\x1B[0m");
            left()
        } 
        if(char === "s" && selected < choices.length - 1) {
            stdout.write(" ");
            left()
            selected++;
            down();
            stdout.write("\x1B[32mx\x1B[0m");
            left() 
        }
        if(char === "\r") {

            down(choices.length - selected);
            left() 
            return choices[selected];
        }
    }
}