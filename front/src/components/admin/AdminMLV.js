import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { DataProvider } from '../../context/DataProvider';
import { Loading } from "../../services/LoaderService";


export default function AdminMLV() {

    return (
        <>
        <main className="d-flex flex-column vh-100 bg-light">
            <AdminHeader />
            <main className="admin-main bg-light">
                <DataProvider >
                    <Outlet />
                </DataProvider>
            </main>
            <AdminFooter />
        </main>
        <Loading/>
        </>
    );
}