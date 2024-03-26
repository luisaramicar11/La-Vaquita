import layer from "../assets/img/layer-MC1.svg"
import {NavLink} from "react-router-dom"
import iconPerson from "../assets/img/icon-person.png"
import "./MenuDesktop.css";

export function MenuDesktop(){
    return(
        <div className="container-Logo">
        <div className="big-logo">
        <img src={layer} alt="big logo" />
        <h1>Mi Vaquita</h1>
        </div>
        <div className="big-menu">
    <nav className="big-menu-links">
      <NavLink className={({isActive})=>(isActive)?"active-link":"big-links"} to="/amigos">Amig@s</NavLink>
      <NavLink className={({isActive})=>(isActive)?"active-link":"big-links"} to="/gastos">Gastos</NavLink>
      <NavLink className={({isActive})=>(isActive)?"active-link":"big-links"} to="/grupos">Grupos</NavLink>
    </nav>
    <div className="big-logo-person">
      <img src={iconPerson} alt="icon-person" />
    </div>
    </div>
        </div>
        
    )

}

