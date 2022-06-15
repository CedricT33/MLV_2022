import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Categories from "./Categories";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";

export default function AdminCategories() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const Categorie = new DataService("categories");
    const [categories, setCategories] = useState([]);
    const [idCategorie, setIdCategories] = useState('');

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomCategorie + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idCategorie ?
        <Link to={`/admin/categorie/${idCategorie}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idCategorie ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;
    
    const nomCategorie = data?.categories?.find(categorie => categorie._id === idCategorie)?.nom ;

    function supprimerCategorie(id) {
        popin.hide();
        loader.show();
        Categorie.delete(id, auth.accessTocken).then(() => {
            const categories = data?.categories?.slice(); // créé une copie des categories
            const objIndex = categories.findIndex((categorie => categorie._id === id));
            categories.splice(objIndex, 1);
            data.categories = categories;
            setIdCategories(null);
            setCategories(categories);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererCategories() {
        if (data.categories) {
            setCategories(data.categories);
        } else {
            Categorie.getAll().then(categories => {
                data.categories = categories;
                setData(data);
                setCategories(categories);
            })
        }
    }

    useLayoutEffect(() => {
        recupererCategories();
    }, []);

    useEffect(() => {
        console.log("contexte : ", data);
    }, [data, categories]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">CATEGORIES</h1>
            <div>
                <Link to="/admin/categorie" className="btn btn-outline-primary m-4">Ajouter</Link>
                {boutonModifier}
                {boutonSupprimer}
            </div>
            <div className="mt-4 mb-4 w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="table-secondary"></th>
                            <th className="table-secondary">Ordre</th>
                            <th className="table-secondary">Nom</th>
                            <th className="table-secondary">Description</th>
                        </tr>
                    </thead>
                    <Categories categories={categories} setIdCategories={setIdCategories}/>
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
                        <button type="button" className="btn btn-outline-danger" value={idCategorie} onClick={e => supprimerCategorie(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}