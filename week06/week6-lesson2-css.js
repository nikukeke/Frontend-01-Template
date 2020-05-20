var css = require('css');
var obj = css.parse('body { font-size: 12px; }', options);
css.stringify(obj, options);

// type:stylesheet 样式表
// rule:数组 每一个样式对应每一个rule

// 就是AST
// {
//     "type": "stylesheet",       // 整个一个文件样式单
//     "stylesheet": {
//       "rules": [        // 每一条对应每一个规则
//         {
//           "type": "rule",
//           "selectors": [        // 把带逗号的分开，不行带逗号的只有一项
//             "body"
//           ],
//           "declarations": [         
//             {
//               "type": "declaration",    //
//               "property": "background",     //
//               "value": "#eee",      //
//               "position": {
//                 "start": {
//                   "line": 2,
//                   "column": 3
//                 },
//                 "end": {
//                   "line": 2,
//                   "column": 19
//                 }
//               }
//             },
//             {
//               "type": "declaration",
//               "property": "color",
//               "value": "#888",
//               "position": {
//                 "start": {
//                   "line": 3,
//                   "column": 3
//                 },
//                 "end": {
//                   "line": 3,
//                   "column": 14
//                 }
//               }
//             }
//           ],
//           "position": {
//             "start": {
//               "line": 1,
//               "column": 1
//             },
//             "end": {
//               "line": 4,
//               "column": 2
//             }
//           }
//         }
//       ]
//     }
//   }


