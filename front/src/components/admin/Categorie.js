export default function Categorie({ categorie, setIdCategories }) {

    function onChangeChecked(e) {
        setIdCategories(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={categorie._id} value={categorie._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{categorie.ordre_affichage}</td>
            <td>{categorie.nom}</td>
            <td>{categorie.description}</td>
        </tr>
    );
}