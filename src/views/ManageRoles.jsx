import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import RoleModal from '../components/modalComponents/RoleModal';
import { fetchRol } from '../utils/fetchUtil';
import { deleteRoll, updateRol } from '../utils/postUtil';


const ManageRoles = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Roles, setRoles] = useState(null);

    const getDatos = async ()=> {
        try{
            await fetchRol().then((datos) => setRoles(datos));
          }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDatos();
    },[])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleEditRole = (roleId) => {
        setEditingRoleId(roleId);
        const role = Roles.find(role => role.id === roleId);
        setEditedData({ [roleId]: { name: role.name } });
    };

    const handleSaveRole = async (roleId) => {
        const id = roleId;
        const updatedRole = { ...editedData[roleId] };
        console.log("Datos modificados:", updatedRole);
        await updateRol(id, updatedRole);
        setEditingRoleId(null);
    };

    const handleCancelEdit = () => {
        setEditingRoleId(null);
        setEditedData({});
    };

    const handleDeleteRole = async (roleId) => {
        try {
            await deleteRoll(roleId);
            getDatos();
          } catch (error) {
            console.error('Error al eliminar rol:', error);
          }
    };

    const handleInputChange = (value, roleId, field) => {
        setEditedData(prevState => ({
            [roleId]: {
                ...prevState[roleId],
                [field]: value
            }
        }));
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reiniciar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const renderEditableInput = (text, record, dataIndex) => {
        if (record.id === editingRoleId && dataIndex === 'name') {
            return (
                <Input
                    value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                    onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                    onPressEnter={() => handleSaveRole(record.id)}
                />
            );
        }
        return text;
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            render: (text, record) => renderEditableInput(text, record, 'name'),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingRoleId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveRole(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditRole(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteRole(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar Roles</h3>
            <div >
                <Table columns={columns} dataSource={Roles} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <RoleModal getDatos={getDatos}/>
            </div>
            <div className="h-4 lg:h-1"></div>
        </div>
    );
};

export default ManageRoles;
