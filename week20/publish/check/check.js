// console.log('Hello, world!');
// phantom.exit();

var page = require('webpage').create();
page.open('http://localhost:8081/', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    var body = page.evaluate(function() {
        var toString = function(pad, element) {
          var children = element.childNodes;
          var childrenString = '';
          for(var i = 0; i <children.length; i++) {
            childrenString += toString("   " +pad, children[i]) + "\n";
          }
          // var name = element.tagName || element.content;
          var name ;
          if(element.nodeType === Node.TEXT_NODE) {
            name = "#text  " + JSON.stringify(element.textContent);
          }
          if(element.nodeType === Node.ELEMENT_NODE) {
            name = element.tagName;
          }


          return pad + name + (childrenString? "\n" + childrenString : "") ;
        }
        // console.log(document.body)
        // return document.body.tagName;
        // return "abc";
        // return document.body.tagName;
        return toString("", document.body);

      });
      console.log(body)
  }
  phantom.exit();
});