import React from 'react';
import { Card, Button } from 'mf_shared';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: '总用户', value: '1,234' },
    { label: '今日访问', value: '567' },
    { label: '销售额', value: '¥12,345' },
    { label: '订单数', value: '89' },
  ];

  return (
    <Card title="仪表板">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            textAlign: 'center', 
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => alert('刷新数据')}>
        刷新数据
      </Button>
    </Card>
  );
};