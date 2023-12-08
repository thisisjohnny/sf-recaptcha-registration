import { LightningElement } from 'lwc';

export default class RecaptchaRegistration extends LightningElement {
    // registration information
    firstName;
    lastName;
    emailAddress;

    // recaptcha vars
    showMessage = false;
    verifyReCaptcha = false;

    connectedCallback() {
        document.addEventListener("grecaptchaVerified", (e) => {
            if (e.detail.response != null) {
                this.showMessage = false;
                this.handleReCaptcha();
            }
        });
    }

    handleReCaptcha() {
        this.verifyReCaptcha = true;
    }

    renderedCallback() {
        var divElement = this.template.querySelector('div.recaptchaElement');
        var payload = {element: divElement, badge: 'bottomright'};
        document.dispatchEvent(new CustomEvent("grecaptchaRender", {"detail": payload}));
    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleRegistration(event) {
        // verify required fields are provided
        const allFieldsValid = [
            ...this.template.querySelectorAll('lighning-input'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if (allFieldsValid) {
            // validate reCaptcha
            if (this.verifyReCaptcha) {
                // complete user registration
                // would call on a custom apex controller to handle creation
            }
            else {
                this.showMessage = true;
            }
        }
        else {
            alert('Please ensure all required fields are provided.')
        }
    }
}