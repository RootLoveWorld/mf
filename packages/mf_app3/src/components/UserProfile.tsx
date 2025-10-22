import React, { useState } from 'react';
import { Card, Button } from 'mf_shared';

export const UserProfile: React.FC = () => {
  const [user] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    avatar: '👤',
    joinDate: '2023-01-15'
  });

  return (
    <Card title="用户资料">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ 
          fontSize: '3rem', 
          marginRight: '1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {user.avatar}
        </div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{user.name}</h3>
          <p style={{ margin: '0', color: '#666' }}>{user.role}</p>
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>邮箱:</strong> {user.email}</p>
        <p><strong>加入时间:</strong> {user.joinDate}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => alert('编辑资料')}>
          编辑资料
        </Button>
        <Button variant="secondary" onClick={() => alert('更改密码')}>
          更改密码
        </Button>
      </div>
    </Card>
  );
};