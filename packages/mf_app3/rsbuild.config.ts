import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'mf_app3',
      // 既暴露组件又消费组件
      exposes: {
        './Dashboard': './src/components/Dashboard',
        './UserProfile': './src/components/UserProfile',
      },
      remotes: {
        mf_app1: 'mf_app1@http://localhost:3001/mf-manifest.json',
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: '^19.2.0',
          eager: true
        },
        'react-dom': { 
          singleton: true,
          requiredVersion: '^19.2.0',
          eager: true
        },
      },
    }),
  ],
  server: {
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  dev: {
    assetPrefix: 'http://localhost:3003',
  },
});