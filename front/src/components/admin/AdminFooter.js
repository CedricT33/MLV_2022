import useAuth from "../../hooks/useAuth";

export default function AdminHeader() {
    const { auth } = useAuth();
    const nom = auth.nom;

    return (

        <footer className="footer-admin">Bienvenue {nom}</footer>

    );
}