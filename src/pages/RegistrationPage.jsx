import { useState } from "react"
import layer from "../assets/img/Logo decoration.svg"
import { useNavigate } from "react-router-dom";

export function Registration(){
  const [fields, setFields] = useState({email:"", password:""})
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };  
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Validate name
    if (fields.name.trim() === "") {
      setNameError("Ingrese su nombre");
      return;
    }

    // Validate email format
    if (!validateEmailFormat(fields.email)) {
      setEmailError("Ingrese un correo válido");
      return;
    }

    // Validate password length and format
    if (fields.password.length < 8 || !validatePassword(fields.password)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra y un carácter especial");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/create", {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "User already exists") {
          setEmailError("Este correo ya está registrado");
        } else {
          setEmailError("Error al registrar el usuario");
        }
      } else {
        const token = (await response.json()).token;
        localStorage.setItem("token", token);
        navigate("/grupos"); // Redirige al usuario a la página principal después del registro exitoso
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setEmailError("Error al conectar con el servidor");
    }
  };
  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
    setNameError(""); // Limpiar mensaje de error al cambiar los campos
    setEmailError(""); // Limpiar mensaje de error al cambiar los campos
    setPasswordError(""); // Limpiar mensaje de error al cambiar los campos
  };
 
    return(
      <>
      <section className="bg-white my-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-4/5 md:h-screen lg:py-0">
      <div className="flex items-center">
              <img className="w-48 h-48 mr-2" src={layer} alt="logo"/>   
          </div>
          <div>
              <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="custom-text-first-color text-xl font-bold my-6">
                      Registro
                  </h1>
                  <form className="flex flex-col space-y-4 md:space-y-6 gap-8" onSubmit={handleSubmit}>
                  <div className="w-screen px-12">
                          <input type="text" name="name" id="name" onChange={handleChange} value={fields.name} className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium" placeholder="Nombre" required=""/>
                          {nameError && (
                    <p className="text-red-500 mt-1">{nameError}</p>
                  )}
                      </div>
                      <div className="w-screen px-12">
                          <input type="email" name="email" id="email" onChange={handleChange} value={fields.email} className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium" placeholder="Correo Electrónico" required=""/>
                          {emailError && (
                    <p className="text-red-500 mt-1">{emailError}</p>
                  )}
                      </div>
                      <div className="w-screen px-12">
                          <input type="password" name="password" id="password" min={8} onChange={handleChange} value={fields.password} placeholder="Contraseña" className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium" required=""/>
                          {passwordError && (
                    <p className="text-red-500 mt-1">{passwordError}</p>
                  )}
                      </div>
                      <div className="flex flex-col  gap-3">
                      <button className="custom-background-first border rounded mx-12 block p-2 text-white font-semibold" type="submit">Registrarme</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </section>
      </>
      

    )
}