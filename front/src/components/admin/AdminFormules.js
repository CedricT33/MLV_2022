import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Formules from "./Formules";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";
import { trierColonne } from "../utils/Utils";

export default function AdminFormules() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const Formule = new DataService("formules");
    const [formules, setFormules] = useState([]);
    const [idFormule, setIdFormules] = useState('');

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomFormule + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idFormule ?
        <Link to={`/admin/formule/${idFormule}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idFormule ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;

    const nomFormule = data?.formules?.find(formule => formule._id === idFormule)?.nom ;

    function supprimerFormule(id) {
        popin.hide();
        loader.show();
        Formule.delete(id, auth.accessTocken).then(() => {
            const formules = data?.formules?.slice(); // créé une copie des formules
            const objIndex = formules.findIndex((formule => formule._id === id));
            formules.splice(objIndex, 1);
            data.formules = formules;
            setIdFormules(null);
            setFormules(formules);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererFormules() {
        if (data.formules) {
            setFormules(data.formules);
        } else {
            Formule.getAll().then(formules => {
                data.formules = formules;
                setData(data);
                setFormules(formules);
            })
        }
    }

    useLayoutEffect(() => {
        recupererFormules();
    }, []);

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            console.log("datasContext : ", data);
        }
    }, [data, formules]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">FORMULES</h1>
            <div>
                <Link to="/admin/formule" className="btn btn-outline-primary m-4">Ajouter</Link>
                {boutonModifier}
                {boutonSupprimer}
            </div>
            <div className="mt-4 mb-4 w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="table-secondary"></th>
                            <th className="table-secondary bouton-classement" onClick={() => trierColonne(formules, setFormules, "ordre_affichage")}>Ordre</th>
                            <th className="table-secondary">Nom</th>
                            <th className="table-secondary">Description</th>
                            <th className="table-secondary">Prix HT</th>
                            <th className="table-secondary">Prix TTC</th>
                        </tr>
                    </thead>
                    <Formules formules={formules} setIdFormules={setIdFormules}/>
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
                        <button type="button" className="btn btn-outline-danger" value={idFormule} onClick={e => supprimerFormule(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}