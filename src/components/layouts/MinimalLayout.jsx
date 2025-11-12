import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MinimalLayout() {
    return (
        <div className="flex flex-column h-full">
            <main className="flex-1 h-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}