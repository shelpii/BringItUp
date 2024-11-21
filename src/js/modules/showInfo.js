export default class ShowInfo {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click' , () => {
               const sibling =  btn.closest('.module__info-show').nextElementSibling;
               
                sibling.classList.add('animated');
                sibling.classList.toggle('msg');
                sibling.classList.toggle('fadeIn');
                sibling.style.marginTop = '20px';

            });
        });
    }
    
    init() {
        this.bindTriggers();
    }
} 