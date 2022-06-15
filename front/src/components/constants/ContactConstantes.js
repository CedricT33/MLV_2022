export const patterns = {
    texte: /(?!.*[\.\-\_\ ]{2,})^[a-zA-Z0-9áàéèöûúùüç\.\-\_\ ]{1,24}$/i,
    message: /(?!.*[\-\_\ ]{2,})^[a-zA-Z0-9áàéèôöûúùüç%!?€'"@&)(\,\:\;\.\-\_\ \r\n]{1,299}$/gi,
    tel: /^(0033|0|\+33)[1-9]([-. ]?[0-9]{2}){4}/i,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
}

export const erreurs = (error, name,  maxLength) => {
    if (error?.type === 'required') {
      return <span>Ce champs est requis !</span>
    }
    else if (error?.type === 'pattern' && name === "tel") {
      return <span>Ce numéro de téléphone n'est pas valide !</span>
    }
    else if (error?.type === 'pattern' && name === "email") {
      return <span>Cette adresse email n'est pas valide !</span>
    }
    else if (error?.type === 'pattern') {
      return <span>Les caractères spéciaux sont interdits !</span>
    }
    else if (error?.type === 'maxLength') {
      return <span>Ce champs ne peut excéder {maxLength} caractères !</span>
    }
  }