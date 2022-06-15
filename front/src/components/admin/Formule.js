export default function Formule({ formule, setIdFormules }) {

    function onChangeChecked(e) {
        setIdFormules(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={formule._id} value={formule._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{formule.ordre_affichage}</td>
            <td>{formule.nom}</td>
            <td>{formule.description}</td>
            <td>{formule.prixHT} €</td>
            <td>{formule.prixTTC} €</td>
        </tr>
    );
}