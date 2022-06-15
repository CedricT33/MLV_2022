import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminFormule() {
    const { idFormule } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const formule = data?.formules?.find(formule => { 
        return formule._id === idFormule ? formule : null;
    });

    const Formule = new DataService("formules");

    const ajoutModif = idFormule ? "MODIFIER" : "AJOUTER";

    const ordreAffichage = formule ? formule.ordre_affichage :
        data?.formules?.length > 0 ? data.formules.length + 1 : 1;

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputDescription = document.getElementById("inputDescription");
        const elmtInputPrixHT = document.getElementById("inputPrixHT");
        const elmtInputPrixTTC = document.getElementById("inputPrixTTC");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            nom: elmtInputNom.value,
            description: elmtInputDescription.value,
            prixHT: parseFloat(elmtInputPrixHT.value.replace(',', '.')),
            prixTTC: parseFloat(elmtInputPrixTTC.value.replace(',', '.')),
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idFormule) {
            Formule.update(objetAAjouter, idFormule, auth.accessTocken).then(() => {
                const objIndex = data?.formules?.findIndex((formule => formule._id === idFormule));
                data.formules[objIndex].nom = objetAAjouter.nom;
                data.formules[objIndex].description = objetAAjouter.description;
                data.formules[objIndex].prixHT = objetAAjouter.prixHT;
                data.formules[objIndex].prixTTC = objetAAjouter.prixTTC;
                data.formules[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/formules");
            });
        } else {
            Formule.new(objetAAjouter, auth.accessTocken).then(() => {
                Formule.getAll().then(formules => {
                    data.formules = formules;
                    setData(data);
                    navigate("/admin/formules");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UNE FORMULE`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom de la formule..." defaultValue={formule?.nom} required/>
                <textarea rows="5" id="inputDescription" type="text" className="form-control mb-4" placeholder="Description..." defaultValue={formule?.description}/>
                <div className="d-flex justify-content-around w-100 mb-4">
                    <div className="input-group me-4">
                        <input id="inputPrixHT" type="text" className="form-control" placeholder="Prix HT..." defaultValue={formule?.prixHT} required/>
                        <span className="input-group-text">€ HT</span>
                    </div>
                    <div className="input-group ms-4">
                        <input id="inputPrixTTC" type="text" className="form-control" placeholder="Prix TTC..." defaultValue={formule?.prixTTC} required/>
                        <span className="input-group-text">€ TTC</span>
                    </div>                   
                </div>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/formules`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}