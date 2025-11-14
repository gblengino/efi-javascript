import { useState, useContext } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { updateComment, deleteComment } from "../../services/comment_service";
import CommentForm from "./forms/CommentForm";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Comment({ id, author_id, author, date, content, onUpdate, onDelete}) {

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, token } = useContext(AuthContext)
  
  const canEdit = user && (
    user.user_id === author_id
  )

  const canDelete = user && (
    user.user_id === author_id ||
    user.role === 'moderator' ||
    user.role === 'admin'
  )

  const updateCurrentComment = async (updatedComment) => {
    try {
        setLoading(true)
        const response = await updateComment(updatedComment, token, id)
        toast.success('Comentario editado')
        if (onUpdate) onUpdate(id, updatedComment)
    } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
            setIsEditing(false)
        }
    }

  const deleteCurrentComment = async (id) => {
    try {
        setLoading(true)
        const response = await deleteComment(token, id)
        toast.success('Comentario eliminado')
        if (onDelete) onDelete(id)
    } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

  if (isEditing) {
    return (
      <CommentForm
        initialContent={content}
        onSubmit={updateCurrentComment}
        onCancel={() => {setIsEditing(false)}}
      />
    )
  }

  return (
    <Fieldset legend={author} className="comment mb-5">
      <div className="flex flex-column gap-2">
        <p className="m-0">{content}</p>
        <p
          className="m-0 text-right"
          style={{
            fontSize: "0.8rem",
            color: "#999",
            marginTop: "4px",
          }}
        >
          {date}
        </p>
        <div className="flex gap-3">
        {canEdit && (
          <Button label="Editar" onClick={() => {setIsEditing(true)}}/>
        )}
        {canDelete && (
          <Button label="Eliminar" onClick={() => deleteCurrentComment(id)}/>
        )}
        </div>
      </div>
    </Fieldset>
  );
}
