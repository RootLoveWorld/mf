import React from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>Provider App (mf_app1)</h1>
        <p>这是提供者应用，暴露 Header 和 ProductList 组件</p>
        <ProductList />
      </main>
    </div>
  );
};

export default App;