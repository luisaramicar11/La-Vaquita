import { useState } from "react";
import layer from "../assets/img/Logo decoration.svg";
import { Link } from "react-router-dom";
export function LoginPage() {
  const [fields, setFields] = useState({ email: "", password: "" });
  /* const [groups, setGroups] = useState([])

    useEffect(()=>{
        const groups=fetch("http://localhost:3000/groups")
        groups.then(
          (res)=>res.json()
          .then(data=>{
            //console.log("response", res);
            //console.log("data", data);
            setGroups(data)
          }),
          (err)=>{
            console.log("request error", err);
          }
        )
      }, []) */

  //console.log(totalRegistros);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(fields);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-type": "application/json",
      },
    });

    if(!response.ok){
      throw new Error("La solicitud no fue exitosa");
    }else
    {
      const token = (await response.json()).token;
      localStorage.setItem("token", token);
      
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
    console.log(fields);
  };

  return (
    <>
      <section className="bg-white my-8">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-4/5 md:h-screen lg:py-0">
          <div className="flex items-center">
            <img className="w-48 h-48 mr-2" src={layer} alt="logo" />
          </div>
          <div>
            <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="custom-text-first-color text-xl font-bold my-6">
                Iniciar sesión
              </h1>
              <form
                className="flex flex-col space-y-4 md:space-y-6 gap-8"
                onSubmit={handleSubmit}
              >
                <div className="w-screen px-12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={fields.email}
                    className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium"
                    placeholder="Correo"
                    required=""
                  />
                </div>
                <div className="w-screen px-12">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    min={8}
                    onChange={handleChange}
                    value={fields.password}
                    placeholder="Contraseña"
                    className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium"
                    required=""
                  />
                </div>
                <div className="flex flex-col  gap-3">
                  <button
                    className="custom-background-first border rounded mx-12 block p-2 text-white font-semibold"
                    type="submit"
                  >
                    Ingresar
                  </button>
                  <button
                    className="bg-white border border-black rounded mx-12 block p-2 custom-text-first-color font-semibold"
                    type="button"
                  >
                    <Link to="/registration">Registrarme</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
