import PostForm from "../components/common/forms/PostForm";
import { useParams } from "react-router-dom";
import { GetData } from "../services/get_method";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Endpoints } from "../utils/constantAPIMethods";
import { toast } from "react-toastify";


export default function EditPost() {

    const {id} = useParams()
    const [target_post, setTarget_post] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
                const fetchPosts = async () => {
                    try {
                        setLoading(true);
                        const response = await GetData({ methodToExecute: Endpoints.GET_POST_BY_ID, id });
                        
                        setTarget_post(response);
                        
                    } catch (err) {
                        setError(err.message);
                        toast.error(err.message);
                    } finally {
                        setLoading(false);
                    }
                };
    
                fetchPosts();
            }, []);

     if (loading) {
            
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <ProgressSpinner />
                </div>
            );
        } 

    return(
        
        <div className="flex-1 h-full flex flex-column align-items-center justify-content-start mt-8">
            <div className="w-6">
                <PostForm id={id} title={target_post.title} content={target_post.content} currentCategories={target_post.categories} method='PUT'/>
            </div>
        </div>
    )
}