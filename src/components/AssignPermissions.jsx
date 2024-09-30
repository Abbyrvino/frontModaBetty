import React, { useEffect, useState } from 'react';
import { Select, Checkbox, Button } from 'antd';
import { fetchPermisos, fetchRoles } from '../utils/fetchUtil';
import { setPermissions }  from '../utils/postUtil'
import LoadingOverlay from '../components/LoadingOverlay'

const AssignPermissions = () => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [Roles, setRoles] = useState(null);
  const [Permisos, setPermisos] = useState(null);
  const [onWait, setOnWait] = useState(false);

  const getDatos = async () => {
    await fetchPermisos().then((permisos) => setPermisos(permisos));
    await fetchRoles().then((Roles) => setRoles(Roles));
    console.log(Permisos)
  }

  useEffect(()=>{
    getDatos();
  }, [])


  const handleRoleChange = (value) => {
    setSelectedRoleId(value);
    const selectedRole = Roles.find(role => role.id === value);
    if (selectedRole) {
      setRolePermissions(selectedRole.permissions.map(permission => permission.id));
    } else {
      setRolePermissions([]);
    }
  };

  const handlePermissionChange = (permissionId) => {
    const updatedPermissions = rolePermissions.includes(permissionId)
      ? rolePermissions.filter(id => id !== permissionId)
      : [...rolePermissions, permissionId];
    setRolePermissions(updatedPermissions);
  };

  const handleSavePermissions = async () => {
    const id = selectedRoleId;
    const updatedRolePermissions = {
      permissions: rolePermissions.map(permissionId => ({ id: permissionId }))
    };
    setOnWait(true);
    await setPermissions(id, updatedRolePermissions);
    await getDatos()
    setOnWait(false);
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Seleccionar Rol:</h3>
        <Select style={{ width: '100%' }} onChange={handleRoleChange} value={selectedRoleId} placeholder="Seleccionar Rol">
          {Roles?
          Roles.map(role => (
            <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
          ))
          :
          <Select.Option> No data found </Select.Option>
          }
        </Select>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Permisos:</h3>
        <div className="flex flex-col items-start">
          {Permisos?
          Permisos.map(permission => (
            <div key={permission.id} className="mb-2">
              <Checkbox
                disabled={!selectedRoleId}
                checked={rolePermissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              >
                {permission.nombre}
              </Checkbox>
            </div>
          ))
          :
          <span>No data found</span>
          }
        </div>
      </div>
      <div>
        <Button className="w-full" disabled={!selectedRoleId} onClick={handleSavePermissions}>Guardar</Button>
      </div>
      <div className="h-8 lg:h-2"></div>
      <LoadingOverlay loading={onWait}/>
    </div>
  );
};

export default AssignPermissions;