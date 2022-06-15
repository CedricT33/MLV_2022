import ListeProduits from "./ListeProduits";

export default function SlideProduits({ produits, categorie }) {

  const infoPrix = produits.length !== 0 ? (
    <div id="infoPrix">
      <div>Prix unitaire</div>
      <div>HT</div>
      <div>TTC</div>
    </div>
  ) : null;

  return (
    <div>
      <h2>{categorie.nom}</h2>
      {infoPrix}
      <ListeProduits produits={produits}/>
      <p className="description">{categorie.description}</p>
    </div>
  );
}