import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CategorySelector from './CategorySelector';
import ProductList from './ProductList';
import Navbar from '../Navbar';

const Homes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
        <Navbar title={"Home"}></Navbar>
      <Row gutter={16}>
        <Col span={6}>
          <CategorySelector onCategorySelect={handleCategorySelect} />
        </Col>
        <Col span={18}>
          <ProductList selectedCategory={selectedCategory} />
        </Col>
      </Row>
    </div>
  );
};

export default Homes;
