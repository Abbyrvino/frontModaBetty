import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { guardarTokenEnLocalStorage, isAdminToken } from "../utils/authService";
import { saveBitacora } from "../utils/postUtil";
import LoadingOverlay from "./LoadingOverlay";


function Formulario() {
    const [contraseña, setContraseña] = useState("")
    const [usuario, setUsuario] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const  [buttonEnabled, setButtonEnabled] = useState(true)

    const sendAuth = async () => {
        setButtonEnabled(false)
        console.log("Se envió la")
        try {
            const response = await api.post("/auth/login", {
                username: usuario,
                password: contraseña
            })
            if(response.status === 200){
                
                const tokenDelBackend = response.data.token;
                guardarTokenEnLocalStorage(tokenDelBackend);
                isAdminToken(tokenDelBackend)?
                    navigate('/dashboard', {replace: true})
                :
                    navigate('/', {replace: true})
                saveBitacora("Inicio de sesión");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("Error al iniciar sesión", error);
                setErrorMessage(error.response.data);
            }
        } finally {
            setButtonEnabled(true)
        }

    }

   
    
  return (
    
    <form onSubmit={ev=>ev.preventDefault()}>
        
        <input 
            type='text' 
            name='email'
            placeholder='usuario' 
            value={usuario}
            onChange={ev => setUsuario(ev.target.value)}
        />

        <input 
            type='password' 
            name='password'
            placeholder='contraseña' 
            value={contraseña}
            onChange={ev => setContraseña(ev.target.value)}
        />
        <div className="text-red-500 mb-6">{errorMessage}</div> 
        <button className={`bg bg-teal-500 text-white font-bold py-2 px-6 rounded mx-10 
            ${!buttonEnabled ? "cursor-wait" : "hover:bg-teal-700"}`} 
            onClick={()=>sendAuth()} 
            disabled={!buttonEnabled}>
            Enviar
        </button>
        <LoadingOverlay loading={!buttonEnabled} />
    </form>
    
  )
}

export default Formulario
