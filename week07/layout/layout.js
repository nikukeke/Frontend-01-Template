function getStyle(element) {
    if(!element.style) {
        element.style = {};
    }
    
    for(let prop in element.computedStyle) {
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value; 

        if(element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element) {
    if(!element.computedStyle) {
        return ;
    }
    var elementStyle = getStyle(element);

    if(elementStyle.display !== 'flex') {
        return ;
    }

    var items = element.children.filter( e => e.type === 'element');
    items.sort(function (a, b) {
        return (a.orfer || 0) - (b.order || 0);
    })

    var style = elementStyle;


    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    })

    if(!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    if(!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    if(!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    if(!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    if(!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }
    var mainSize, mainStart, mainEnd, mainSign, mainBase, 
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    if(style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'hight';
        crossStart = 'top';
        crossEnd = 'bottom';
    } 
    if(style.flexDirection = 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'hight';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexWrap === 'wrap-reverse') {
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

    // 父元素没有mainsize属性
    // flex里撑开 子元素之和
    var isAutoMainSize = false;
    if(!style[mainSize]) {  // auto sizing
        elementStyle[mainSize] = 0;
        for(var i = 0; i < items.length; i++) {
            var item = items[i];

            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) { 
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
            
        }
        isAutoMainSize = true;
        // style.flexWrap = 'nowrap';
    }

    // 行 
    var flexLine = [];
    var flexLines = [flexLine];

    // 剩余空间
    var mainSpace = elementStyle[mainSize];
    var crossSpace = 0;

    // 每一行的每一元素
    for(var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        // 如果元素有flex属性， 如果有，就一定能放进去
        if(itemStyle.flex) {
            flexLine.push(item);
        // nowrap 塞到一行里
        } else if (style.flexWrap == 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
                flexLine.push(item);
            }   
        } else {
            // 本身item特别宽，比一行还宽，至少缩到跟这个行一样
            if(itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize];
            }
            // 剩余空间放不下，就要把当前的mainSpace和crossSpace存起来，开启一个新的flexLine
            if(mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                flexLine = [];
                flexLines.push(flexLine);
                flexLine.push(item);
                mainSpace = style[mainSize];
                crossSpace = 0;
                // push进flexLines 重置一下mainSpace和crossSpace
            } else {
                flexLine.push(item);
            }
            // 这行里面的高度，取决于里面最高的项的高度
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    // 完成了分行

    // 计算crossSpace
    if(style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined)? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if(mainSpace < 0) {
        // 先算缩放值
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;
        for(var i = 0; i< items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            // 如果是flex，都是0
            if(itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            // 算主轴尺寸
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        // 如果是多行情况，循环每一行
        flexLines.forEach(function (items) {
            // 先把剩余的宽度取出来
            var mainSpace = items.mainSpace;
            // 按flex分配
            var flexTotal = 0;
            // 找flex总值
            for(var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item);

                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }
            // 有flex元素，大于0。就开始正式的计算
            if(flexTotal > 0) {
                var currentMain = mainBase;
                for(var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var itemStyle = getStyle(item);

                    if(itemStyle.flex) { 
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    // 计算
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                // 没有flex元素
                // step 额外的空间 元素间距

                if(style.justifyContent === 'flex-start') {
                    var currentMain = mainBase;
                    var step = 0;
                }
                // base要加到头上去
                if(style.justifyContent === 'flex-end') {
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'center') {
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'space-between') {
                    var step = mainSpace / (items.length -1) * mainSign;
                    var currentMain = mainBase;
                }
                if(style.justifyContent === 'space-around') {
                    var step = mainSpace / items.length * mainSign;
                    var currentMain = step / 2 + mainBase;
                }
                for(var i = 0; i < items.length; i++) {
                    var item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }

    console.log(items);
    // 计算交叉轴
    // 主要是 align-item align-self
    var crossSpace;
    // 父元素没有交叉轴，就是没高度，撑开
    if(!style[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for(var i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        // crossSpace 就是总高
        // 否则，
        crossSpace = style[crossSize] 
        for(var i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if(style.flexWrap === 'wrap-reverse') {
        crossSize = style[crossSize];
    } else {
        crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;
    
    var step;
    if(style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if(style.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if(style.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length);
        crossBase += crossSign * step / 2;
    }
    if(style.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
    }
    // 每一行里面的，先算每一行 
    // align-self 只会改变自己的，别的不影响/
    flexLines.forEach(function (items) {
        var lineCrossSize = style.alignContent === 'stretch' ?
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace;
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
            }
            if(align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if(align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && 
                    itemStyle[crossSize] !== (void 0) ? itemStyle[crossSize] : lineCrossSize));
                itemStyle[crossSize] = crossSize * (itemStyle[crossEnd] - itemStyle[crossStart])
            } 
        }
        crossBase += crossSign * (lineCrossSize + step);
    }) 
} 
module.exports = layout;
// 评论 
// 我的订单状态
// 我的收藏界面
// 商品图有一个另一尺寸的