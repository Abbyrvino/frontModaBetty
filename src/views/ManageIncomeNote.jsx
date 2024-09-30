import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import IncomeNoteModal from '../components/modalComponents/IncomeNoteModal';
import { IncomeNotes } from '../utils/test';
import IncomeNoteDetail from '../components/modalComponents/IncomeNoteDetail';
import { fetchIncomeNotes } from '../utils/fetchUtil';
import { deleteIncomeNote, saveBitacora } from '../utils/postUtil';

const ManageIncomeNotes = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [incomeNotes, setIncomeNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); 
    const [noteToDelete, setNoteToDelete] = useState(null); 

    const getDatos = async () => {
        fetchIncomeNotes().then((IncomeNotes) => setIncomeNotes(IncomeNotes));
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

    const handleShowDetail = (record) => {
        setSelectedNote(record);
        setIsDetailModalVisible(true);
        console.log('Detalles del ingreso:', record);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedNote(null);
    };

    const handleDeleteConfirm = async () => {
        //eliminación (simulada)
        await deleteIncomeNote(noteToDelete.id)
        await saveBitacora("Eliminacion ingreso");
        setDeleteModalVisible(false);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
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
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            ...getColumnSearchProps('descripcion'),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleShowDetail(record)}>Mostrar detalle</Button>
                    <Button onClick={() => { setNoteToDelete(record); setDeleteModalVisible(true); }}>Eliminar</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3 className="h3">Gestionar Notas de Ingreso</h3>
            <div>
                <Table scroll={{ x: 'max-content' }}columns={columns} dataSource={incomeNotes} rowKey="id" pagination={{ pageSize: 4, size: 'small' }} />
            </div>
            <Modal
                title="Eliminar Nota"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <p>¿Está seguro que desea eliminar esta nota?</p>
            </Modal>
            <div className="custom-button">
               <IncomeNoteModal/>{/*modal de agregar nota de ingreso */}
            </div>
            {/*modal de detalle de nota de ingreso para la edicion */}
            {selectedNote && (
                <IncomeNoteDetail
                    visible={isDetailModalVisible}
                    onClose={handleDetailModalClose}
                    note={selectedNote}
                />
            )}
        </div>

    );
};

export default ManageIncomeNotes;
