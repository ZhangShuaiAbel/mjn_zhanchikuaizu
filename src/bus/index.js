import Vue from 'vue';

const bus = new Vue();

const busType = {
    DEFAULT: "DEFAULT",
    IFRAME: "IFRAME" // iframe 通讯
}

export {
    bus,
    busType
}