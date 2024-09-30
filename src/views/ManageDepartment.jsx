import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import DepartmentModal from '../components/modalComponents/DepartmentModal';
import { fetchDepartamento } from '../utils/fetchUtil';
import { deleteDepartment, updateDepartment } from '../utils/postUtil';

const ManageDepartment = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Departments, setDepartments] = useState(null);

    const getDatos = async () => {
        await fetchDepartamento().then((departments)=> setDepartments(departments));
    }

    useEffect(()=>{
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

    const handleEditDepartment = (departmentId) => {
        setEditingDepartmentId(departmentId);
        const department = Departments.find(dept => dept.id === departmentId);
        setEditedData({ [departmentId]: { nombre: department.nombre } });
    };

    const handleSaveDepartment = async (departmentId) => {
        const updatedDepartment = { id: departmentId, ...editedData[departmentId] };
        setEditingDepartmentId(null);
        await updateDepartment(updatedDepartment);
        getDatos();
    };

    const handleCancelEdit = () => {
        setEditingDepartmentId(null);
        setEditedData({});
    };

    const handleDeleteDepartment = async (departmentId) => {
        await deleteDepartment(departmentId);
        getDatos();
    };

    const handleInputChange = (value, departmentId, field) => {
        setEditedData(prevState => ({
            [departmentId]: {
                ...prevState[departmentId],
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
        if (record.id === editingDepartmentId && dataIndex === 'nombre') {
            return (
                <Input
                    value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                    onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                    onPressEnter={() => handleSaveDepartment(record.id)}
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
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingDepartmentId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveDepartment(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditDepartment(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteDepartment(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar Departamento</h3>
            <div>
                <Table columns={columns} dataSource={Departments} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <DepartmentModal getDatos={getDatos}/>
            </div>
            <div className="h-4 lg:h-1"></div>
        </div>
    );
};

export default ManageDepartment;
