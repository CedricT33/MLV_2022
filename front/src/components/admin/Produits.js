import Produit from "./Produit"

export default function Produits({ produits, setIdProduits }) {
    if (produits === undefined) return null
    return (
        <tbody>
            {produits.map(produit => {
                return <Produit key={produit._id} produit={produit} setIdProduits={setIdProduits} />
            })}
        </tbody>
    );
}