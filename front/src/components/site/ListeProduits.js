import Produit from "./Produit";

export default function ListeProduits({ produits }) {

  if (produits.length === 0) return <div className="noProduit">Pas de produits dans cette catégorie.</div>

  return (
    <ul>
      {produits.map(produit => {
        return (
          <Produit key={produit._id} produit={produit} />
        )
      })}
    </ul>
  );
}