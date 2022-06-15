export default function Temoignage({ temoignage, setIdTemoignages }) {

    function onChangeChecked(e) {
        setIdTemoignages(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={temoignage._id} value={temoignage._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{temoignage.ordre_affichage}</td>
            <td>{temoignage.nom}</td>
            <td>{temoignage.texte}</td>
            <td>{temoignage.url_photo}</td>
        </tr>
    );
}