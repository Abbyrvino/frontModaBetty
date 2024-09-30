import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CategoryModal from '../components/modalComponents/CategoryModal';
import { fetchCategoria, fetchDepartamento } from '../utils/fetchUtil';
import { deleteCategory, updateCategory } from '../utils/postUtil';

const ManageCategory = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Categories, setCategories] = useState(null);
    const [Departments, setDepartments] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const getDatos = async () => {
        const departments = await fetchDepartamento();
        setDepartments(departments);
        const categories = await fetchCategoria();
        setCategories(categories);
    }

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

    const handleEditCategory = (categoryId) => {
        setEditingCategoryId(categoryId);
        const category = Categories.find(cat => cat.id === categoryId);
        setEditedData({ [categoryId]: { nombre: category.nombre, Departamento: category.Departamento } });
    };

    const handleSaveCategory = async (categoryId) => {
        const updatedCategory = { id: categoryId, ...editedData[categoryId] };
        setEditingCategoryId(null);
        await updateCategory(updatedCategory);
        getDatos();
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setEditedData({});
    };

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId);
        getDatos();
    };

    const handleInputChange = (value, categoryId, field) => {
        setEditedData(prevState => ({
            [categoryId]: {
                ...prevState[categoryId],
                [field]: value
            }
        }));
    };

    const handleSelectChange = (value, categoryId) => {
        const selectedDepartment = Departments.find(dept => dept.id === value);
        setEditedData(prevState => ({
            [categoryId]: {
                ...prevState[categoryId],
                Departamento: selectedDepartment
            }
        }));
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
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
        if (record.id === editingCategoryId) {
            if (dataIndex === 'nombre') {
                return (
                    <Input
                        value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                        onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                        onPressEnter={() => handleSaveCategory(record.id)}
                    />
                );
            } else if (dataIndex === 'Departamento') {
                return (
                    <Select
                        value={editedData[record.id] ? editedData[record.id][dataIndex].id : text.id}
                        onChange={(value) => handleSelectChange(value, record.id)}
                        className="w-full"
                    >
                        {Departments.map(dept => (
                            <Select.Option key={dept.id} value={dept.id}>
                                {dept.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                );
            }
        }
        return dataIndex === 'Departamento' ? text.nombre : text;
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
            title: 'Departamento',
            dataIndex: 'Departamento',
            key: 'Departamento',
            ...getColumnSearchProps('Departamento'),
            render: (text, record) => renderEditableInput(record.Departamento, record, 'Departamento'),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingCategoryId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveCategory(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditCategory(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteCategory(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const filteredCategories = Categories ? Categories.filter(category => selectedCategory === 'cafe' ? false : true) : [];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar categoría</h3>
            <div>
                <Select.Option value="all">Todos</Select.Option>
                {Categories && Categories.map(category => (
                    <Select.Option key={category.id} value={category.nombre}>
                        {category.nombre}
                    </Select.Option>
                ))}
                <Table columns={columns} dataSource={filteredCategories} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <CategoryModal Departments={Departments} getDatos={getDatos} />
            </div>
        </div>
    );
};

export default ManageCategory;


