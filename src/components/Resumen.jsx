/*import useQuisco from "../hooks/useQuiosco";
import { useState } from 'react'; 
import { formatearDinero } from "../helpers/index.js";
import RealizarTipoDePago from "./modalComponents/RealizarTipoDePago"; 
import ResumenProducto from "./ResumenProducto"; // Asegúrate de importar el componente

export default function Resumen() {
    const { pedido, total, handleSubmitNuevaOrden } = useQuisco();
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

    const comprobarPedido = () => pedido.length === 0;

    const handleSubmit = e => {
        e.preventDefault();
        if (!comprobarPedido()) {
            setIsModalOpen(true); // Abrir modal al confirmar pedido
        }
    }

    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black">
                Mi Pedido
            </h1>
            <p className="text-lg my-5">
                Aquí podrás ver el resumen y totales de tu pedido
            </p>

            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">
                        No hay elementos en tu pedido aún
                    </p>
                ) : (
                    pedido.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>

            <p className="text-xl mt-10">
                Total: {''}
                {formatearDinero(total)} {/* Formatear el total usando la función y mas abajo cambio el color de fondo de confirmar pedido bg-indigo-100 *//*} 
       /*     </p>

            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 
                            'bg-indigo-400' : 
                            'bg-indigo-600 hover:bg-indigo-800'} 
                            px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
                        value="Confirmar Pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>

            {/* Modal para realizar el tipo de pago *//*}/*
            <RealizarTipoDePago open={isModalOpen} setOpen={setIsModalOpen} /> {/* Modal controlado *//*}
        </aside>
    );
}
*/

import useQuisco from "../hooks/useQuiosco";
import { useState, useEffect } from 'react'; 
import { formatearDinero } from "../helpers/index.js";
import RealizarTipoDePago from "./modalComponents/RealizarTipoDePago"; 
import ResumenProducto from "./ResumenProducto"; // Asegúrate de importar el componente

export default function Resumen() {
    const { pedido, handleSubmitNuevaOrden } = useQuisco();
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
    const [total, setTotal] = useState(0); // Estado para manejar el total

    // Calcular el total de los productos cada vez que el pedido cambie
    useEffect(() => {
        const nuevoTotal = pedido.reduce((suma, producto) => {
            return suma + (producto.precio * producto.cantidad);
        }, 0);
        setTotal(nuevoTotal); // Actualiza el total con la suma de los productos
    }, [pedido]); // Dependencia en pedido para recalcular el total al modificarlo

    const comprobarPedido = () => pedido.length === 0;

    const handleSubmit = e => {
        e.preventDefault();
        if (!comprobarPedido()) {
            setIsModalOpen(true); // Abrir modal al confirmar pedido
        }
    }

    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black">
                Mi Pedido
            </h1>
            <p className="text-lg my-5">
                Aquí podrás ver el resumen y totales de tu pedido
            </p>

            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">
                        No hay elementos en tu pedido aún
                    </p>
                ) : (
                    pedido.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>

            {/* Mostrar la cantidad de productos en el pedido */}
            <p className="text-xl mt-5">
                Total de productos: {pedido.reduce((total, producto) => total + producto.cantidad, 0)} {/* Suma de las cantidades */}
            </p>

            {/* Mostrar el total formateado */}
            <p className="text-xl mt-5">
                Total a pagar: {formatearDinero(total)} {/* Formatear el total usando la función */}
            </p>

            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 
                            'bg-indigo-400' : 
                            'bg-indigo-600 hover:bg-indigo-800'} 
                            px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
                        value="Confirmar Pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>

            {/* Modal para realizar el tipo de pago */}
            <RealizarTipoDePago open={isModalOpen} setOpen={setIsModalOpen} /> {/* Modal controlado */}
        </aside>
    );
}
