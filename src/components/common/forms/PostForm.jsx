import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';

import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import { GetData } from '../../../services/get_method';
import { Endpoints } from '../../../utils/constantAPIMethods';
import { createPost, editPost } from '../../../services/post_service';

export default function PostForm({id=null, title = '', content = '', currentCategories = [], method=''}) {
    const {token} =  useContext(AuthContext)

    const navigate = useNavigate()
    
    let currentCategory_ids = []

    if (currentCategories) {
        currentCategory_ids = currentCategories.map((cat) => cat.id)
    }

    const [categories, setCategories] = useState(currentCategories)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await GetData({methodToExecute: Endpoints.GET_CATEGORIES})
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
        if (method === 'POST') {
            const success = await createPost(values, token)

            if (success){
                resetForm();
                navigate('/')
            }

        }

        if (method === 'PUT') {
            const success = await editPost(values, token, id)

            if (success){
                resetForm();
                navigate(`/post/${id}`)
            }

        }

    }

    return (
        <Formik
            initialValues={{ title: title, content: content, category_ids:currentCategory_ids}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                                optionValue='id'
                                filter
                                placeholder="Selecciona categorías"
                                display='chip'
                            />
                            <ErrorMessage name="category_ids" component="small" className='text-red-500' />
                        </div>
                        <Button 
                            type='submit' 
                            label={method==='POST' ? isSubmitting ? "Creando..." : 'Crear Post' : isSubmitting ? "Editando..." : 'Editar Post'}
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
        </Formik>
    )
    
}