import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import PostComments from './PostComments';
import LinkButton from '../ui/LinkButton';
import { deletePost } from '../../services/post_service';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function PostCard({id, title, author, content, date, categories, comments, options, onDelete}){
    
    const categories_ids = categories.map((cat) => cat.id)
    const {token} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteCurrentPost = async (id) => {
        try {
            setLoading(true)
            const response = await deletePost(token, id)
            toast.success('Post eliminado')
            if (onDelete) onDelete(id)
        } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <ProgressSpinner />
            </div>
        )
    }

    return(
        <Card title={title} subTitle={`Por ${author} - ${date}`} 
        header={options ?
        <div className='flex h-full justify-content-end gap-4 pt-3 pr-3'>
            <LinkButton to={`posts/edit/${id}`} icon='pi pi-pencil' text/> 
            <LinkButton onClick={() => {deleteCurrentPost(id)}} icon='pi pi-trash' className='p-button-danger'/>
        </div>
        : null} 
        className=' w-10 md:w-6'>
            <p className='m-0'>{content}</p>
            <Divider/>
            <PostTags tags={categories} />
            <Divider/>
            <PostComments postId={id} comments={comments} />
        </Card>
    )
}

function PostTags({tags}){

    if (!tags || tags.length === 0) return (
        <p>Este post no tiene categorias</p>
    )

    return(
        <div className='w-full mt-3 flex gap-3'>
            {tags.map((tag, index) => (
                <Tag key={tag.id} value={tag.name} className='w-min' />
            ))}
        </div>
    )
}