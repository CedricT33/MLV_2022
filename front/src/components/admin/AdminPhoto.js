import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminPhoto() {
    const { idPhoto } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const photo = data?.photos?.find(photo => { 
        return photo._id === idPhoto ? photo : null;
    });

    const Photo = new DataService("photos");

    const ajoutModif = idPhoto ? "MODIFIER" : "AJOUTER";

    const ordreAffichage = photo ? photo.ordre_affichage :
        data?.photos?.length > 0 ? data.photos.length + 1 : 1;

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputUrl = document.getElementById("inputUrl");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            nom: elmtInputNom.value,
            url: elmtInputUrl.value,
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idPhoto) {
            Photo.update(objetAAjouter, idPhoto, auth.accessTocken).then(() => {
                const objIndex = data?.photos?.findIndex((photo => photo._id === idPhoto));
                data.photos[objIndex].nom = objetAAjouter.nom;
                data.photos[objIndex].url = objetAAjouter.url;
                data.photos[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/photos");
            });
        } else {
            Photo.new(objetAAjouter, auth.accessTocken).then(() => {
                Photo.getAll().then(photos => {
                    data.photos = photos;
                    setData(data);
                    navigate("/admin/photos");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UNE PHOTO`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom..." defaultValue={photo?.nom}/>
                <input  id="inputUrl" type="text" className="form-control mb-4" placeholder="URL..." defaultValue={photo?.url}/>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/photos`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}