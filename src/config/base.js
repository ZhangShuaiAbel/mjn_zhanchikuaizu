import FastClick from 'fastclick';

// 移动端300毫秒延迟
const fastclick = function () {
    // if ('addEventListener' in document) {
    //     document.addEventListener('DOMContentLoaded', function() {
    //         FastClick.attach(document.body);
    //     }, false);
    // }

    FastClick.attach(document.body);
}

export {
    fastclick
}