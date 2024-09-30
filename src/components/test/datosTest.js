import { message } from "antd";
import { api } from "../../api/axios";


const fetchCategory = async () => {
    try {
      const response = await api.get("/category");
      if (response.status === 200) {
        const filteredData = response.data.map((category) => ({
          id: category.id,
          nombre: category.nombre, 
        }));
        return filteredData;
      }
    } catch (error) {
      console.error('fetchCategoria: Error al obtener datos Categoria:', error);
      message.error('Error al obtener datos');
    }
  };
const fetchProducts = async (category) => {
    try {
      const response = await api.get(`/producto/category/${category.id}`);
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      }
    } catch (error) {
      console.error('fetchCategoria: Error al obtener datos Categoria:', error);
      message.error('Error al obtener datos');
    }
  };

  export {
    fetchCategory,
    fetchProducts,
  }