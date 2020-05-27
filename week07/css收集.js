document.getElementById("container");
document.getElementById("container").children

document.getElementById("container").children[0]

var result = [];
var lis = document.getElementById("container").children;
for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/)) {
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
        // console.log(li.children[1].innerText);
    }
}
console.log(result);
