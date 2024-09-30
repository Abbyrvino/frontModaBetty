import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {fetchInventarioProducto } from '../utils/fetchUtil';

const AdministerInventory = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [Inventories, setInventories] = useState(null);

    const fetchInventories = async () => {
        fetchInventarioProducto().then((Inventarios)=>setInventories(Inventarios)) ;
    };

    useEffect(() => {
        fetchInventories();
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

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((value, key) => value[key], obj);
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
        onFilter: (value, record) =>{
            const nestedValue = getNestedValue(record, dataIndex);
            return nestedValue.toString().toLowerCase().includes(value.toLowerCase());
        },
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
            ...getColumnSearchProps('cantidad'),
        },
        {
            title: 'Nombre Producto',
            dataIndex: ['producto', 'nombre'],
            key: 'producto_nombre',
            ...getColumnSearchProps('producto.nombre'),
        },
        {
            title: 'Precio',
            dataIndex: ['producto', 'precio'],
            key: 'producto_precio',
            ...getColumnSearchProps('producto.precio'),
        },
        {
            title: 'Categoría',
            dataIndex: ['producto', 'category', 'nombre'],
            key: 'producto_category_nombre',
            ...getColumnSearchProps('producto.category.nombre'),
        },
        {
            title: 'Departamento',
            dataIndex: ['producto', 'category', 'departament', 'nombre'],
            key: 'producto_category_departament_nombre',
            ...getColumnSearchProps('producto.category.departament.nombre'),
        },
        {
            title: 'Descuento',
            dataIndex: ['producto', 'descuento', 'porcentaje'],
            key: 'producto_descuento_porcentaje',
            ...getColumnSearchProps('producto.descuento.porcentaje'),
        },
        {
            title: 'Descripción de Descuento',
            dataIndex: ['producto', 'descuento', 'descripcion'],
            key: 'producto_descuento_descripcion',
            ...getColumnSearchProps('producto.descuento.descripcion'),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Administrar Inventarios</h3>
            <Table columns={columns} dataSource={Inventories} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
        </div>
    );
};

export default AdministerInventory;