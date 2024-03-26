import logo from "../assets/img/Logo.svg"
import iconPerson from "../assets/img/icon-person.png"
import {Link} from "react-router-dom"
import "./MenuMobile.css"

export function MenuMobile(){
    return(
        <div className="container-small">
            <div className="container-Logo">
               <div className="small-logo">
                  <img src={logo} alt="small logo" />
                  <h1>Mi Vaquita</h1>
               </div>
               <div className="small-logo-person">
                  <img src={iconPerson} alt="icon-person" />
               </div>
            </div>
            <div>
            <nav className="small-menu-links">
                <Link className="small-link" to="/amigos">Amigos</Link>
                <Link className="small-link" to="/gastos">Gastos</Link>
                <Link className="small-link" to="/grupos">Grupos</Link>
            </nav>
            </div>
        </div>
    )
}