import LoginForm from "../components/common/forms/LoginForm";
import { Divider } from 'primereact/divider';
import LinkButton from "../components/ui/LinkButton";

export default function Login() {

    return (
        <div className="flex-1 h-full flex flex-column md:flex-row justify-content-center align-items-center p-8">
            <div className="w-full md:w-6 flex justify-content-center align-items-center">
                <LoginForm />
            </div>
            <Divider layout="vertical" className="hidden md:flex"/>
            <Divider className="flex md:hidden" align="center"/>
            <div className="w-full md:w-6 flex flex-column align-items-center justify-content-center">
                <p>¿No tienes una cuenta?</p>
                <LinkButton
                    to="/register"
                    label="Registrarse"
                    icon="pi pi-user-plus"
                    severity="success"
                />
            </div>
        </div>
    )
}