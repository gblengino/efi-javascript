import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../services/api'


const validationSchema = Yup.object({
    username: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Email invalido").required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})


export default function RegisterForm() {

    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                toast.success("Usuario registrado con exito")
                resetForm()
                setTimeout(() => navigate('/'), 2000)
            } else {
                toast.error("Hubo un erro al registrar el usuario")
            }
        } catch (error) {
            toast.error("hubo un error con el servidor", error)
        }
    }

    return (
        <div className='flex flex-column w-full md:w-6 m-5 p-2 text-center'>
            <h2>Crear cuenta</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', role: 'user' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='flex flex-column gap-5'>
                        <div className='flex flex-column text-left'>
                            <label>Nombre</label>
                            <Field as={InputText} id='username' name='username' />
                            <ErrorMessage name='username' component='small' className='text-red-500' />
                        </div>
                        <div className='flex flex-column text-left'>
                            <label>Email</label>
                            <Field as={InputText} id='email' name='email' />
                            <ErrorMessage name='email' component='small' className='text-red-500' />
                        </div>
                        <div className='flex flex-column text-left'>
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password' />
                            <ErrorMessage name='password' component='small' className='text-red-500' />
                        </div>
                        <Button type='submit' label={isSubmitting ? "Registrando..." : 'Registrarse'} />
                    </Form>
                )}
            </Formik>
        </div>
    )

}