export default function Photo({ photo, setIdPhotos }) {

    function onChangeChecked(e) {
        setIdPhotos(e.target.value);
    }

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={photo._id} value={photo._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{photo.ordre_affichage}</td>
            <td>{photo.nom}</td>
            <td>{photo.url}</td>
        </tr>
    );
}