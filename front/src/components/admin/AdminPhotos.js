import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import PopinService, { popin } from '../../services/PopinService';
import Photos from "./Photos";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';
import { loader } from "../../services/LoaderService";

export default function AdminPhotos() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});
    

    const Photo = new DataService("photos");
    const [photos, setPhotos] = useState([]);
    const [idPhoto, setIdPhotos] = useState('');

    function popinOpen() {
        const donneesPopin = {
            titre: "SUPPRIMER",
            message: "Voulez-vous supprimer " + nomPhoto + " ?"
          }
        const popinSuppr = new PopinService(donneesPopin);
        popinSuppr.show();
    }

    const boutonModifier = idPhoto ?
        <Link to={`/admin/photo/${idPhoto}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idPhoto ?
        <button className="btn btn-outline-danger m-4" onClick={popinOpen}>Supprimer</button>
        : null;
    
    const nomPhoto = data?.photos?.find(photo => photo._id === idPhoto)?.nom ;

    function supprimerPhoto(id) {
        popin.hide();
        loader.show();
        Photo.delete(id, auth.accessTocken).then(() => {
            const photos = data?.photos?.slice(); // créé une copie des photos
            const objIndex = photos.findIndex((photo => photo._id === id));
            photos.splice(objIndex, 1);
            data.photos = photos;
            setIdPhotos(null);
            setPhotos(photos);
        }).finally(() => {
            loader.hide();
        });
    }

    function recupererPhotos() {
        if (data.photos) {
            setPhotos(data.photos);
        } else {
            Photo.getAll().then(photos => {
                data.photos = photos;
                setData(data);
                setPhotos(photos);
            })
        }
    }

    useLayoutEffect(() => {
        recupererPhotos();
    }, []);

    useEffect(() => {
        console.log("contexte : ", data);
    }, [data, photos]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">PHOTOS</h1>
            <div>
                <Link to="/admin/photo" className="btn btn-outline-primary m-4">Ajouter</Link>
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
                            <th className="table-secondary">URL (adresse du lien vers la photo)</th>
                        </tr>
                    </thead>
                    <Photos photos={photos} setIdPhotos={setIdPhotos}/>
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
                        <button type="button" className="btn btn-outline-danger" value={idPhoto} onClick={e => supprimerPhoto(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}