import { useState } from "react";
import layer from "../assets/img/Logo decoration.svg";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (!validateEmail(fields.email)) {
      setEmailError("Ingrese un correo válido");
      return;
    }
    console.log(fields);

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "User not found") {
        setEmailError("El correo no existe");
      } else if (errorData.message === "Invalid password") {
        setPasswordError("Contraseña inválida");
      } else {
        setEmailError("Error al iniciar sesión");
      }
    } else {
      const token = await response.json();
      localStorage.setItem("token", token.token);
      localStorage.setItem("id", token.id);
      console.log("este es el id", token.id);
      navigate("/grupos");
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
    console.log(fields);
    setEmailError("");
    setPasswordError("");
  };

  return (
    <>
      <section className="bg-white my-8">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0">
          <div className="flex items-center">
            <img className="w-48 h-48 mr-2" src={layer} alt="logo" />
          </div>
          <div className="w-full md:w-3/4 md:h-4/5 lg:w-3/4 lg:h-4/5 flex flex-col items-center justify-center">
            <div className="w-full md:w-4/5 lg:w-7/10 h-auto flex flex-col items-center justify-center p-6 sm:p-8">
              <h1 className="custom-text-first-color text-xl font-bold my-6">
                Iniciar sesión
              </h1>
              <form className="flex flex-col space-y-4 md:space-y-6 gap-8 w-full" onSubmit={handleSubmit}>
                <div className="w-full px-12">
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
                  {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
                </div>
                <div className="w-full px-12">
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
                  {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
                </div>
                <div className="flex flex-col gap-3 w-full px-12">
                  <button
                    className="custom-background-first border rounded block p-2 text-white font-semibold"
                    type="submit"
                  >
                    Ingresar
                  </button>
                  <button
                    className="bg-white border border-black rounded block p-2 custom-text-first-color font-semibold"
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


