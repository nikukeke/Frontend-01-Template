let css = require('css')
module.exports = function(source, map) {
    // console.log(source)

    let stylesheet = css.parse(source);
    // console.log(stylesheet)
    // console.log(this.resourcePath)
    let name = this.resourcePath.match(/([^/]+).css$/)[1];
    // console.log(name);

    for (let rule of stylesheet.stylesheet.rules ) {
        rule.selectors = rule.selectors.map(selector => 
            selector.match(new RegExp(`^.${name}`)) ? selector:
            `.${name} ${selector}` 
        );     
        // console.log(rule)
    }
    // console.log(css.stringify(stylesheet))
    // console.log(obj);
    return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}; 
    document.documentElement.appendChild(style);
    
    `;
}