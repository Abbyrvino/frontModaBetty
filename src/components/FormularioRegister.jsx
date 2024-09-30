import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api/axios"
import { guardarTokenEnLocalStorage } from "../utils/authService"
import { saveBitacora } from "../utils/postUtil"
import LoadingOverlay from "./LoadingOverlay"

function FormularioRegister() {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [usuario, setUsuario] = useState('')
    const [buttonEnabled, setButtonEnabled] = useState(true)
    const [error, setError] = useState(null); 
    const [errors, setErrors] = useState({}) 
    const navigate = useNavigate()

    const submitRegister = async (ev) => {
      ev.preventDefault()
      setButtonEnabled(false)
      setError(null); // Reinicia el estado de error al enviar el formulario
      // Validación de contraseña
      if (!formIsValid()) {
          setButtonEnabled(true); // Habilita el botón nuevamente para permitir corrección
          return; // Detiene la ejecución de la función si la validación falla
      }
        try {
            const response = await api.post("/auth/register", {
              username: usuario,
              password: contraseña,
              nombre: nombre,
              email: correo
            });
            guardarTokenEnLocalStorage(response.data.token);
            saveBitacora("Registro de nuevo usuario");
            navigate("/",{ replace: true})
          } catch (error) {
            console.error("Error en la solicitud:", "Dato:", error.response);
          } finally {
            setButtonEnabled(true);
        }
    }

    const formIsValid = () => {
      const newErrors = {};
      if (!nombre.trim()) {
          newErrors.nombre = 'El nombre es requerido';
      }
      if (!usuario.trim()) {
          newErrors.usuario = 'El usuario es requerido';
      }
      if (!correo.trim()) {
          newErrors.correo = 'El correo es requerido';
      } else if (!isValidEmail(correo.trim())) {
          newErrors.correo = 'El correo no tiene un formato válido';
      }
      if (!contraseña.trim()) {
          newErrors.contraseña = 'La contraseña es requerida';
      }else if (contraseña.length < 4) {
          setError('La contraseña debe tener al menos 4 caracteres.');
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  }

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  return (
    <form className="flex flex-col" onSubmit={(ev)=>submitRegister(ev)}>
        
        <input 
            type="text" 
            name="name"
            value={nombre}
            placeholder="Nombre"
            onChange={ev => setNombre(ev.target.value)}
        />
        {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
        <input 
            type="text" 
            name="user"
            value={usuario}
            placeholder="Usuario"
            onChange={ev => setUsuario(ev.target.value)}
        />
        {errors.usuario && <span className="text-red-500">{errors.usuario}</span>}
        <input 
            type="text" 
            name="mail"
            value={correo}
            placeholder="Correo"
            onChange={ev => setCorreo(ev.target.value)}
        />
        {errors.correo && <span className="text-red-500">{errors.correo}</span>}
        <input 
            type="password" 
            name="password"
            value={contraseña}
            placeholder="Contraseña"
            onChange={ev => setContraseña(ev.target.value)}
        />
        {errors.contraseña && <span className="text-red-500">{errors.contraseña}</span>}
        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Botón de registro */}
        <button className={`bg bg-teal-800 text-white font-bold py-2 px-4 rounded mx-6 
            ${!buttonEnabled ? "cursor-not-allowed" : "hover:bg-teal-700"}`} 
            type="submit" disabled={!buttonEnabled}
        >
            Registrarse
        </button>
        <LoadingOverlay loading={!buttonEnabled} />
    </form>
  )
}

export default FormularioRegister
