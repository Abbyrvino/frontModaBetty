import React, { useState } from "react";
import { FaUsersCog, FaBoxOpen, FaShoppingCart, FaCoffee } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import { deleteToken } from '../utils/authService';
import { saveBitacora } from '../utils/postUtil';

const SidebarItem = ({ icon: Icon, label, items, section, expanded, toggleExpand }) => (
    <li className="mb-2 rounded hover:shadow hover:bg-teal-800 py-2">
        <div className="px-3 h-full flex items-center cursor-pointer" onClick={() => toggleExpand(section)}>
            <Icon className='inline-block w-6 h-6 mr-2' /> {label}
        </div>
        {expanded && (
            <ul className="ml-4 mt-2">
                {items.map((item, index) => (
                    <li key={index} className="mb-2 rounded hover:shadow hover:bg-teal-700 py-2">
                        {item.onClick ? (
                            <div className="px-3 h-full flex items-center cursor-pointer" onClick={item.onClick}>
                                {item.label}
                            </div>
                        ) : (
                            <NavLink to={item.to} className="px-3 h-full flex items-center">
                                {item.label}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        )}
    </li>
);

const Sidebar = () => {
    const navigate = useNavigate();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [expanded, setExpanded] = useState({
        users: false,
        product: false,
        inventory: false,
        sales: false,
    });

    const handleLogoutConfirm = async () => {
        deleteToken();
        setLogoutModalVisible(false);
        navigate('/', { replace: true });
        await saveBitacora("Cierre de sesión");
    }

    const handleLogoutCancel = () => {
        setLogoutModalVisible(false);
    }

    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className='w-full bg-teal-900 component-over-scroll'>
            <hr />
            <div>
                <h1 className="font-pacifico text-2xl text-amber-500 font-bold text-center">OPCIONES</h1>
            </div>
            <hr />
            <ul className="mt-3 text-white font-bold">
                <SidebarItem
                    icon={FaUsersCog}
                    label="Usuarios"
                    section="users"
                    expanded={expanded.users}
                    toggleExpand={toggleExpand}
                    items={[
                        { label: 'Administrar inicio de sesión', to: '/login' },
                        //{ label: 'CU14. Registrar usuario', to: '/register' },
                        { label: 'Gestionar usuario', to: '/dashboard/users' },
                        //{ label: 'CU07. Gestionar perfil de usuario', to: '/profile' },
                        { label: 'Gestionar roles', to: '/dashboard/roles' },
                        { label: 'Asignar permisos', to: '/dashboard/permissions' },
                        { label: 'Administrar Bitácora', to: '/dashboard/bitacora' },
                        { label: 'Administrar cierre de sesión', onClick: () => setLogoutModalVisible(true) }
                    ]}
                />

                <SidebarItem
                    icon={FaBoxOpen}
                    label="Producto"
                    section="product"
                    expanded={expanded.product}
                    toggleExpand={toggleExpand}
                    items={[
                        { label: 'Gestionar producto', to: '/dashboard/product/manage' },
                        { label: 'Realizar búsqueda de producto', to: '/' },
                        { label: 'Administrar Catalogo', to: '/test' },//administrar carta de productos
                        { label: 'Gestionar Departamento', to: '/dashboard/department' },
                        { label: 'Gestionar Categoría', to: '/dashboard/category' },
                        { label: 'Gestionar Imagen', to: '/dashboard/image' },
                        { label: 'Gestionar Descuento', to: '/dashboard/discount' },
                        { label: 'Gestionar Color', to: '/dashboard/reports/color' }
                    ]}
                />
                <SidebarItem
                    icon={FaBoxOpen}
                    label="Inventario"
                    section="inventory"
                    expanded={expanded.inventory}
                    toggleExpand={toggleExpand}
                    items={[
                        { label: 'Gestionar proveedor', to: '/dashboard/proveedors' },
                        { label: 'Registrar notas de ingreso', to: '/dashboard/incomeNote' },
                        { label: 'Registrar notas de egreso', to: '/dashboard/egressNote' },
                        { label: 'Administrar inventario', to: '/dashboard/inventory' },
                    ]}
                />
                <SidebarItem
                    icon={FaShoppingCart}
                    label="Compras"
                    section="sales"
                    expanded={expanded.sales}
                    toggleExpand={toggleExpand}
                    items={[
                        { label: 'Gestionar venta de producto', to: '/dashboard/ventaDeProducto' },
                        { label: 'Realizar nota de ventas', to: '/dashboard/sales/note' },
                        { label: 'Realizar tipo de pago', to: '/dashboard/uploadImage' },
                        { label: 'Administrar provador virtual', to: '/dashboard/uploadImage' }// movil
                    ]}
                />
                <li className="mb-2 rounded hover:shadow hover:bg-teal-800 py-2">
                    <NavLink to="/" className="px-3 h-full flex items-center">
                        <FaCoffee className='inline-block w-6 h-6 mr-2' /> Ver Home
                    </NavLink>
                </li>
            </ul>
            <Modal
                title="Cerrar Sesión"
                open={logoutModalVisible}
                onOk={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            >
                <p>¿Está seguro que desea cerrar sesión?</p>
            </Modal>
        </div>
    );
}

export default Sidebar;
