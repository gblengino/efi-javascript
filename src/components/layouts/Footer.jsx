import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function Footer() {
    return (
        <footer className="w-100 flex flex-column align-items-center text-center">
            <p>
                &copy; 2025 | Proyecto Miniblog —
                Desarrolado por <strong>Tomás Benavidez</strong>, <strong>Giuliano Blengino</strong> y <strong>Valentino Cambria</strong>
            </p>
            <Divider className="m-3 w-6"/>
            <Button
                label="Ver en Github"
                icon="pi pi-github"
                className="p-button-text p-button-sm w-2 mb-3 mt-0"
                onClick={()=> window.open("https://github.com/gblengino/efi-javascript","_blank")}
            />
        </footer>
    )
}