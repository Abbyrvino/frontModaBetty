import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ProveedorModal from '../components/modalComponents/ProveedorModal';
import { fetchProviders } from '../utils/fetchUtil';
import { deleteProveedor, updateProveedor } from '../utils/postUtil';

const ManageProveedor = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingProveedorId, setEditingProveedorId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Proveedores, setProveedores] = useState(null);

    const getDatos = async () => {
        const datos = await fetchProviders();
        setProveedores(datos);
    };

    useEffect(() => {
        getDatos();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleEditProveedor = (proveedorId) => {
        setEditingProveedorId(proveedorId);
        const proveedor = Proveedores.find(prov => prov.id === proveedorId);
        setEditedData({
            [proveedorId]: {
                nombre: proveedor.nombre,
                numero: proveedor.numero
            }
        });
    };

    const handleSaveProveedor = async (proveedorId) => {
        const updatedProveedor = { id: proveedorId, ...editedData[proveedorId] };
        setEditingProveedorId(null);
        await updateProveedor(updatedProveedor);
        getDatos();
    };

    const handleCancelEdit = () => {
        setEditingProveedorId(null);
        setEditedData({});
    };

    const handleDeleteProveedor = async (proveedorId) => {
        await deleteProveedor(proveedorId);
        getDatos();
    };

    const handleInputChange = (value, proveedorId, field) => {
        setEditedData(prevState => ({
            [proveedorId]: {
                ...prevState[proveedorId],
                [field]: value
            }
        }));
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="px-4 py-2">
                <Input
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    className="mb-2 block"
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        className="w-full"
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
        if (record.id === editingProveedorId) {
            return (
                <Input
                    value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                    onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                    onPressEnter={() => handleSaveProveedor(record.id)}
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
            dataIndex: 'nombre',
            key: 'nombre',
            ...getColumnSearchProps('nombre'),
            render: (text, record) => renderEditableInput(text, record, 'nombre'),
        },
        {
            title: 'numero',
            dataIndex: 'numero',
            key: 'numero',
            ...getColumnSearchProps('numero'),
            render: (text, record) => renderEditableInput(text, record, 'numero'),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingProveedorId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveProveedor(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditProveedor(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteProveedor(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar Proveedor</h3>
            <div>
                <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={Proveedores} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <ProveedorModal getDatos={getDatos} />
            </div>
            <div className="h-4 lg:h-1"></div>
        </div>
    );
};

export default ManageProveedor;
