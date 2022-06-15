import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminHeader() {
    const { auth } = useAuth();

    const userLink = auth?.roles?.includes("concepteur")
                    ? <Link to="/admin/users"><li>Users</li></Link>
                    : null;

    return (
        <nav>
            <Link to="/"><div className="logo">Magali Location Vaisselle</div></Link>
            <ul className="nav-links">
                {userLink}
                <Link to="/admin/produits"><li>Produits</li></Link>
                <Link to="/admin/formules"><li>Formules</li></Link>
                <Link to="/admin/categories"><li>Categories</li></Link>
                <Link to="/admin/photos"><li>Photos</li></Link>
                <Link to="/admin/temoignages"><li>Témoignage</li></Link>
                <Link to="/admin/cgs"><li>CG</li></Link>
            </ul>
        </nav>
    );
}