import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { DataProvider } from '../../context/DataProvider';
import { Loading } from "../../services/LoaderService";


export default function AdminMLV() {

    return (
        <>
        <main className="d-flex flex-column vh-100">
            <AdminHeader />
            <main className="admin-main bg-light h-100">
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