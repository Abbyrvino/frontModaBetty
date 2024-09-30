import React, { useState, useEffect } from 'react';
import { getUser, saveUser } from '../utils/fetchUtil';
import LoadingOverlay from './LoadingOverlay'
import { Button, Input } from 'antd';

export const EditUser = () => {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false); // Estado para controlar el modo de edición
  const [datosOriginales, setDatosOriginales] = useState(null); // Estado para almacenar los datos originales antes de la edición
  const [isSended, setIsSended] = useState(true);

  const fetchData = async () => {
    try {
      const datos = await getUser().then((user) => {
        setUsuario(user);
        setDatosOriginales(user);
      });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Función para cambiar al modo de edición
  const editarUsuario = () => {
    setEditando(true);
  };

  // Función para guardar los cambios realizados
  const guardarCambios = async () => {
    try {
      setIsSended(false);
      await saveUser(usuario);
      setEditando(false);
      setDatosOriginales(usuario);
      setIsSended(true);
    } catch (error) {
    }
  };

  // Función para cancelar la edición y restaurar los datos originales
  const cancelarEdicion = () => {
    console.log(datosOriginales);
    console.log(usuario);
    setUsuario(datosOriginales);
    setEditando(false);
  };
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-8 p-4 bg-white rounded-lg ">
      <h3 className="h3">Datos del Usuario</h3>
      <div class="border border-gray-300 p-5 rounded relative">
        {usuario ? (
          <div>
            {/* Campos editables */}
            <p className="flex items-center mb-3"><strong className="mr-3">Nombre:</strong> {editando ? <Input type="text" value={usuario.nombre} onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })} /> : usuario.nombre}</p>
            <p className="flex items-center mb-3"><strong className="mr-3">Usuario:</strong > {editando ? <Input type="text" value={usuario.usuario} onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })} /> : usuario.usuario}</p>
            <p className="flex items-center mb-3"><strong className="mr-3">Email:</strong> {editando ? <Input type="text" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} /> : usuario.email}</p>
            <p className="flex items-center mb-3"><strong className="mr-3">Dirección:</strong> {editando ? <Input type="text" value={usuario.direccion || ""} onChange={(e) => setUsuario({ ...usuario, direccion: e.target.value })} /> : usuario.direccion || "Sin valor"}</p>
            {/* Botón para editar o guardar cambios */}
            {editando ? (
              <div className="mt-8">
                <Button className="w-full font-bold mb-2" onClick={guardarCambios}>Guardar</Button>
                <Button className="w-full font-bold" onClick={cancelarEdicion}>Cancelar</Button> {/* Botón para cancelar la edición */}
              </div>
            ) : (
              <Button className="w-full font-bold"
              onClick={editarUsuario}>Editar</Button>
            )}
          </div>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
        <LoadingOverlay loading={!isSended}/>
      </div>
    </div>
  )
}
