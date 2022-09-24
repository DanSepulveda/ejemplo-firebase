import Input from '../components/Input'
import { useState } from 'react'
import { db } from '../config/firebase'
import {collection, addDoc} from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const [nuevoMensaje, setNuevoMensaje] = useState({})
    const [saving, setSaving] = useState(false)

    const handleInput = (e) => {
        setNuevoMensaje({
            ...nuevoMensaje,
            [e.target.name]: e.target.value
        })
    }

    const guardarMensaje = async (e) => {
        try {
            e.preventDefault()
            setSaving(true)
            await addDoc(collection(db, 'mensajes'), nuevoMensaje)
            setSaving(false)
            toast.success('Mensaje enviado correctamente')
        } catch (error) {
            toast.error("Hubo un problema. Intente más tarde.")
        }
    }

    return (
        <div>
            <h1>Contacto</h1>
            <Toaster />
            <form>
                <Input
                    label='Nombre'
                    id='name'
                    type='text'
                    handleInput={(e)=>handleInput(e)}
                />
                <Input
                    label='Correo'
                    id='email'
                    type='email'
                    handleInput={(e)=>handleInput(e)}
                />
                <label htmlFor="mensaje">Escribe tu mensaje</label>
                <textarea name="mensaje" id="mensaje" cols="30" rows="10" onChange={(e)=>handleInput(e)}>

                </textarea>
                <button onClick={(e) => guardarMensaje(e)} disabled={saving }>
                    Enviar mensaje
                </button>
            </form>
        </div>
    )
}

export default Contact