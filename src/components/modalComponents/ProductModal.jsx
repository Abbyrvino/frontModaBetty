import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, message, Upload, Image } from 'antd';
import { fetchDepartmentsDto, fetchDiscount, fetchImagen } from '../../utils/fetchUtil';
import { createProducto } from '../../utils/postUtil';

const { Option } = Select;

const ProductModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [Departments, setDepartments] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [Images, setImages] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    const getDatos = async () => {
        await fetchDepartmentsDto().then((departments)=> setDepartments(departments));
        await fetchDiscount().then((discounts) => setDiscounts(discounts));
        await fetchImagen().then((images)=>setImages(images));
    }

    useEffect(()=>{
        getDatos();
    },[])

    const handleSelect = (department) => {
        setCategorias(department.category);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
          const values = await form.validateFields();
      
          const mapedValues = {
            nombre: values.productName,
            precio: values.price,
            imagen: {
                id: values.imagen
            },
            category: {
              id: values.category
            },
            descuento: {
              id: values.discount
            }
          };
      
          await createProducto(mapedValues);
          
          form.resetFields();
          setIsModalOpen(false);
          success();
        } catch (info) {
          console.log('Validate Failed:', info);
        }
      };
      

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const success = () => {
        messageApi.success('Producto guardado exitosamente');
    };


    return (
        <>
            <Button className="w-full font-bold" onClick={showModal}>
                Agregar Producto
            </Button>
            <Modal
                title="Agregar Producto"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="product_form"
                >
                    <Form.Item
                        name="productName"
                        label="Nombre del Producto"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del producto' }]}
                    >
                        <Input placeholder="Nombre del Producto" />
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="Departamento"
                        rules={[{ required: true, message: 'Por favor selecciona un departamento' }]}
                    >
                        <Select onSelect={(value, option) => handleSelect(option.department)} placeholder="Selecciona un departamento">
                            {Departments.map(department => (
                                <Option key={department.id} value={department.id} department={department}>
                                    {department.nombre}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Categoría"
                        rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
                    >
                        <Select placeholder="Selecciona una categoría">
                            {categorias.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.nombre}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Descuento (%)"
                        rules={[
                            { required: true, message: 'Por favor ingresa un descuento' },
                        ]}
                    >
                        <Select placeholder="Selecciona un descuento">
                            {discounts.map(discount => (
                                <Option key={discount.id} value={discount.id}>
                                    {discount.descripcion}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="imagen"
                        label="Imagen"
                        rules={[{ required: true, message: 'Por favor selecciona una Imagen' }]}
                    >
                        <Select placeholder="Selecciona una Imagen">
                            {Images.map(imagen => (
                                <Option key={imagen.id} value={imagen.id}>
                                    {imagen.descripcion}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Precio"
                        rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
                    >
                        <Input
                            type="number"
                            placeholder="Precio"
                            prefix="$"
                        />
                    </Form.Item>
                </Form>
                {contextHolder}
            </Modal>
        </>
    );
};

export default ProductModal;
