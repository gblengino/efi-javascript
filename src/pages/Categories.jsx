import CategoryForm from "../components/common/forms/CategoryForm"

export default function Categories() {
    return (
        <div className="flex-1 h-full flex flex-column align-items-center justify-content-start mt-8">
            <div className="w-6">
                <CategoryForm/>
            </div>
        </div>
    )
}