import emailjs from '@emailjs/browser';
import PopinService from '../services/PopinService';
import {popinOptions} from '../components/constants/PopinConstantes';

export default class EmailService {

    constructor(formulaire) {
        this.formulaire = formulaire;
        this.userID = process.env.REACT_APP_EMAILJS_USER_ID;
        this.templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        this.serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    }

    async sendMail() {
        const loadFinish = false;
        return emailjs.sendForm(this.serviceID, this.templateID, this.formulaire.current, this.userID)
        .then((result) => {
            console.log("Mail envoyé : ", result.text);
            const popinSucces = new PopinService(popinOptions.succes);
            popinSucces.show();
            return loadFinish;
        }, (error) => {
            console.log("Mail error : ", error.text);
            const popinError = new PopinService(popinOptions.error);
            popinError.show();
            return loadFinish;
        });;
    }
}