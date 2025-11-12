import RegisterForm from '../components/common/forms/RegisterForm';

export default function Register() {

    return (
        <div className="flex-1 h-full flex justify-content-center align-items-center p-auto">
            <div className="w-full md:w-6 flex justify-content-center align-items-center">
                <RegisterForm />
            </div>
        </div>
    )
}