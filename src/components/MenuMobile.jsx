import logo from "../assets/img/Logo.svg"
import iconPerson from "../assets/img/icon-person.png"
import {NavLink, useNavigate} from "react-router-dom"
import "./MenuMobile.css"

export function MenuMobile(){
    const navigate = useNavigate();
    const handleLogOut = async () => {
            localStorage.setItem("token", "");
            localStorage.setItem("id", "");
            navigate("/auth/login");
        };
    return(
        <div className="container-small">
            <div className="container-Logo">
               <div className="small-logo">
                  <img src={logo} alt="small logo" />
                  <h1>Mi Vaquita</h1>
               </div>
               <button onClick={handleLogOut} className="big-logo-person">
          <img src={iconPerson} alt="icon-person" />
        </button>
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