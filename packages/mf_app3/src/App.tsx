import React, { Suspense } from 'react';
import { Card, Button } from 'mf_shared';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import './App.css';

// 导入远程组件
const RemoteHeader = React.lazy(() => import('mf_app1/Header'));
const RemoteProductList = React.lazy(() => import('mf_app1/ProductList'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>加载 Header 中...</div>}>
        <RemoteHeader />
      </Suspense>
      
      <main className="main-content">
        <Card title="混合应用 (mf_app3)">
          <p>这是混合应用，既提供组件又消费其他应用的组件</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button onClick={() => alert('切换到仪表板')}>
              仪表板
            </Button>
            <Button variant="secondary" onClick={() => alert('查看用户资料')}>
              用户资料
            </Button>
          </div>
        </Card>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div>
            <h2>本地组件</h2>
            <Dashboard />
            <UserProfile />
          </div>
          
          <div>
            <h2>远程组件</h2>
            <Suspense fallback={<div>加载产品列表中...</div>}>
              <RemoteProductList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;