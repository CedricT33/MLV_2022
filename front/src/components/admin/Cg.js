export default function Cg({ cg, setIdCgs }) {

    function onChangeChecked(e) {
        setIdCgs(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={cg._id} value={cg._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{cg.ordre_affichage}</td>
            <td>{cg.titre}</td>
            <td>{cg.paragraphe}</td>
        </tr>
    );
}