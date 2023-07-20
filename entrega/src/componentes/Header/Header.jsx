import './Header.scss'
import { Link } from 'react-router-dom'

export const Header = () => {

    return (
        
        <header className="header">
            <div className="header_container">
            {/* <h1 className="header_logo"> Logo </h1> */}
            <img className="imgLogo" src="/public/marolioLogo.png" alt="El logo" />
            <nav className="navbar">
                <Link className="navbar_link" to="/"> Inicio</Link>
                <Link className="navbar_link" to="/productos/fideos"> Fideos</Link>
                <Link className="navbar_link" to="/productos/legumbres"> Legumbres</Link>
                <Link className="navbar_link" to="/productos/arroz"> Arroz</Link>
                <Link className="navbar_link" to="/productos/aceite"> Aceite</Link>

            </nav>
            
            </div>
        </header>
        
    )
}