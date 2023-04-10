import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Cgs from "./Cgs";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";
import { trierColonne } from "../utils/Utils";

export default function AdminCGs() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const Cg = new DataService("cgs");
    const [cgs, setCgs] = useState([]);
    const [idCg, setIdCgs] = useState('');

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomCg + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idCg ?
        <Link to={`/admin/cg/${idCg}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idCg ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;
    
    const nomCg = data?.cgs?.find(cg => cg._id === idCg)?.titre ;

    function supprimerCg(id) {
        popin.hide();
        loader.show();
        Cg.delete(id, auth.accessTocken).then(() => {
            const cgs = data?.cgs?.slice(); // créé une copie des cgs
            const objIndex = cgs.findIndex((cg => cg._id === id));
            cgs.splice(objIndex, 1);
            data.cgs = cgs;
            setIdCgs(null);
            setCgs(cgs);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererCgs() {
        if (data.cgs) {
            setCgs(data.cgs);
        } else {
            Cg.getAll().then(cgs => {
                data.cgs = cgs;
                setData(data);
                setCgs(cgs);
            })
        }
    }

    useLayoutEffect(() => {
        recupererCgs();
    }, []);

    useEffect(() => {
        console.log("contexte : ", data);
    }, [data, cgs]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">CONDITIONS GENERALES</h1>
            <div>
                <Link to="/admin/cg" className="btn btn-outline-primary m-4">Ajouter</Link>
                {boutonModifier}
                {boutonSupprimer}
            </div>
            <div className="mt-4 mb-4 w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="table-secondary"></th>
                            <th className="table-secondary bouton-classement" onClick={() => trierColonne(cgs, setCgs, "ordre_affichage")}>Ordre</th>
                            <th className="table-secondary">Titre</th>
                            <th className="table-secondary">Paragraphe</th>
                        </tr>
                    </thead>
                    <Cgs cgs={cgs} setIdCgs={setIdCgs}/>
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
                        <button type="button" className="btn btn-outline-danger" value={idCg} onClick={e => supprimerCg(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}