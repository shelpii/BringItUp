import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        [...this.slides].forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                const title = slide.querySelector('.card__title');
                const arrow = slide.querySelector('.card__controls-arrow');
                if (title) title.style.opacity = '0.4';
                if (arrow) arrow.style.opacity = '0';
            }
        });
    
        const firstSlide = this.slides[0];
        if (!firstSlide.closest('button')) {
            firstSlide.classList.add(this.activeClass);
        }
    
        if (this.animate && firstSlide) {
            const title = firstSlide.querySelector('.card__title');
            const arrow = firstSlide.querySelector('.card__controls-arrow');
            if (title) title.style.opacity = '1';
            if (arrow) arrow.style.opacity = '1';
        }
    }
    
    nextSlide() {
        const slidesToRearrange = [this.slides[0]];
    
        if (this.slides[1]?.tagName === 'BUTTON') {
            slidesToRearrange.push(this.slides[1]);
        }
        if (this.slides[2]?.tagName === 'BUTTON') {
            slidesToRearrange.push(this.slides[2]);
        }
    
        slidesToRearrange.forEach(slide => this.container.appendChild(slide));
        this.decorizeSlides();
    }
    
    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());
    
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    const active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }

    resumeAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    bindHoverEvents() {
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.next.addEventListener('mouseenter', () => this.stopAutoplay());
        this.prev.addEventListener('mouseenter', () => this.stopAutoplay());

        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        this.next.addEventListener('mouseleave', () => this.resumeAutoplay());
        this.prev.addEventListener('mouseleave', () => this.resumeAutoplay());
    }
    
 
    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();
            this.bindHoverEvents();

            if (this.autoplay) {
                this.resumeAutoplay(); 
            }
        } catch(e) {}
    }

}