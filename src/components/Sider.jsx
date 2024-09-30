import useQuisco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

export default function Sider() {

    const {categorias}=useQuisco()


    return(
        <aside className="md:w-72"> 
      {/*  <div className="p-4">
            <img 
            className="w-40"
            src="img/logo.svg"
            />

         </div>      */ } 
        
        <div className="mt-10">
            {categorias.map(categoria => (
                <Categoria
                key={categoria.id}
                   categoria={categoria}
                
                /> 
            ))}

        </div>
        
        <div className="my-5 py-5">
            <button 
             type="button"
            className="  bg-red-600 text-center w-full p-3 font-bold text-white truncate" 
            
            
           >
                Cancelar Orden

            </button>

        </div>
        </aside>
    )
}