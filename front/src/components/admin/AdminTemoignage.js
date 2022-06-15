import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminTemoignage() {
    const { idTemoignage } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const temoignage = data?.temoignages?.find(temoignage => { 
        return temoignage._id === idTemoignage ? temoignage : null;
    });

    const Temoignage = new DataService("temoignages");

    const ajoutModif = idTemoignage ? "MODIFIER" : "AJOUTER";

    const ordreAffichage = temoignage ? temoignage.ordre_affichage :
        data?.temoignages?.length > 0 ? data.temoignages.length + 1 : 1;

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputTexte = document.getElementById("inputTexte");
        const elmtInputUrl = document.getElementById("inputUrl");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            nom: elmtInputNom.value,
            texte: elmtInputTexte.value,
            url_photo: elmtInputUrl.value,
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idTemoignage) {
            Temoignage.update(objetAAjouter, idTemoignage, auth.accessTocken).then(() => {
                const objIndex = data?.temoignages?.findIndex((temoignage => temoignage._id === idTemoignage));
                data.temoignages[objIndex].nom = objetAAjouter.nom;
                data.temoignages[objIndex].texte = objetAAjouter.texte;
                data.temoignages[objIndex].url_photo = objetAAjouter.url_photo;
                data.temoignages[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/temoignages");
            });
        } else {
            Temoignage.new(objetAAjouter, auth.accessTocken).then(() => {
                Temoignage.getAll().then(temoignages => {
                    data.temoignages = temoignages;
                    setData(data);
                    navigate("/admin/temoignages");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UN TEMOIGNAGE`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom..." defaultValue={temoignage?.nom} required/>
                <textarea rows="5" id="inputTexte" type="text" className="form-control mb-4" placeholder="Texte..." defaultValue={temoignage?.texte} required/>
                <input id="inputUrl" type="text" className="form-control mb-4" placeholder="Url photo..." defaultValue={temoignage?.url_photo}/>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/temoignages`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}