import User from "./User"

export default function Users({ utilisateurs, setIdUsers }) {
    if (utilisateurs === undefined) return null
    return (
        <tbody>
            {utilisateurs.map(user => {
                return <User key={user._id} user={user} setIdUsers={setIdUsers} />
            })}
        </tbody>
    );
}