import {formatPrix} from "../utils/Utils";

export default function Formule({ formule }) {

  const descriptions = formule.description.split("/").map(description => {
    return <li key={description}>{description}</li>
  });

  return (
    <>
    <li className="formules">
      <div>
        <h3>{formule.nom}</h3>
        <div className="prix">
          <div>{formatPrix(formule.prixHT)}</div>
          <div>{formatPrix(formule.prixTTC)}</div>
        </div>
      </div>
      <ul>{descriptions}</ul>
    </li>
    </>
  );
}