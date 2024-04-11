import logo from "../assets/img/Logo.svg"
import iconPerson from "../assets/img/icon-person.png"
import {NavLink} from "react-router-dom"
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
                <NavLink className={({isActive})=>(isActive)?"small-link active-link-small":"small-link"} to="/amigos">Amig@s</NavLink>
                <NavLink className={({isActive})=>(isActive)?"small-link active-link-small":"small-link"} to="/gastos">Gastos</NavLink>
                <NavLink className={({isActive})=>(isActive)?"small-link active-link-small":"small-link"} to="/grupos">Grupos</NavLink>
            </nav>
            </div>
        </div>
    )
}