function reverseChildren(element) {
    var range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    var l = fragment.childNodes.length;
    while(l-->0) {
        fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
}
reverseChildren(element);

// 海量重排，精确操作