import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx' 
import { useContext } from 'react'

export default function LoginForm() {

    const { login } = useContext(AuthContext)

    const validationSchema = Yup.object({
        username: Yup.string().required('El nombre de usuario es obligatorio.'),
        password: Yup.string().required('La contraseña es obligatoria.')
    })

    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        

        const success = await login(values.username, values.password);

        if (success) {
            
            resetForm();
            
            navigate('/'); 
        }
  
    }

    return (
    
        <div className='login-container'>
            
            <h2>Iniciar Sesión</h2>
            
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => ( 
               
                    <Form className='login-form'> 
                        <div className='form-field'>
                            <label>Nombre de Usuario</label> {/* <-- Corregido */}
                            <Field as={InputText} id='username' name='username' />
                            <ErrorMessage name='username' component='small' className='error' />
                        </div>
                        <div className='form-field'>
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password' />
                            <ErrorMessage name='password' component='small' className='error' />
                        </div>
                        <Button 
                            type='submit' 
                            label={isSubmitting ? "Iniciando..." : 'Iniciar Sesión'}
                            disabled={isSubmitting} // 
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}