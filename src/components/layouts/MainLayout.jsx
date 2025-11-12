import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <div className="app-flex flex-column h-full">
            <NavBar/>
            <main className="flex-1 h-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}