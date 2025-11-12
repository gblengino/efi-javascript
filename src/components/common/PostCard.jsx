import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import PostComments from './PostComments';
import { useNavigate } from 'react-router-dom';

export default function PostCard({id, title, author, content, date, categories, comments}){

    const navigate = useNavigate()

    const handleViewMore = () =>{
        navigate(`/posts/${id}`)
    }

    return(
        <Card title={title} subTitle={`Por ${author} - ${date}`} className='w-6'>
            <p className='m-0'>{content}</p>
            <Divider/>
            <PostTags tags={categories} />
            <Divider/>
            <PostComments comments={comments} onViewMore={handleViewMore} />
        </Card>
    )
}

function PostTags({tags}){

    if (!tags || tags.length === 0) return (
        <p>Este post no tiene categorias</p>
    )

    return(
        <div className='w-full mt-3'>
            {tags.map((tag, index) => (
                <Tag key={tag.id} value={tag.name} className='w-min' />
            ))}
        </div>
    )
}