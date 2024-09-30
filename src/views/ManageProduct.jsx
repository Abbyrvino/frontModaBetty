import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ProductModal from '../components/modalComponents/ProductModal';
import { fetchCategoria, fetchDiscount, fetchProducto } from '../utils/fetchUtil';
import { deleteRoll as deleteProducto, updateProducto } from '../utils/postUtil';

const ManageProduct = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Products, setProducts] = useState(null);
    const [Categories, setCategories] = useState(null);
    const [Discounts, setDiscounts] = useState(null);

    const getDatos = async () => {
        await fetchCategoria().then((categories) => setCategories(categories));
        await fetchProducto().then((products) => setProducts(products));
        await fetchDiscount().then((discounts) => setDiscounts(discounts));
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

    const handleEditProduct = (productId) => {
        setEditingProductId(productId);
        const product = Products.find(prod => prod.id === productId);
        setEditedData({
            [productId]: {
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                category: product.category,
                descuento: product.descuento
            }
        });
    };

    const handleSaveProduct = async (productId) => {
        const updatedProduct = { id: productId, ...editedData[productId] };
        setEditingProductId(null);
        await updateProducto(updatedProduct);
        getDatos();
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
        setEditedData({});
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProducto(productId);
        getDatos();
    };

    const handleInputChange = (value, productId, field) => {
        setEditedData(prevState => ({
            [productId]: {
                ...prevState[productId],
                [field]: value
            }
        }));
    };

    const handleSelectChange = (value, productId, field) => {
        if (field === 'category') {
            const selectedCategory = Categories.find(cat => cat.id === value);
            setEditedData(prevState => ({
                [productId]: {
                    ...prevState[productId],
                    category: selectedCategory
                }
            }));
        } else if (field === 'descuento') {
            const selectedDiscount = Discounts.find(disc => disc.id === value);
            setEditedData(prevState => ({
                [productId]: {
                    ...prevState[productId],
                    descuento: selectedDiscount
                }
            }));
        }
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
        if (record.id === editingProductId) {
            if (dataIndex === 'nombre' || dataIndex === 'precio' || dataIndex === 'imagen') {
                return (
                    <Input
                        value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                        onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                        onPressEnter={() => handleSaveProduct(record.id)}
                    />
                );
            } else if (dataIndex === 'category') {
                return (
                    <Select
                        value={editedData[record.id] ? editedData[record.id][dataIndex].id : text.id}
                        onChange={(value) => handleSelectChange(value, record.id, 'category')}
                        className="w-full"
                    >
                        {Categories.map(cat => (
                            <Select.Option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                );
            } else if (dataIndex === 'descuento') {
                return (
                    <Select
                        value={editedData[record.id] ? editedData[record.id][dataIndex].id : text.id}
                        onChange={(value) => handleSelectChange(value, record.id, 'descuento')}
                        className="w-full"
                    >
                        {Discounts.map(disc => (
                            <Select.Option key={disc.id} value={disc.id}>
                                {disc.descripcion} ({disc.porcentaje}%)
                            </Select.Option>
                        ))}
                    </Select>
                );
            }
        }
        return dataIndex === 'category' ? text.nombre : dataIndex === 'descuento' ? `${text.descripcion} (${text.porcentaje}%)` : text;
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
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
            ...getColumnSearchProps('precio'),
            render: (text, record) => renderEditableInput(text, record, 'precio'),
        },
        {
            title: 'Imagen',
            dataIndex: 'imagen',
            key: 'imagen',
            render: (text, record) => (
                <a href={text.enlace} target="_blank" rel="noopener noreferrer">
                    Ver imagen
                </a>
            ),
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
            render: (text, record) => renderEditableInput(text, record, 'category'),
        },
        {
            title: 'Descuento',
            dataIndex: 'descuento',
            key: 'descuento',
            render: (text, record) => renderEditableInput(text, record, 'descuento'),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingProductId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveProduct(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditProduct(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteProduct(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar producto</h3>
            <div>
                <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={Products} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <ProductModal Categories={Categories} Discounts={Discounts} getDatos={getDatos} />
            </div>
            <div className="h-4 lg:h-1"></div>
        </div>
    );
};

export default ManageProduct;
