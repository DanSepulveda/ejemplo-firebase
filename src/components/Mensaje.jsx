import { db } from "../config/firebase"
import { doc, deleteDoc, setDoc } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from "react"

const Mensaje = (props) => {
    let datos = props.datos.data()
    const { name, email, mensaje } = datos
    const { mensajes, setMensajes } = props
    const [isEditing, setIsEditing] = useState(false)
    const [mensajeAEditar, setMensajeAEditar] = useState({name, email, mensaje})

    const eliminar = async () => {
        try {
            await deleteDoc(doc(db, 'mensajes', props.datos.id))

            let mensajesResultantes = mensajes.filter(mensaje=>mensaje.id!==props.datos.id)
            setMensajes(mensajesResultantes)

            toast.success('Mensaje eliminado')
        } catch (error) {
            toast.error('Ocurrió un problema')
        }
        
    }

    const editar = () => {
        setIsEditing(!isEditing)
    }

    const handlerInput = (e) => {
        setMensajeAEditar({
            ...mensajeAEditar,
            [e.target.name]: e.target.value
        })
    }

    const actualizar = async () => {
        await setDoc(doc(db, 'mensajes', props.datos.id), mensajeAEditar)
        toast.success('Edición correcta')
        setIsEditing(false)
    }

    return (
        <div className="tarjeta">
            <h4>Nombre</h4>
            {
                isEditing === false
                    ? <p>{name}</p>
                    : <input id='name' name='name' value={mensajeAEditar.name} onChange={(e)=>handlerInput(e)}  />
            }
            <h4>Correo</h4>
            {
                isEditing === false
                    ? <p>{email}</p>
                    : <input id='email' name='email' value={mensajeAEditar.email} onChange={(e) => handlerInput(e) } />
            }
            <h4>Mensaje</h4>
                {
                isEditing === false
                    ? <p>{mensaje}</p>
                    : <input id='name' name='mensaje' value={mensajeAEditar.mensaje} onChange={(e) => handlerInput(e)} />
            }
            <button onClick={isEditing===true ? actualizar : editar}>
                {isEditing===false ? 'Editar' : 'Actualizar'}
            </button>

            {
                isEditing===false ? <button onClick={eliminar}>Eliminar</button> : null
            }
        </div>
    )
}

export default Mensaje