const compile = require("@vue/compiler-sfc");

let output = compile.compileTemplate({
    filename: 'example.vue', source: "<div>Hello world</div>"
})

console.log(output);