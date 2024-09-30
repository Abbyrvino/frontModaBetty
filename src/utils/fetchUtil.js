import { message } from 'antd';
import { api } from '../api/axios';
import { getUsernameToken } from './authService';

const fetchAllPersons = async () => {
  try {
    const response = await api.get('/user/get-all');
    if (response.status === 200) {
      console.log("fetchUtil: fetchAllPersons correcto")
      const users = response.data.map((user) => ({
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        email: user.email,
        direccion: user.direccion || "Sin valor",
        enabled: user.enabled,
      }));
      return users; // Devuelve los datos mapeados
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const userEnable = async (id, enabled) => {
  try {
    if (enabled) {
      await api.put(`/user/unable/${id}`);
      message.success(`Usuario ${id} bloqueado`); // Muestra un mensaje de éxito
    } else {
      await api.put(`/user/enable/${id}`);
      message.success(`Usuario ${id} desbloqueado`);
    }
  } catch (error) {
    console.error('Error al bloquear/desbloquear usuario:', error);
    message.error('Error al bloquear/desbloquear usuario');
  }
};

const getUser = async () => {
  const username = getUsernameToken();
  try {
    const response = await api.get(`/user/${username}`);
    if (response.status === 200) {
      const user = response.data;
      const userFiltered = {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        email: user.email,
        direccion: user.direccion,
      };
      return userFiltered;
    }
  } catch (error) {
    console.error('getUser: Error al obtener datos usuario:', error);
    message.error('Error al obtener datos usuario');
  }
};

const saveUser = async (user) => {
  try {
    const userPost = {
      nombre: user.nombre,
      usuario: user.usuario,
      email: user.email,
      direccion: user.direccion
    };
    console.log(userPost);
    const response = await api.put(`/user/update/${user.id}`, userPost);
    if (response.status === 200) {
      message.success('Usuario guardado exitosamente');
    } else {
      throw new Error('Error al guardar datos usuario');
    }
    console.log(response);
  } catch (error) {
    console.error('saveUser: Error al guardar datos usuario:', error);
    message.error('Error al guardar datos usuario');
  }
};

const fetchBitacora = async () => {
  try {
    const response = await api.get("/bitacora/get-all");
    if (response.status === 200) {
      const filteredData = response.data.map((bitacora) => ({
        id: bitacora.id,
        usuario: bitacora.user.usuario,
        accion: bitacora.accion,
        fechaHora: (new Date(bitacora.fecha).toLocaleString()),
        ip: bitacora.ip
      }));
      return filteredData;
    }
  } catch (error) {
    console.error('fetchBitacora: Error al obtener datos bitacora:', error);
    message.error('Error al obtener datos');
  }
};

const fetchRol = async () => {
  try {
    const response = await api.get("/rol/get-all");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchRol: Error al obtener datos Rol:', error);
    message.error('Error al obtener datos');
  }
};

const fetchCategoria = async () => {
  try {
    const response = await api.get("/category");
    if (response.status === 200) {
      const filteredData = response.data.map((category) => ({
        id: category.id,
        nombre: category.nombre, 
        Departamento: category.departament
      }));
      return filteredData;
    }
  } catch (error) {
    console.error('fetchCategoria: Error al obtener datos Categoria:', error);
    message.error('Error al obtener datos');
  }
};

const fetchDepartamento = async () => {
  try {
    const response = await api.get("/departament");
    if (response.status === 200) {
      const filteredData = response.data;
      return filteredData;
    }
  } catch (error) {
    console.error('fetchDepartamento: Error al obtener datos Departamento:', error);
    message.error('Error al obtener datos');
  }
};

const fetchRoles = async () => {
  try {
    const response = await api.get("/rol/get-all");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchRoles: Error al obtener datos Roles:', error);
    message.error('Error al obtener datos');
  }
};

const fetchPermisos = async () => {
  try {
    const response = await api.get("/permiso/get-all");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchPermisos: Error al obtener datos Permisos:', error);
    message.error('Error al obtener datos');
  }
};

const fetchDiscount = async () => {
  try {
    const response = await api.get("/descuento");
    return response.data;
  } catch (error) {
    console.error('fetchDiscount: Error al obtener datos Discount:', error);
    message.error('Error al obtener datos');
  }
};

const fetchProducto = async () => {
  try {
    const response = await api.get("/producto/all");
    if (response.status === 200) {
      const filteredData = response.data.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        category: producto.category,
        descuento: producto.descuento
      }));
      return filteredData;
    }
  } catch (error) {
    console.error('fetchProducto: Error al obtener datos Producto:', error);
    message.error('Error al obtener datos');
  }
};

const fetchRolesDto = async () => {
  try {
    const response = await api.get("/rol/dtos");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchRoles: Error al obtener datos Roles:', error);
    message.error('Error al obtener datos');
  }
}

const putRolUser = async (id, rol) => {
  try {
    const response = await api.put(`/user/rol/${id}`, {
      id: rol
    });
  } catch (error) {
    console.error('fetchRoles: Error al obtener datos Roles:', error);
    message.error('Error al obtener datos');
  }
}

const fetchDepartmentsDto = async () => {
  try {
    const response = await api.get("/departament/dtos");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchRoles: Error al obtener datos Department:', error);
    message.error('Error al obtener datos');
  }
}

function formatDateArrayToString(dateArray) {
  const [year, month, day] = dateArray;
  return `${year}/${month}/${day}`;
}


const fetchIncomeNotes = async () => {
  try {
    const response = await api.get("/nota-ingreso");
    if (response.status === 200) {
      const transformedData = response.data.map(note => ({
        id: note.id,
        descripcion: note.descripcion,
        fecha: formatDateArrayToString(note.fecha),
        proveedor: note.proveedor.nombre,
        detalleIngreso: note.detalleIngreso.map(detalle => ({
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          inventario: {
            id: detalle.inventario.id,
            producto: {
              id: detalle.inventario.producto.id,
              nombre: detalle.inventario.producto.nombre
            }
          }
        }))
      }));
      return transformedData;
    }
  } catch (error) {
    console.error('fetchIncomeNotes: Error al obtener datos NotaIngreso:', error);
    message.error('Error al obtener datos');
  }
}

const fetchProviders = async () => {
  try {
    const response = await api.get("/proveedor");
    if (response.status === 200) {
      return response.data.map((proveedor)=>({
        id: proveedor.id,
        nombre: proveedor.nombre
      }));
    }
  } catch (error) {
    console.error('fetchProviders: Error al obtener datos Proveedor:', error);
    message.error('Error al obtener datos');
  }
}

const fetchInventario = async () => {
  try {
    const response = await api.get("/inventario");
    if (response.status === 200) {
      return response.data.map((inventario)=>({
        id: inventario.id,
        cantidad: inventario.cantidad,
        producto: {
          id: inventario.producto.id,
          nombre: inventario.producto.nombre
        }
      }));
    }
  } catch (error) {
    console.error('fetchInventario: Error al obtener datos Inventario:', error);
    message.error('Error al obtener datos');
  }
}

const fetchInventarioProducto = async () => {
  try {
    const response = await api.get("/inventario");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchInventario: Error al obtener datos Inventario:', error);
    message.error('Error al obtener datos');
  }
}

const fetchNotaEgreso = async () => {
  try {
    const response = await api.get("/nota-egreso");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchNotaEgreso: Error al obtener datos Nota Egreso:', error);
    message.error('Error al obtener datos');
  }
}

const fetchImagen = async () => {
  try {
    const response = await api.get("/imagen");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchImagen: Error al obtener datos Imagen:', error);
    message.error('Error al obtener datos');
  }
}

const fetchVenta = async () => {
  try {
    const response = await api.get("/venta");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('fetchVenta: Error al obtener datos Venta:', error);
    message.error('Error al obtener datos');
  }
}

export {
  fetchAllPersons,
  getUser,
  saveUser,
  fetchBitacora,
  fetchRol,
  fetchDepartamento,
  fetchCategoria,
  fetchRoles,
  fetchRolesDto,
  putRolUser,
  fetchPermisos,
  fetchDiscount,
  fetchDepartmentsDto,
  fetchProducto,
  fetchIncomeNotes,
  fetchInventario,
  fetchProviders,
  fetchInventarioProducto,
  fetchNotaEgreso,
  fetchImagen,
  fetchVenta,
};
