class NewsletterForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.emailInput = this.form.querySelector("#email");
        this.errorMessage = this.form.querySelector(`[data-field="email"]`);
        this.indicator = this.form.querySelector('.progress-indicator');
        this.circles = this.indicator.getElementsByTagName("span");
        this.successDialog = document.querySelector('.card__success');
        this.card = document.querySelector(`.card:has(${formSelector})`);
        this.dismiss = document.getElementById('dismiss');
        this.timer = null;
        this.isDesktop = window.matchMedia('(min-width: 57.5rem)');
        this.isValid = false;
        this.emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.handleInput());
        this.dismiss.addEventListener('click', (e) => {
            this.resetForm();
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateEmail();
        if (this.isValid) {
            this.showSuccess();
        } else {
            this.showError();
        }
    }

    handleInput() {
        clearTimeout(this.timer);
        this.clearError();
        this.toggleIndicator(true);

        this.emailInput.classList.remove('valid', 'invalid');

        this.timer = setTimeout(() => {
            this.validateEmail();
        }, 1050);
    }

    validateEmail() {
        const email = this.emailInput.value.trim();

        if (!email) {
            this.showError("Email field is empty!");
            this.isValid = false;
        } else if (!this.emailRegExp.test(email)) {
            this.showError("Valid email required");
            this.isValid = false;
        } else {
            this.clearError();
            this.isValid = true;
        }

        this.update();
        this.toggleIndicator(false);
    }

    update() {
        this.emailInput.classList.toggle('valid', this.isValid);
        this.emailInput.classList.toggle('invalid', !this.isValid);
    }

    async showError(message) {
        if (!this.errorMessage.classList.contains('hidden')) {
            this.errorMessage.classList.add('animate:wiggle'); 

            await this.delay(500);
            this.errorMessage.classList.remove('animate:wiggle');
        }
        if (message) {
            this.errorMessage.textContent = message;
        }
        this.errorMessage.classList.remove('hidden');
    }

    clearError() {
        this.errorMessage.classList.add('hidden');
    }

    async showSuccess() {

        let zoomDelay = this.isDesktop ? 850 : 425;

        this.clearError();

      

        this.successDialog.querySelector('span').textContent = this.emailInput.value;

        this.card.classList.add('animate:zoom');
        document.querySelector('body').classList.add('overflow');

        await this.delay(zoomDelay);

        this.card.style.display = "none";
        this.successDialog.style.display = "flex";
        this.successDialog.classList.add('subscribed');
        this.successDialog.ariaExpanded = true;
        this.successDialog.showModal();
    }

    toggleIndicator(typing) {
        for (let circle of this.circles) {
            if (typing) {
                circle.classList.add('animate:progress');
            } else {
                circle.classList.remove('animate:progress');
            }
        }
    }

    resetForm() {
        this.form.reset();
        this.emailInput.classList.remove('valid');
        this.isValid = false;

        this.successDialog.classList.remove('subscribed');
        this.successDialog.ariaExpanded = false;
        this.successDialog.classList.add('subscribed--reset');
        this.successDialog.close();
        
        this.successDialog.addEventListener('animationend', async () => {
            this.successDialog.classList.remove('subscribed--reset');
            this.successDialog.style.display = "none";

            this.card.classList.replace('animate:zoom', 'card--reset');
            this.card.style.display = "flex";
            this.card.style.animationPlayState = "running";

            console.log("delay starting");

            await this.delay(1000);

            console.log("delay finished.");

            document.querySelector('body').classList.remove('overflow');
            this.card.classList.remove('card--reset');

        }, { once: true });
      }

      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export default NewsletterForm;