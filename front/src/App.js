import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMLV from "./components/admin/AdminMLV";
import AdminProduits from "./components/admin/AdminProduits";
import AdminProduit from "./components/admin/AdminProduit";
import AdminFormules from "./components/admin/AdminFormules";
import AdminFormule from "./components/admin/AdminFormule";
import AdminCategories from "./components/admin/AdminCategories";
import AdminCategorie from "./components/admin/AdminCategorie";
import AdminPhotos from "./components/admin/AdminPhotos";
import AdminPhoto from "./components/admin/AdminPhoto";
import AdminTemoignages from "./components/admin/AdminTemoignages";
import AdminTemoignage from "./components/admin/AdminTemoignage";
import AdminCGs from "./components/admin/AdminCGs";
import AdminCG from "./components/admin/AdminCG";
import AdminUsers from "./components/admin/AdminUsers";
import AdminUser from "./components/admin/AdminUser";
import AdminLogin from "./components/admin/AdminLogin";
import MLV from "./components/site/MLV";
import RequireAuth from "./components/admin/RequireAuth";
import { ROLES } from "./constantes";
// Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.scss';

function NotFound() {
  return <h1>"404 Route Non Paramétrée"</h1>;
}



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MLV />} />
        <Route path="/admin" element={<AdminMLV />}>
          <Route index element={<AdminLogin />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="produits" element={<AdminProduits />} />
            <Route path="produit/:idProduit" element={<AdminProduit />} />
            <Route path="produit" element={<AdminProduit />} />
            <Route path="formules" element={<AdminFormules />} />
            <Route path="formule/:idFormule" element={<AdminFormule />} />
            <Route path="formule" element={<AdminFormule />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categorie/:idCategorie" element={<AdminCategorie />} />
            <Route path="categorie" element={<AdminCategorie />} />
            <Route path="photos" element={<AdminPhotos />} />
            <Route path="photo/:idPhoto" element={<AdminPhoto />} />
            <Route path="photo" element={<AdminPhoto />} />
            <Route path="temoignages" element={<AdminTemoignages />} />
            <Route path="temoignage/:idTemoignage" element={<AdminTemoignage />} />
            <Route path="temoignage" element={<AdminTemoignage />} />
            <Route path="cgs" element={<AdminCGs />} />
            <Route path="cg/:idCg" element={<AdminCG />} />
            <Route path="cg" element={<AdminCG />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.CONCEPTEUR]} />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="user/:idUser" element={<AdminUser />} />
            <Route path="user" element={<AdminUser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
  );
}