import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if (!this.slides || !this.slides.length) {
            console.warn('No slides available');
            return;
        }
    
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
    
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
    
        try {
            if (this.hanson) {
                this.hanson.style.opacity = '0';
    
                if (n === 3) {
                    this.hanson.classList.add('animated');
                    setTimeout(() => {
                        this.hanson.style.opacity = '1';
                        this.hanson.classList.add('slideInUp');
                    }, 3000);
                } else {
                    this.hanson.classList.remove('slideInUp');
                }
            }
        } catch (e) {
            console.warn('Error handling hanson animations:', e);
        }
    
        [...this.slides].forEach(slide => {
            slide.style.display = 'none';
        });
    
        this.slides[this.slideIndex - 1].style.display = 'block';
    }
    

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        if (this.btns) {
            this.btns.forEach(item => {
                item.addEventListener('click', () => {
                    this.plusSlides(1);
                });

                item.parentNode?.previousElementSibling?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            });
        }

        this.prev.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        this.next.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {
                console.warn('Error initializing hanson element:', e);
            }

            this.showSlides(this.slideIndex);
            this.bindTriggers();
        } else {
            console.warn('Slider container is not defined or not found');
        }
    }
}
