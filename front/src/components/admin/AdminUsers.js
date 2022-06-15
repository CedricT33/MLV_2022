import React, { useState, useEffect, useLayoutEffect } from "react";
import DataService from "../../services/DataService";
import Users from "./Users";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDataContext from '../../hooks/useDataContext';

export default function AdminUsers() {
    const { auth } = useAuth();
    const { data, setData } = useDataContext({});

    const User = new DataService("users");
    const [users, setUsers] = useState([]);
    const [idUser, setIdUsers] = useState('');

    const boutonModifier = idUser ?
        <Link to={`/admin/user/${idUser}`} className="btn btn-outline-primary m-4">Modifier</Link>
        : null;

    const boutonSupprimer = idUser ?
        <button className="btn btn-outline-danger m-4" data-bs-toggle="modal" data-bs-target="#supprModal">Supprimer</button>
        : null;
    
    const nomUser = data?.users?.find(user => user._id === idUser)?.nom ;

    function supprimerUser(id) {
        User.delete(id, auth.accessTocken).then(() => {
            const users = data?.users?.slice(); // créé une copie des users
            const objIndex = users.findIndex((user => user._id === id));
            users.splice(objIndex, 1);
            data.users = users;
            setUsers(users);
            setIdUsers(null);
        });
    }

    function onSupprimer(id) {
        supprimerUser(id);
    }

    function recupererUsers() {
        if (data.users) {
            setUsers(data.users);
        } else {
            User.getAll().then(users => {
                data.users = users;
                setData(data);
                setUsers(users);
            })
        }
    }

    useLayoutEffect(() => {
        recupererUsers();
    }, []);

    useEffect(() => {
        console.log("contexte : ", data);
    }, [data, users]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="m-4">USERS</h1>
            <div>
                <Link to="/admin/user" className="btn btn-outline-primary m-4">Ajouter</Link>
                {boutonModifier}
                {boutonSupprimer}
            </div>
            <div className="mt-4 w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="table-secondary"></th>
                            <th className="table-secondary">Nom</th>
                            <th className="table-secondary">Identifiant</th>
                            <th className="table-secondary">Rôles</th>
                        </tr>
                    </thead>
                    <Users utilisateurs={users} setIdUsers={setIdUsers}/>
                </table>
            </div>
            <div className="modal fade" id="supprModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="modalLabel">SUPPRIMER</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Voulez-vous supprimer {nomUser} ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-outline-danger" value={idUser} onClick={e => onSupprimer(e.target.value)} data-bs-dismiss="modal">Supprimer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}