import {formatPrix} from "../utils/Utils";

export default function Produit({ produit }) {

  const typeProduit = produit.type !== "" ? <span>({produit.type})</span> : null;

  return (
    <>
    <li className="produits">
      <div>{produit.nom} {typeProduit}</div>
      <div className="prix">
        <div>{formatPrix(produit.prixHT)}</div>
        <div>{formatPrix(produit.prixTTC)}</div>
      </div>
    </li>
    </>
  );
}