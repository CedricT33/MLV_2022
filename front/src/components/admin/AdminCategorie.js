import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminCategorie() {
    const { idCategorie } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const categorie = data?.categories?.find(categorie => { 
        return categorie._id === idCategorie ? categorie : null;
    });

    const Categorie = new DataService("categories");

    const ajoutModif = idCategorie ? "MODIFIER" : "AJOUTER";

    const ordreAffichage = categorie ? categorie.ordre_affichage :
        data?.categories?.length > 0 ? data.categories.length + 1 : 1;

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputDescription = document.getElementById("inputDescription");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            nom: elmtInputNom.value,
            description: elmtInputDescription.value,
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idCategorie) {
            Categorie.update(objetAAjouter, idCategorie, auth.accessTocken).then(() => {
                const objIndex = data?.categories?.findIndex((categorie => categorie._id === idCategorie));
                data.categories[objIndex].nom = objetAAjouter.nom;
                data.categories[objIndex].description = objetAAjouter.description;
                data.categories[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/categories");
            });
        } else {
            Categorie.new(objetAAjouter, auth.accessTocken).then(() => {
                Categorie.getAll().then(categories => {
                    data.categories = categories;
                    setData(data);
                    navigate("/admin/categories");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UNE CATEGORIE`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom..." defaultValue={categorie?.nom} required/>
                <textarea rows="5" id="inputDescription" type="text" className="form-control mb-4" placeholder="Description..." defaultValue={categorie?.description}/>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/categories`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}