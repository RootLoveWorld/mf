import React from 'react';
import { Button } from 'mf_shared';

export const Header: React.FC = () => {
  return (
    <header style={{ 
      background: '#1890ff', 
      color: 'white', 
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>微前端应用</h1>
      <nav>
        <Button variant="secondary" onClick={() => alert('导航点击')}>
          导航
        </Button>
      </nav>
    </header>
  );
};

export default Header;