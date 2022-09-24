import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <NavLink to='/'>Inicio</NavLink>
            <NavLink to='/contacto'>Contacto</NavLink>
            <NavLink to='/mensajes'>Mensajes</NavLink>
        </nav>
    )
}

export default Navbar