
// var add = require('../src/add');
// var assert = require('assert');


// let mod =  require("../dist/add.js")  
// const test =  require("ava")  


// import {add} from "../src/add.js";
// import test from "ava";


// let mod = require("../src/add.js");
// let test = require("ava")


let mod = require("../src/add.js");

let assert = require('assert');
let test = require("mocha")

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });

// describe('add', function() {
//   it('add(3,4) shoud be 7 ', function() {
//     // assert.equal(mod.add(3,4), 7);
//     assert.equal();
//   });
// });

// test('foo', t=>{
//   if(mod.add(3,4) === 7)
//     t.pass();
// })

it("should add to numbers from an es module", () => {
  assert.equal(mod.add(3, 5), 8);
})