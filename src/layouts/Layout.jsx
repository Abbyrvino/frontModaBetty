import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal'
import Resumen from '../components/Resumen';
import Sider from '../components/Sider';
import Navbar from '../components/Navbar';
import useQuisco from '../hooks/useQuiosco';
import ModalProducto from '../components/modalComponents/ModalProducto';

//OUTLET TE PERMITE QUE SE MUESTRE TU PAGINA DE INICIO AL PRINCIO


const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement('#root')

export default function Layout() {

  const {modal}=useQuisco();
    return (
        <>
        <div className=''>
            <div>
        <Navbar title={"Modas Betty"} />
        </div>

        <div className="md:flex">
            <Sider/>

            <main className='flex-1 h-screen sm:overflow-y-scroll bg-neutral-100 p-3'>{/*aca el el fondo del medio de los productos*/}
            <Outlet/>
            </main>
            <Resumen/>
            
        </div>
        </div>
            <Modal isOpen={modal} style={customStyles}>
              <ModalProducto/>
            </Modal>
           

           <ToastContainer/>

</>
    );
}

