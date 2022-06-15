export default class PopinService {

    constructor(options) {
        this.titre = options?.titre || "Titre";
        this.message = options?.message || "Message";
        this.boutonClose = options?.boutons?.boutonClose || {titre: "Fermer"};
        this.boutonAutre = options?.boutons?.boutonAutre;
    }

    show() {
        const elmtPopin = document.querySelector(".modal");
        const elmtPopinTitre = document.querySelector(".modal-title");
        const elmtPopinMessage = document.querySelector(".modal-body > p");
        const elmtPopinFooter = document.querySelector(".modal-footer");
        const elmtPopinBouton = document.querySelector(".modal-footer > button");
        const elmtPopinContent = document.querySelector(".modal-content");

        if (this.boutonAutre) {
            const newElmtBouton = document.createElement('button');
            newElmtBouton.setAttribute('type', "button");
            newElmtBouton.className = "btn btn-outline-danger";
            newElmtBouton.setAttribute('value', this.boutonAutre.value);
            newElmtBouton.setAttribute('onClick', this.boutonAutre.fonction);
            newElmtBouton.innerText = this.boutonAutre.titre;
            elmtPopinFooter.appendChild(newElmtBouton);
        }

        elmtPopinTitre.innerText = this.titre;
        elmtPopinMessage.innerText = this.message;
        elmtPopinBouton.innerText = this.boutonClose.titre;

        setTimeout(() => {
            elmtPopinContent.classList.add('open');
        }, 100);

        elmtPopin.classList.add('open');
    }

    hide() {
        const elmtPopin = document.querySelector(".modal");
        const elmtPopinContent = document.querySelector(".modal-content");

        setTimeout(() => {
            elmtPopin.classList.remove('open');
        }, 100);
        
        elmtPopinContent.classList.remove('open');
    }
}

export const popin = new PopinService();

export function Popin() {

    const hidePopin = () => {
        const elmtPopin = document.querySelector(".modal");
        const elmtPopinContent = document.querySelector(".modal-content");

        setTimeout(() => {
            elmtPopin.classList.remove('open');
        }, 100);
        
        elmtPopinContent.classList.remove('open');
    }

    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">titre</h5>
                        <button type="button" className="btn-close" onClick={hidePopin} aria-label="Fermer"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={hidePopin}>Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}