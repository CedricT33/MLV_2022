import { useRef } from 'react';
import { useForm } from "react-hook-form";
import EmailService from '../../services/EmailService';
import { patterns, erreurs } from '../constants/ContactConstantes';
import { loader } from "../../services/LoaderService";


export default function SlideContact() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const options = {
    nom: register("nom", {required: true, maxLength: 25, pattern: patterns.texte}),
    prenom: register("prenom", {required: true, maxLength: 25, pattern: patterns.texte}),
    ville: register("ville", {required: true, maxLength: 25, pattern: patterns.texte}),
    tel: register("tel", {required: true, maxLength: 25, pattern: patterns.tel}),
    email: register("email", {required: true, maxLength: 25, pattern: patterns.email}),
    texte: register("texte", {required: true, maxLength: 300, pattern: patterns.message})
  }

  const form = useRef();

  const envoieMail = () => {
    const Email = new EmailService(form);
    loader.show();
    Email.sendMail().then((result) => {
      result ? loader.show(): loader.hide();
    }).catch(() => {
      loader.hide();
    });
  }
  
  const onSubmit = (data) => {
    envoieMail();
  }

  return (
    <div id="Slide4">
      <div className="imagebg"></div>
      <h1><span>Contactez</span>Nous</h1>
      <p className="rdv"><span>R</span>endez-vous sur simple appel téléphonique.</p>
      <div className="tel">
        <div><span>Tél</span> : 03.44.42.35.69</div>
        <div><span>Portable</span> : 06.61.40.30.75</div>
      </div>
      <p className="explications">Pour toutes demandes de devis veuillez utiliser le formulaire de contact, nous téléphoner,
        ou nous envoyer un <a href='mailto:maglv@free.fr'>e-mail</a> (sans oublier vos coordonnées).
      </p>
      <form ref={form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nom" id="label_nom">Nom :</label>
          <input type="text" placeholder="Nom" id="nom" {...options.nom}/>
          {erreurs(errors.nom, "nom", 25)}

          <label htmlFor="prenom" id="label_prenom">Prenom :</label>
          <input type="text" placeholder="Prenom" id="prenom" {...options.prenom}/>
          {erreurs(errors.prenom, "prenom", 25)}

          <label htmlFor="ville" id="label_ville">Ville :</label>
          <input type="text" placeholder="Ville" id="ville" {...options.ville}/>
          {erreurs(errors.ville, "ville", 25)}

          <label htmlFor="tel" id="label_tel">Tel :</label>
          <input type="tel" placeholder="Tel" id="tel" {...options.tel}/>
          {erreurs(errors.tel, "tel")}

          <label htmlFor="email" id="label_email">E-mail :</label>
          <input type="email" placeholder="E-mail" id="email" {...options.email}/>
          {erreurs(errors.email, "email")}
        </div>
        <div>
            <label htmlFor="texte" id="label_texte">Message :</label>
            <textarea placeholder="Message" id="texte" {...options.texte}></textarea>
            {erreurs(errors.texte, "texte", 300)}
        </div>
        <input type="submit" value="Envoyer" id="envoyer" name="envoi"/>
      </form>
    </div>
  );
}