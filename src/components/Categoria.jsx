import useQuisco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
    const { handleClickCategoria, categoriaActual } = useQuisco()
    const { icono, id, nombre } = categoria

    {/*   const resaltarCategoriaActual= () => {
        categoriaActual.id === id? 'bg-amber-400' : 'bg-white'
    }  */}
    return (
        <button/* "bg-white" aca cambio los colores de las categorias}*/
          className={`${categoriaActual.id === id ? "bg-neutral-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-neutral-200 cursor-pointer my-4`}/*m= margen, y = eje y,-#=el tamaña en und tailwin ,1= 4 pix*/
          type="button"
          onClick={() => handleClickCategoria(id)}
        >
          <img
            /*src={`/img/icono_${icono}.svg`}*/
            src={`/img/icono_${icono}.png`}/*aca modifique el fromato de imagen */
            className="w-12"
            alt={`Icono de ${nombre}`}
          />
          <span className="text-lg font-bold truncate">{nombre}</span>
        </button>
      );
}
