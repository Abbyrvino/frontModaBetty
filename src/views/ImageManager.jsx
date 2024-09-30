import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, message, Space } from 'antd';
import ImageModal from '../components/modalComponents/ImageModal';
import { fetchImagen } from '../utils/fetchUtil';


const ImageManager = () => {
    const [imageData, setImageData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const getDatos = async () => {
        await fetchImagen().then((data)=>setImageData(data));
    }

    useEffect(() => {
        getDatos();
    }, []);

    const showModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Descripcion ',
            dataIndex: 'descripcion',
            key: 'descripcion',
            render: (text) => <a target="_blank" rel="noopener noreferrer">{text}</a>,
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}>Ver Imagen</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h3 className="h3">Gestionar Imágenes</h3>
            <Table
                columns={columns}
                dataSource={imageData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
            <Modal
                title="Vista Previa de la Imagen"
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedImage && (
                    <img
                        src={`${selectedImage.enlace}`}
                        alt={`Imagen ID: ${selectedImage.id}`}
                        style={{ width: '100%' }}
                    />
                )}
            </Modal>

            <div className="custom-button">
               <ImageModal/>
            </div>
        </div>
    );
};

export default ImageManager;
