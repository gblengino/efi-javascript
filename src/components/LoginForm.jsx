import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export default function LoginForm() {

    const {login} = useContext(AuthContext)

    const validationSchema = Yup.object({
        username: Yup.string().required('El nombre de usuario es obligatorio.'),
        password: Yup.string().required('La contraseña es obligatoria.')
    })

    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch('http://18.223.136.198:5000/api/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                toast.success("Iniciaste sesión con exito")
                resetForm()
                setTimeout(() => navigate('/'), 1000)
            } else {
                toast.error("Hubo un error al iniciar sesión.")
            }
        } catch (error) {
            toast.error("hubo un error con el servidor", error)
        }
    }

    return (
        <div className='register-container'>
            <h2>Crear cuenta</h2>
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='register-form'>
                        <div className='form-field'>
                            <label>Nombre</label>
                            <Field as={InputText} id='username' name='username' />
                            <ErrorMessage name='username' component='small' className='error' />
                        </div>
                        <div className='form-field'>
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password' />
                            <ErrorMessage name='password' component='small' className='error' />
                        </div>
                        <Button type='submit' label={isSubmitting ? "Registrando..." : 'Registrarse'} />
                    </Form>
                )}
            </Formik>
        </div>
    )

}