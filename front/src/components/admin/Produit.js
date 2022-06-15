export default function Produit({ produit, setIdProduits }) {

    function onChangeChecked(e) {
        setIdProduits(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={produit._id} value={produit._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{produit.ordre_affichage}</td>
            <td>{produit.categorie}</td>
            <td>{produit.type}</td>
            <td>{produit.nom}</td>
            <td>{produit.prixHT} €</td>
            <td>{produit.prixTTC} €</td>
        </tr>
    );
}