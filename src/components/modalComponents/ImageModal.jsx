import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { createImagen } from '../../utils/postUtil';

const ImageModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [description, setDescription] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const uploadFile = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'ylte0sql');
        try{
            const response = await fetch('https://api.cloudinary.com/v1_1/dnlxikysd/image/upload', {
                method: 'POST',
                body: formData,
            });
          const data = await response.json();
          await postImagen(data.url);
          success();
        }catch (error) {
            message.error("Error al subir la imagen al servidor.");
        }
        }
        
    const postImagen = async (image) => {
        const Imagen = {
            enlace: image,
            descripcion: description || "default image"
            }
        await createImagen(Imagen);
        setUploading(false);
    }

    const handleOk = async () => {
        if (imageFile && description.trim() !== '') {
            await uploadFile();
            setImageFile(null);
            setDescription('');
            setIsModalOpen(false);
        } else {
            message.error('Se debe seleccionar una imagen y proporcionar una descripción');
        }
    };

    const handleCancel = () => {
        setImageFile(null);
        setIsModalOpen(false);
    };

    const success = () => {
        messageApi.success('Imagen subida exitosamente');
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImageFile(file);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Subir Imagen
            </Button>
            <Modal
                title="Subir Imagen"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: uploading || !imageFile }}
                confirmLoading={uploading}
            >
                <Input
                    placeholder="Descripción de la imagen"
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ marginBottom: '20px' }}
                />
                <div
                    style={{
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {imageFile ? (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Imagen seleccionada"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    ) : (
                        <p>Arrastra una imagen aquí</p>
                    )}
                </div>
                <input
                    type="file"
                    name="imagen"
                    id=""
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default ImageModal;
