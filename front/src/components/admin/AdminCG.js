import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminCG() {
    const { idCg } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const cg = data?.cgs?.find(cg => { 
        return cg._id === idCg ? cg : null;
    });

    const Cg = new DataService("cgs");

    const ajoutModif = idCg ? "MODIFIER" : "AJOUTER";

    const ordreAffichage = cg ? cg.ordre_affichage :
        data?.cgs?.length > 0 ? data.cgs.length + 1 : 1;

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputTitre = document.getElementById("inputTitre");
        const elmtInputParagraphe = document.getElementById("inputParagraphe");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            titre: elmtInputTitre.value,
            paragraphe: elmtInputParagraphe.value,
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idCg) {
            Cg.update(objetAAjouter, idCg, auth.accessTocken).then(() => {
                const objIndex = data?.cgs?.findIndex((cg => cg._id === idCg));
                data.cgs[objIndex].titre = objetAAjouter.titre;
                data.cgs[objIndex].paragraphe = objetAAjouter.paragraphe;
                data.cgs[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/cgs");
            });
        } else {
            Cg.new(objetAAjouter, auth.accessTocken).then(() => {
                Cg.getAll().then(cgs => {
                    data.cgs = cgs;
                    setData(data);
                    navigate("/admin/cgs");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UNE CONDITION GENERALE`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputTitre" type="text" className="form-control mb-4" placeholder="Titre..." defaultValue={cg?.titre} required/>
                <textarea  rows="10" id="inputParagraphe" type="text" className="form-control mb-4" placeholder="Paragraphe..." defaultValue={cg?.paragraphe} required/>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/cgs`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}