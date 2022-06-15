import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Produits from "./Produits";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";

export default function AdminProduits() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const Produit = new DataService("produits");
    const [produits, setProduits] = useState([]);
    const [idProduit, setIdProduits] = useState('');

    const Categorie = new DataService("categories");

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomProduit + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idProduit ?
        <Link to={`/admin/produit/${idProduit}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idProduit ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;

    const nomProduit = data?.produits?.find(produit => produit._id === idProduit)?.nom ;

    function recupererCategories() {
        if (data.categories) {

        } else {
            Categorie.getAll().then(categories => {
                data.categories = categories;
                setData(data);
            })
        }
    }

    function supprimerProduit(id) {
        popin.hide();
        loader.show();
        Produit.delete(id, auth.accessTocken).then(() => {
            const produits = data?.produits?.slice(); // créé une copie des produits
            const objIndex = produits.findIndex((produit => produit._id === id));
            produits.splice(objIndex, 1);
            data.produits = produits;
            setIdProduits(null);
            setProduits(produits);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererProduits() {
        if (data.produits) {
            setProduits(data.produits);
        } else {
            Produit.getAll().then(produits => {
                data.produits = produits;
                setData(data);
                setProduits(produits);
            })
        }
    }

    useLayoutEffect(() => {
        recupererProduits();
        recupererCategories();
    }, []);

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            console.log("datasContext : ", data);
        }
    }, [data, produits]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">PRODUITS</h1>
            <div>
                <Link to="/admin/produit" className="btn btn-outline-primary m-4">Ajouter</Link>
                {boutonModifier}
                {boutonSupprimer}
            </div>
            <div className="mt-4 mb-4 w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="table-secondary"></th>
                            <th className="table-secondary">Ordre</th>
                            <th className="table-secondary">Catégorie</th>
                            <th className="table-secondary">Type</th>
                            <th className="table-secondary">Nom</th>
                            <th className="table-secondary">Prix HT</th>
                            <th className="table-secondary">Prix TTC</th>
                        </tr>
                    </thead>
                    <Produits produits={produits} setIdProduits={setIdProduits}/>
                </table>
            </div>
            <div className="modal fade" id="supprModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="modalLabel">SUPPRIMER</h2>
                        <button type="button" className="btn-close" onClick={popin.hide} aria-label="Fermer"></button>
                    </div>
                    <div className="modal-body">
                        <p>Texte</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={popin.hide}>Fermer</button>
                        <button type="button" className="btn btn-outline-danger" value={idProduit} onClick={e => supprimerProduit(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}