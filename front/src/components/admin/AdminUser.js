import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminUser() {
    const { idUser } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const user = data?.users?.find(user => { 
        return user._id === idUser ? user : null;
    });

    const User = new DataService("users");

    const ajoutModif = idUser ? "MODIFIER" : "AJOUTER";

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputIdentifiant = document.getElementById("inputIdentifiant");
        const elmtInputPassword = document.getElementById("inputPassword");
        const elmtCheckAdmin = document.getElementById("checkAdmin");
        const elmtCheckConcepteur = document.getElementById("checkConcepteur");
        const roles = [];

        if (elmtCheckAdmin.checked) {
            roles.push("admin");
        }
        if (elmtCheckConcepteur.checked) {
            roles.push("concepteur");
        }

        const objetAAjouter = {
            nom: elmtInputNom.value,
            identifiant: elmtInputIdentifiant.value,
            password: elmtInputPassword.value,
            roles: roles
        }
        
        if (idUser) {
            User.update(objetAAjouter, idUser, auth.accessTocken).then(() => {
                const objIndex = data?.users?.findIndex((user => user._id === idUser));
                data.users[objIndex].nom = objetAAjouter.nom;
                data.users[objIndex].identifiant = objetAAjouter.identifiant;
                data.users[objIndex].roles = objetAAjouter.roles;
                setData(data);
                navigate("/admin/users");
            });
        } else {
            User.new(objetAAjouter, auth.accessTocken).then(() => {
                User.getAll().then(users => {
                    data.users = users;
                    setData(data);
                    navigate("/admin/users");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UN USER`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom..." defaultValue={user?.nom} required/>
                <input  id="inputIdentifiant" type="text" className="form-control mb-4" placeholder="Identifiant..." defaultValue={user?.identifiant} required/>
                <input  id="inputPassword" type="password" className="form-control mb-4" placeholder="Mot de Passe..." required/>
                <div className="d-flex mb-4 w-100 flex-column align-items-center">
                    <h2>Rôles</h2>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="checkAdmin"/>
                        <label className="form-check-label" htmlFor="checkAdmin">
                            ADMIN
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="checkConcepteur"/>
                        <label className="form-check-label" htmlFor="checkConcepteur">
                            CONCEPTEUR (acces users)
                        </label>
                    </div>            
                </div>
                <div>
                    <Link to={`/admin/users`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}