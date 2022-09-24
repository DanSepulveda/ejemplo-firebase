import { db } from "../config/firebase"
import {getDocs, collection, onSnapshot} from 'firebase/firestore'
import { useEffect, useState } from "react"
import Mensaje from '../components/Mensaje'
import toast, { Toaster } from 'react-hot-toast';

const Mensajes = () => {
    const [mensajes, setMensajes] = useState([])
    const [loading, setLoading] = useState(true)

    const obtenerMensajes = async () => {
        try {
            let response = await getDocs(collection(db, 'mensajes'))
            setMensajes(response.docs)
        } catch (error) {
            toast.error('Ocurrió un problema')
            // redireccionar al usuario a home
        }

        setLoading(false)
    }

    const obtenerConEscucha = async () => {
        onSnapshot(collection(db, 'mensajes'), (result) => {
            setMensajes(result.docs)
        })

    }

    useEffect(() => {
        // obtenerMensajes()
        obtenerConEscucha()
    }, [])

    return (
        <div>
            <Toaster />
            <h1>Tareas {mensajes.length }</h1>
            {loading === true ? <h1>Cargando......</h1> : null}
            <div className="mensajesContainer">
                {mensajes.map(mensaje => <Mensaje key={mensaje.id} datos={mensaje} mensajes={mensajes} setMensajes={setMensajes } />)}
            </div>
        </div>
    )
}

export default Mensajes