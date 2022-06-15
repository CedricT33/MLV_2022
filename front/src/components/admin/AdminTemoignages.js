import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Temoignages from "./Temoignages";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";

export default function AdminTemoignages() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const Temoignage = new DataService("temoignages");
    const [temoignages, setTemoignages] = useState([]);
    const [idTemoignage, setIdTemoignages] = useState('');

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomTemoignage + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idTemoignage ?
        <Link to={`/admin/temoignage/${idTemoignage}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idTemoignage ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;
    
    const nomTemoignage = data?.temoignages?.find(temoignage => temoignage._id === idTemoignage)?.nom ;

    function supprimerTemoignage(id) {
        popin.hide();
        loader.show();
        Temoignage.delete(id, auth.accessTocken).then(() => {
            const temoignages = data?.temoignages?.slice(); // créé une copie des temoignages
            const objIndex = temoignages.findIndex((temoignage => temoignage._id === id));
            temoignages.splice(objIndex, 1);
            data.temoignages = temoignages;
            setIdTemoignages(null);
            setTemoignages(temoignages);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererTemoignages() {
        if (data.temoignages) {
            setTemoignages(data.temoignages);
        } else {
            Temoignage.getAll().then(temoignages => {
                data.temoignages = temoignages;
                setData(data);
                setTemoignages(temoignages);
            })
        }
    }

    useLayoutEffect(() => {
        recupererTemoignages();
    }, []);

    useEffect(() => {
        console.log("contexte : ", data);
    }, [data, temoignages]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">TEMOIGNAGES</h1>
            <div>
                <Link to="/admin/temoignage" className="btn btn-outline-primary m-4">Ajouter</Link>
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
                            <th className="table-secondary">Texte</th>
                            <th className="table-secondary">Url Photo</th>
                        </tr>
                    </thead>
                    <Temoignages temoignages={temoignages} setIdTemoignages={setIdTemoignages}/>
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
                        <button type="button" className="btn btn-outline-danger" value={idTemoignage} onClick={e => supprimerTemoignage(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}