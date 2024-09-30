import React, { useState, useEffect } from 'react';
import { List, Spin } from 'antd';
import { fetchCategory } from './datosTest';

const CategorySelector = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

    const getDatos = async () => {
        await fetchCategory().then(categories => setCategories(categories));
        console.log(categories);
        setLoading(false);
    }

  useEffect(() => {
    //Traer las categorias
    getDatos();
  }, []);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <List className='border-2'
      dataSource={categories}
      renderItem={(category) => (
        <List.Item onClick={() => handleCategoryClick(category)} className='cursor-pointer hover:bg-slate-200' >
          <p className='m-auto'>{category.nombre}</p>
        </List.Item>
      )}
    />
  );
};

export default CategorySelector;
