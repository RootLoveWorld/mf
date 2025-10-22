import React, { useState } from 'react';
import { Card, Button } from 'mf_shared';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const ProductList: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: '产品 A', price: 99, description: '这是产品 A 的描述' },
    { id: 2, name: '产品 B', price: 199, description: '这是产品 B 的描述' },
    { id: 3, name: '产品 C', price: 299, description: '这是产品 C 的描述' },
  ]);

  const handleAddToCart = (product: Product) => {
    alert(`已添加 ${product.name} 到购物车`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>产品列表</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {products.map(product => (
          <Card key={product.id} title={product.name}>
            <p>{product.description}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1890ff' }}>
              ¥{product.price}
            </p>
            <Button onClick={() => handleAddToCart(product)}>
              添加到购物车
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};