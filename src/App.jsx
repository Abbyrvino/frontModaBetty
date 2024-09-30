/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Homes from './components/test/Homes';
import Profile from './views/Profile';
import GestionarUser from './components/GestionarUser';
import { Bitacora } from './components/Bitacora';
import AssignPermissions from './components/AssignPermissions';
import Layout from './layouts/Layout';
import ManageCategory from './views/ManageCategory';
import ManageDepartment from './views/ManageDepartment';
import ManageDiscount from './views/ManageDiscount';
import ManageRoles from './views/ManageRoles';
import ManageProduct from './views/ManageProduct';
import ManageIncomeNote from './views/ManageIncomeNote';
import ManageEgressNote from './views/ManageEgressNote';
import GestionarProveedor from './views/GestionarProveedor';
import ImageManager from './views/ImageManager';
import AdministerInventory from './views/AdministerInventory';
import AdministrarVentaDeProducto from './views/AdministrarVentaDeProducto';
import { CartProvider } from './components/test/CartContext';
import Cart from './components/test/Cart';
import UploadImage from './views/RealizarTipoDePago';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import ProductosList from './components/test/ProductList';

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer /> {/* Añade el ToastContainer aquí *//*}/*
        <Routes>
          <Route path="/test" element={<Homes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AssignPermissions" element={<AssignPermissions />} />
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} requiredPermission="VER_PRODUCTO" />}>
            <Route path="users" element={<PrivateRoute element={<GestionarUser />} requiredPermission="VER_USUARIOS" />} />
            <Route path="bitacora" element={<PrivateRoute element={<Bitacora />} requiredPermission="VER_BITACORA" />} />
            <Route path="roles" element={<PrivateRoute element={<ManageRoles />} requiredPermission="VER_ROLES" />} />
            <Route path="permissions" element={<PrivateRoute element={<AssignPermissions />} requiredPermission="VER_PERMISOS" />} />
            <Route path="category" element={<PrivateRoute element={<ManageCategory />} requiredPermission="VER_CATEGORIA" />} />
            <Route path="department" element={<PrivateRoute element={<ManageDepartment />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="discount" element={<PrivateRoute element={<ManageDiscount />} requiredPermission="VER_DESCUENTO" />} />
            <Route path="incomeNote" element={<PrivateRoute element={<ManageIncomeNote />} requiredPermission="VER_NOTA_INGRESO" />} />
            <Route path="egressNote" element={<PrivateRoute element={<ManageEgressNote />} requiredPermission="VER_NOTA_INGRESO" />} />
            <Route path="manage" element={<PrivateRoute element={<ManageProduct />} requiredPermission="VER_PRODUCTO" />} />
            <Route path="product/manage" element={<PrivateRoute element={<ManageProduct />} requiredPermission="VER_PRODUCTO" />} />
            <Route path="proveedors" element={<PrivateRoute element={<GestionarProveedor />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="Image" element={<PrivateRoute element={<ImageManager />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="inventory" element={<PrivateRoute element={<AdministerInventory />} requiredPermission="VER_INVENTARIO" />} />
            <Route path="ventaDeProducto" element={<PrivateRoute element={<AdministrarVentaDeProducto />} requiredPermission="VER_INVENTARIO" />} />
            <Route path="uploadImage" element={<PrivateRoute element={<UploadImage />} requiredPermission="VER_INVENTARIO" />} />
            
          </Route>
          <Route path="/profile" element={<PrivateRoute element={<Profile />} requiredPermission="VER_HOME" />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Homes from './components/test/Homes';
import Profile from './views/Profile';
import GestionarUser from './components/GestionarUser';
import { Bitacora } from './components/Bitacora';
import AssignPermissions from './components/AssignPermissions';
import Layout from './layouts/Layout';
import ManageCategory from './views/ManageCategory';
import ManageDepartment from './views/ManageDepartment';
import ManageDiscount from './views/ManageDiscount';
import ManageRoles from './views/ManageRoles';
import ManageProduct from './views/ManageProduct';
import ManageIncomeNote from './views/ManageIncomeNote';
import ManageEgressNote from './views/ManageEgressNote';
import GestionarProveedor from './views/GestionarProveedor';
import ImageManager from './views/ImageManager';
import AdministerInventory from './views/AdministerInventory';
import AdministrarVentaDeProducto from './views/AdministrarVentaDeProducto';
import { CartProvider } from './components/test/CartContext';
import Cart from './components/test/Cart';
import UploadImage from './views/RealizarTipoDePago';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import ProductosList from './components/test/ProductList'; // Asegúrate de importar ProductosList

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer /> {/* Añade el ToastContainer aquí */}
        <Routes>
          <Route path="/test" element={<Homes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AssignPermissions" element={<AssignPermissions />} />
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} requiredPermission="VER_PRODUCTO" />}>
            <Route path="users" element={<PrivateRoute element={<GestionarUser />} requiredPermission="VER_USUARIOS" />} />
            <Route path="bitacora" element={<PrivateRoute element={<Bitacora />} requiredPermission="VER_BITACORA" />} />
            <Route path="roles" element={<PrivateRoute element={<ManageRoles />} requiredPermission="VER_ROLES" />} />
            <Route path="permissions" element={<PrivateRoute element={<AssignPermissions />} requiredPermission="VER_PERMISOS" />} />
            <Route path="category" element={<PrivateRoute element={<ManageCategory />} requiredPermission="VER_CATEGORIA" />} />
            <Route path="department" element={<PrivateRoute element={<ManageDepartment />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="discount" element={<PrivateRoute element={<ManageDiscount />} requiredPermission="VER_DESCUENTO" />} />
            <Route path="incomeNote" element={<PrivateRoute element={<ManageIncomeNote />} requiredPermission="VER_NOTA_INGRESO" />} />
            <Route path="egressNote" element={<PrivateRoute element={<ManageEgressNote />} requiredPermission="VER_NOTA_INGRESO" />} />
            <Route path="manage" element={<PrivateRoute element={<ManageProduct />} requiredPermission="VER_PRODUCTO" />} />
            <Route path="product/manage" element={<PrivateRoute element={<ManageProduct />} requiredPermission="VER_PRODUCTO" />} />
            <Route path="proveedors" element={<PrivateRoute element={<GestionarProveedor />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="Image" element={<PrivateRoute element={<ImageManager />} requiredPermission="VER_DEPARTAMENTO" />} />
            <Route path="inventory" element={<PrivateRoute element={<AdministerInventory />} requiredPermission="VER_INVENTARIO" />} />
            <Route path="ventaDeProducto" element={<PrivateRoute element={<AdministrarVentaDeProducto />} requiredPermission="VER_INVENTARIO" />} />
            <Route path="uploadImage" element={<PrivateRoute element={<UploadImage />} requiredPermission="VER_INVENTARIO" />} />
          </Route>
          
          {/* Nueva ruta para ver la lista de productos */}
          <Route path="/productos" element={<ProductosList />} />

          <Route path="/profile" element={<PrivateRoute element={<Profile />} requiredPermission="VER_HOME" />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
