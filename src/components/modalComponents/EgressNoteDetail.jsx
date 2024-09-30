import { Modal, Table, Button, Input} from 'antd';

const EgressNoteDetail = ({ visible, onClose, note }) => {
    const columns = [
        {
            title: (<div >Producto</div>),
            dataIndex: ['id'],
            render: (value, record, index) =>(
                    <span>{record.inventario.producto.nombre}</span>
                )
        },
        {
            title: (<div >Cantidad</div>),
            dataIndex: 'cantidad',
            render: (value, record, index) =>(
                    <span >{value}</span>
                )
        },
    ];
    return (
        <Modal
            title="Detalle de Nota de Egreso"
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
            centered
        >
            {note ? (
                <>
                    <p className="flex items-center mb-3"><strong className="mr-3">ID:</strong> {note.id} </p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Descripción:</strong> {note.descripcion}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Fecha:</strong> {note.fecha}</p>
                            <Table scroll={{ x: 'max-content' }}
                                columns={columns}
                                dataSource={note.detalleEgreso}
                                rowKey={(record) => `${record.inventario.nombre}-${record.cantidad}`}
                                pagination={false}
                            />
                        </>
            ) : (
                <p>No se encontraron detalles</p>
            )}
        </Modal>
    );
};

export default EgressNoteDetail;
