import React, { useState } from 'react';
import { Upload, Button, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadImage = () => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(fileList[0].originFileObj);
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = () => {
        if (fileList.length === 0) {
            message.error("No hay imagen");
            return;
        }
        // Simula el envío al backend
        console.log('guarda en el backend:', fileList[0].originFileObj);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h3 className="h3">Subir QR</h3>
            <Form onFinish={handleSubmit}>
                <Form.Item className="mb-4 flex justify-center">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false} // Prevent auto upload
                        className="text-center"
                    >
                        {fileList.length === 0 && (
                            <div>
                                <UploadOutlined style={{ fontSize: '32px' }} />
                                <div className="mt-2 text-sm text-gray-600">Haz clic para seleccionar o arrastra aquí</div>
                            </div>
                        )}
                    </Upload>
                    {previewImage && (
                        <div className="mt-4">
                            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit">
                        Guardar QR
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadImage;
