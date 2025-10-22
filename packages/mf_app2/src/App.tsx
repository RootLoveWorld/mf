import React, { Suspense } from 'react';
import { Card, Button } from 'mf_shared';
import './App.css';

// 动态导入远程组件
const RemoteHeader = React.lazy(() => import('mf_app1/Header'));
const RemoteProductList = React.lazy(() => import('mf_app1/ProductList'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>加载 Header 中...</div>}>
        <RemoteHeader />
      </Suspense>
      
      <main className="main-content">
        <Card title="消费者应用 (mf_app2)">
          <p>这是消费者应用，使用来自 mf_app1 的远程组件</p>
          <Button onClick={() => alert('本地按钮点击')}>
            本地按钮
          </Button>
        </Card>

        <div style={{ marginTop: '2rem' }}>
          <h2>远程产品列表</h2>
          <Suspense fallback={<div>加载产品列表中...</div>}>
            <RemoteProductList />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default App;