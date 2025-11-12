import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';

import { useState, useEffect } from 'react';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

import { createPost } from '../../../services/post_service'
import { getCategories } from '../../../services/category_service'

export default function PostForm() {
    const {token} =  useContext(AuthContext)

    const navigate = useNavigate()
    
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch(error) {
                console.error(error)
            }
        }
        fetchCategories()
    }, [])

    const validationSchema = Yup.object({
        title: Yup.string().required('Tu post debe tener un título.'),
        content: Yup.string().required('Tu post debe tener un contenido.'),
        category_ids: Yup.array().min(1, 'Debes seleccionar al menos una categoría.').max(3, 'No puedes seleccionar más de 3 categorías')
    })

    const handleSubmit = async (values, {resetForm}) => {

        const success = await createPost(values, token)

        if (success){
            resetForm();
            navigate('/')
        }

    }

    return (
        <Formik
            initialValues={{ title: "", content:"", category_ids:[]}}
            validationSchema={validationSchema}
            onSubmit={(handleSubmit)}
        >
            {({ values, setFieldValue, isSubmitting }) => ( 
               
                    <Form className='flex-1 flex flex-column gap-5'> 
                        <div className='flex flex-column text-left'>
                            <label>Título</label>
                            <Field as={InputText} id='title' name='title' placeholder="Título de tu post"/>
                            <ErrorMessage name='title' component='small' className='text-red-500' />
                        </div>
                        <div className='flex flex-column text-left'>
                            <label>Contenido</label>
                            <Field as={InputTextarea} id='content' name='content' rows={8} placeholder="Escribe tu post..."/>
                            <ErrorMessage name='content' component='small' className='text-red-500' />
                        </div>
                        <div className='flex flex-column text-left'>
                            <label>Categorías</label>
                            <MultiSelect
                                value={values.category_ids}
                                options={categories}
                                onChange={(e) =>
                                setFieldValue(
                                    "category_ids",
                                    e.value
                                )
                                }
                                optionLabel="name"
                                optionValue="id"
                                filter
                                placeholder="Selecciona categorías"
                                display='chip'
                            />
                            <ErrorMessage name="category_ids" component="small" className='text-red-500' />
                        </div>
                        <Button 
                            type='submit' 
                            label={isSubmitting ? "Creando..." : 'Crear Post'}
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
        </Formik>
    )
    
}