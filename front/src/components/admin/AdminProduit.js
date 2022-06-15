import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useDataContext from '../../hooks/useDataContext';
import DataService from "../../services/DataService";
import useAuth from "../../hooks/useAuth";


export default function AdminProduit() {
    const { idProduit } = useParams();
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    const navigate = useNavigate();

    const produit = data?.produits?.find(produit => { 
        return produit._id === idProduit ? produit : null;
    });

    const Produit = new DataService("produits");

    const ajoutModif = idProduit ? "MODIFIER" : "AJOUTER";

    const optionsCategorie = data?.categories?.map(categorie => {
        if (categorie.nom !== "Formules") {
            return <option key={categorie._id} value={categorie.nom}>{categorie.nom}</option>;
        } else {
            return null;
        }
    });

    const ordreAffichage = produit ? produit.ordre_affichage : 1;

    const onChoixCategorie = (e) => {
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const categorieChoisie = e.target.value;
        if (e.target.value) {
            const produitsCorrespondants = data?.produits.filter(produit => {
                return produit.categorie === categorieChoisie;
            })
            elmtIntOrdre.value = produitsCorrespondants.length + 1;
        }
    }

    const onClickValider = (e) => {
        e.preventDefault();
        const elmtSelectCategorie = document.getElementById("selectCategorie");
        const elmtInputType = document.getElementById("inputType");
        const elmtInputNom = document.getElementById("inputNom");
        const elmtInputPrixHT = document.getElementById("inputPrixHT");
        const elmtInputPrixTTC = document.getElementById("inputPrixTTC");
        const elmtIntOrdre = document.getElementById("inputOrdre");
        const objetAAjouter = {
            nom: elmtInputNom.value,
            categorie: elmtSelectCategorie.value,
            type: elmtInputType.value,
            prixHT: parseFloat(elmtInputPrixHT.value.replace(',', '.')),
            prixTTC: parseFloat(elmtInputPrixTTC.value.replace(',', '.')),
            ordre_affichage: parseInt(elmtIntOrdre.value)
        }
        
        if (idProduit) {
            Produit.update(objetAAjouter, idProduit, auth.accessTocken).then(() => {
                const objIndex = data?.produits?.findIndex((produit => produit._id === idProduit));
                data.produits[objIndex].nom = objetAAjouter.nom;
                data.produits[objIndex].categorie = objetAAjouter.categorie;
                data.produits[objIndex].type = objetAAjouter.type;
                data.produits[objIndex].prixHT = objetAAjouter.prixHT;
                data.produits[objIndex].prixTTC = objetAAjouter.prixTTC;
                data.produits[objIndex].ordre_affichage = objetAAjouter.ordre_affichage;
                setData(data);
                navigate("/admin/produits");
            });
        } else {
            Produit.new(objetAAjouter, auth.accessTocken).then(() => {
                Produit.getAll().then(produits => {
                    data.produits = produits;
                    setData(data);
                    navigate("/admin/produits");
                })
            });
        }
    }

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={onClickValider}>
            <h1 className="m-4">{`${ajoutModif} UN PRODUIT`}</h1>
            <div className="p-4 w-50 d-flex flex-column align-items-center">
                <select id="selectCategorie" className="form-select mb-4" placeholder="Catégories" onChange={onChoixCategorie}
                defaultValue={produit?.categorie} required>
                    <option value="">Catégorie...</option>
                    {optionsCategorie}
                </select>
                <input id="inputType" type="text" className="form-control mb-4" placeholder="Type..." defaultValue={produit?.type}/>
                <input id="inputNom" type="text" className="form-control mb-4" placeholder="Nom du produit..." defaultValue={produit?.nom} required/>
                <div className="d-flex justify-content-around w-100 mb-4">
                    <div className="input-group me-4">
                        <input id="inputPrixHT" type="text" className="form-control" placeholder="Prix HT..." defaultValue={produit?.prixHT} required/>
                        <span className="input-group-text">€ HT</span>
                    </div>
                    <div className="input-group ms-4">
                        <input id="inputPrixTTC" type="text" className="form-control" placeholder="Prix TTC..." defaultValue={produit?.prixTTC} required/>
                        <span className="input-group-text">€ TTC</span>
                    </div>                   
                </div>
                <div className="d-flex mb-4 w-100 justify-content-center">
                      <label htmlFor="inputOrdre" className="d-flex flex-column justify-content-center me-4">Ordre d'affichage :</label>
                      <input id="inputOrdre" type="number" className="form-control w-25" placeholder="0" min="1"
                      defaultValue={ordreAffichage} required/>             
                </div>
                <div>
                    <Link to={`/admin/produits`} className="btn btn-outline-secondary m-4">Annuler</Link>
                    <button type="submit" className="btn btn-outline-primary m-4">Valider</button>
                </div>
            </div>
        </form>
    );
}