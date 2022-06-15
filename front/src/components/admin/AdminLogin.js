import { useRef, useState, useEffect } from 'react';
import DataServiceLogin from "../../services/DataServiceLogin";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ServiceLogin = new DataServiceLogin({user, pwd});
        try {
            const reponse = await ServiceLogin.login();
            const accessTocken = reponse?.accessTocken;
            const tockenDecoded = jwtDecode(accessTocken);
            const roles = tockenDecoded?.roles;
            const nom = tockenDecoded?.nom;
            setAuth({ user, pwd, roles, nom, accessTocken});
            navigate("/admin/produits");
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Pas de réponse du serveur...");
            } else if (error.response?.status === 401) {
                setErrMsg("Connexion non autorisée !");
            } else {
                setErrMsg("Problème d'authentification...");
            }
        }
        
    }

    return (
        <section className="d-flex flex-column align-items-center">
            <h1 className="m-5">ADMINISTRATION DU SITE</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                {errMsg}
            </p>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <label htmlFor="username" className="m-2">Identifiant:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password" className="m-2">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button type="submit" className="btn btn-outline-primary m-5">LOGIN</button>
            </form>
        </section>
    );
}