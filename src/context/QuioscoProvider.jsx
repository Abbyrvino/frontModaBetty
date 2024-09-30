import { createContext, useState } from "react";
import { categorias as categoriasDB } from "../data/categorias";
import { toast } from "react-toastify"; // Importar toast

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);

    // Función para manejar el clic en una categoría
    const handleClickCategoria = (id) => {
        const categoria = categorias.find(categoria => categoria.id === id);
        setCategoriaActual(categoria);
    };

    // Función para manejar el modal
    const handleClickModal = () => {
        setModal(!modal);
    };

    // Función para establecer el producto que se va a manejar
    const handleSetProducto = (productoSeleccionado) => {
        setProducto(productoSeleccionado);
    };

    // Función para agregar o actualizar un pedido
    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => 
                pedidoState.id === producto.id ? { ...pedidoState, ...producto } : pedidoState
            );
            setPedido(pedidoActualizado);
            toast.success('Guardado Correctamente');
        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido');
        }
    };

    // Función para editar la cantidad de un producto en el pedido
    const handleEditarCantidad = (id) => {
        const productoActualizar = pedido.find(producto => producto.id === id);
        setProducto(productoActualizar);
        setModal(true); // Cambiado a true para abrir el modal
    };

    // Función para eliminar un producto del pedido
    const handleEliminarProductoPedido = (id) => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Eliminado del Pedido');
    };

    return (
        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            modal,
            handleClickModal,
            producto,
            handleSetProducto,
            pedido,
            handleAgregarPedido,
            handleEditarCantidad,
            handleEliminarProductoPedido,
        }}>
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider };
export default QuioscoContext;