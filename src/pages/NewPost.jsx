import PostForm from "../components/common/forms/PostForm";

export default function NewPost() {
    return(
        <div className="flex-1 h-full flex flex-column align-items-center justify-content-start mt-8">
            <div className="w-6">
                <PostForm method="POST"/>
            </div>
        </div>
    )
}