import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import DiscountModal from '../components/modalComponents/DiscountModal';
import { fetchDiscount } from '../utils/fetchUtil';
import { deleteDiscount, updateDiscount } from '../utils/postUtil';

const ManageDiscount = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingDiscountId, setEditingDiscountId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [Discounts, setDiscounts] = useState(null);

    const getDatos = async () => {
        await fetchDiscount().then((descuento)=>setDiscounts(descuento));
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

    const handleEditDiscount = (discountId) => {
        setEditingDiscountId(discountId);
        const discount = Discounts.find(dis => dis.id === discountId);
        setEditedData({ [discountId]: { porcentaje: discount.porcentaje, descripcion: discount.descripcion } });
    };

    const handleSaveDiscount = async (discountId) => {
        const updatedDiscount = { id: discountId, ...editedData[discountId] };
        setEditingDiscountId(null);
        await updateDiscount(updatedDiscount);
        getDatos();
    };

    const handleCancelEdit = () => {
        setEditingDiscountId(null);
        setEditedData({});
    };

    const handleDeleteDiscount = async (discountId) => {
        await deleteDiscount(discountId);
        getDatos();
    };

    const handleInputChange = (value, discountId, field) => {
        setEditedData(prevState => ({
            [discountId]: {
                ...prevState[discountId],
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
                    <Button onClick={() => handleReset(clearFilters)} size="small" className="w-full">
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
        if (record.id === editingDiscountId && (dataIndex === 'porcentaje' || dataIndex === 'descripcion')) {
            return (
                <Input
                    value={editedData[record.id] ? editedData[record.id][dataIndex] : text}
                    onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
                    onPressEnter={() => handleSaveDiscount(record.id)}
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
            title: 'Porcentaje',
            dataIndex: 'porcentaje',
            key: 'porcentaje',
            ...getColumnSearchProps('porcentaje'),
            render: (text, record) => renderEditableInput(text, record, 'porcentaje'),
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            ...getColumnSearchProps('descripcion'),
            render: (text, record) => renderEditableInput(text, record, 'descripcion'),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingDiscountId === record.id ? (
                        <>
                            <Button onClick={() => handleSaveDiscount(record.id)}>Guardar</Button>
                            <Button onClick={handleCancelEdit}>Cancelar</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditDiscount(record.id)}>Editar</Button>
                            <Button onClick={() => handleDeleteDiscount(record.id)}>Eliminar</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div div className="table-container">
            <h3 className="h3">Gestionar Descuentos</h3>
            <div>
                <Table columns={columns} dataSource={Discounts} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <div className="custom-button">
                <DiscountModal getDatos={getDatos}/>
            </div>
            <div className="h-4 lg:h-1"></div>
        </div>
    );
};

export default ManageDiscount;
