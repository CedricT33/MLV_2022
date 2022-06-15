export default function User({ user, setIdUsers }) {

    function onChangeChecked(e) {
        setIdUsers(e.target.value);
    }

    const roles = user.roles.join(' + ');

    return (
        <tr>
            <th><input className="form-check-input" type="radio" name="radios" id={user._id} value={user._id}
            onChange={e => onChangeChecked(e)}/></th>
            <td>{user.nom}</td>
            <td>{user.identifiant}</td>
            <td>{roles}</td>
        </tr>
    );
}