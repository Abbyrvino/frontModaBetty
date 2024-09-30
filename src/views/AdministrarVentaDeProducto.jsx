import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ventasDeProductos } from '../utils/test';
import VerNotaDeVentaModal from '../components/modalComponents/VerNotaDeVentaModal';
import { fetchVenta } from '../utils/fetchUtil';

const { Option } = Select;

const AdministrarVentaDeProducto = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [data, setData] = useState(ventasDeProductos);

    const getDatos = async () => {
        await fetchVenta().then((datos) => setData(datos));
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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <input
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reiniciar
                </Button>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const handleEstadoChange = (value, record) => {
        setSelectedVenta(record);
        setSelectedStatus(value);
        setConfirmModalVisible(true);
    };

    const handleConfirmChange = () => {
        console.log(`Enviando datos al backend: ID: ${selectedVenta.id}, Nuevo Estado: ${selectedStatus}`);
        const newData = data.map(item => {
            if (item.id === selectedVenta.id) {
                return { ...item, status: selectedStatus };
            }
            return item;
        });
        setData(newData);
        setConfirmModalVisible(false);
        setSelectedVenta(null);
        setSelectedStatus('');
    };

    const handleCancelChange = () => {
        console.log("No se realizaron cambios");
        setConfirmModalVisible(false);
        setSelectedVenta(null);
        setSelectedStatus('');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            ...getColumnSearchProps('fecha'),
        },
        {
            title: 'Cliente',
            dataIndex: ['person', 'nombre'],
            key: 'cliente',
            ...getColumnSearchProps(['person', 'nombre']),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Select defaultValue={text} onChange={(value) => handleEstadoChange(value, record)}>
                    <Option value="Pagado">Pagado</Option>
                    <Option value="Cancelado">Cancelado</Option>
                </Select>
            ),
        },
        {
            title: 'Tipo de Pago',
            dataIndex: ['tipoPago', 'nombre'],
            key: 'tipoPago',
            ...getColumnSearchProps(['tipoPago', 'nombre']),
        },
        {
            title: 'Ver Nota Venta',
            key: 'verNotaVenta',
            render: (text, record) => (
                <Button type="link" onClick={() => handleVerNotaVenta(record)}>
                    Ver Nota Venta
                </Button>
            ),
        },
        {
            title: 'Descargar PDF',
            key: 'descargarPDF',
            render: (text, record) => (
                <Button className="custom-button" onClick={() => handleDescargarPDF(record.id)}>
                    Descargar PDF
                </Button>
            ),
        },
    ];

    const handleVerNotaVenta = (record) => {
        setSelectedVenta(record);
        setModalVisible(true);
    };

    const handleDescargarPDF = (id) => {
        // Acción de descargar PDF
        console.log(`Descargar PDF del ID: ${id}`);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedVenta(null);
    };

    return (
        <div className="table-container">
            <h3 className="h3">Administrar Ventas de Productos</h3>
            <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 4, size: 'small' }}/>

            <VerNotaDeVentaModal
                visible={modalVisible}
                onCancel={closeModal}
                venta={selectedVenta}
            />
            <Modal
                title="Confirmación de Cambio de Estado"
                visible={confirmModalVisible}
                onOk={handleConfirmChange}
                onCancel={handleCancelChange}
            >
                <p>¿Está seguro de realizar el cambio de estado de la nota de venta {selectedVenta ? selectedVenta.id : ''}?</p>
            </Modal>
        </div>
    );
};

export default AdministrarVentaDeProducto;
