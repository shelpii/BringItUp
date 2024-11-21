export default class Slider {
    constructor({container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container ? this.container.children : [];
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}
