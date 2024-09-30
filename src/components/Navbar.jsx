/*import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus, FaChartBar, FaShoppingCart } from 'react-icons/fa'; // Importa los iconos necesarios
import { Link, useNavigate } from 'react-router-dom';
import { deleteToken } from '../utils/authService';
import { checkAuth } from '../utils/authUtil';
import { saveBitacora } from '../utils/postUtil';
import LoadingOverlay from '../components/LoadingOverlay';
import Modal from 'antd/es/modal/Modal';
import { Badge } from 'antd';
import { useCart } from './test/CartContext';
import Cart from './test/Cart';

const Navbar = ({ title }) => {
  const [authenticated, setAuthenticated] = useState(checkAuth());
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [onWait, setOnWait] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Usar el contexto
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [cartVisible, setCartVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    setOnWait(true);
    await saveBitacora("Cierre de sesión");
    deleteToken();
    setAuthenticated(checkAuth());
    setLogoutModalVisible(false);
    navigate('/', { replace: true });
    setOnWait(false);
  }

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  }

  return (
    <div className=" flex justify-between items-center px-4 py-2   bg-teal-700 text-white sm:font-bold">
      <Link to="/">
        <div className="p-4">
          <img
            className="w-16"
            src="img/logo.svg"
          />
        </div>
      </Link>
      {typeof title === 'string' && title.trim() !== '' && <h1 className="cafeseria-title">{title}</h1>}
      <Modal
        title="Cerrar Sesion"
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        confirmLoading={onWait}
      >
        <p>¿Está seguro que desea cerrar sesion?</p>
      </Modal>
      <div>
        {authenticated ? (
          <div className="flex space-x-4">
            <Link to="/profile" title="Ver perfil"><FaUser /></Link>
            <Link to="/dashboard" title="Ver dashboard"><FaChartBar /></Link>
            <div className="mx-3 text-lg" onClick={() => setCartVisible(true)}>
              <Badge count={cartCount} showZero>
                <FaShoppingCart style={{ color: cartCount > 0 ? 'yellow' : 'white' }} />
              </Badge>
            </div>
            <button onClick={() => setLogoutModalVisible(true)} className="mx-1" title="Cerrar sesión"><FaSignOutAlt /></button>
          </div>
        ) : (
          <>
            <Link to="/login" className="mx-3 text-lg"><FaSignInAlt /></Link>
            <Link to="/register" className="mx-3 text-lg"><FaUserPlus /></Link>
          </>
        )}
      </div>
      <Cart
        isVisible={cartVisible}
        onCancel={() => setCartVisible(false)}
      />

    </div>
  );
}

export default Navbar;*/

import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus, FaChartBar, FaShoppingCart } from 'react-icons/fa'; // Importa los iconos necesarios
import { Link, useNavigate } from 'react-router-dom';
import { deleteToken } from '../utils/authService';
import { checkAuth } from '../utils/authUtil';
import { saveBitacora } from '../utils/postUtil';
import LoadingOverlay from '../components/LoadingOverlay';
import Modal from 'antd/es/modal/Modal';
import { Badge } from 'antd';
import { useCart } from './test/CartContext';
import Cart from './test/Cart';

const Navbar = ({ title }) => {
  const [authenticated, setAuthenticated] = useState(checkAuth());
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [onWait, setOnWait] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Usar el contexto
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [cartVisible, setCartVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    setOnWait(true);
    await saveBitacora("Cierre de sesión");
    deleteToken();
    setAuthenticated(checkAuth());
    setLogoutModalVisible(false);
    navigate('/', { replace: true });
    setOnWait(false);
  }

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  }

  return (/*aca se cambia el color de la parte superior donde dice modas betty modifiqe esto bg-teal-700 */
    <div className=" flex justify-between items-center px-4 py-2  bg-neutral-900 text-white sm:font-bold">
      <Link to="/">
        <div className="p-4">
          <img
            className="w-16"
            src="img/icono1.png"/*aca cambie el logo*/ 
          />
        </div>
      </Link>
      {typeof title === 'string' && title.trim() !== '' && <h1 className="cafeseria-title">{title}</h1>}
      <Modal
        title="Cerrar Sesion"
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        confirmLoading={onWait}
      >
        <p>¿Está seguro que desea cerrar sesion?</p>
      </Modal>
      <div>
        {authenticated ? (
          <div className="flex space-x-4">
            <Link to="/profile" title="Ver perfil"><FaUser /></Link>
            <Link to="/dashboard" title="Ver dashboard"><FaChartBar /></Link>
            <div className="mx-3 text-lg" onClick={() => setCartVisible(true)}>
              <Badge count={cartCount} showZero>
                <FaShoppingCart style={{ color: cartCount > 0 ? 'yellow' : 'white' }} />
              </Badge>
            </div>
            <button onClick={() => setLogoutModalVisible(true)} className="mx-1" title="Cerrar sesión"><FaSignOutAlt /></button>
          </div>
        ) : (
          <>
            <Link to="/login" className="mx-3 text-lg"><FaSignInAlt /></Link>
            <Link to="/register" className="mx-3 text-lg"><FaUserPlus /></Link>
          </>
        )}
      </div>

      {/* Aquí agregamos el botón Ver Catálogo */}
      <Link to="/productos" className="ml-4 px-4 py-2 bg-neutral-400 hover:neutral-200 text-white rounded">
        Ver Catálogo
      </Link>

      <Cart
        isVisible={cartVisible}
        onCancel={() => setCartVisible(false)}
      />
    </div>
  );
}

export default Navbar;
