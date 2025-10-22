import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypescript } from '@rsbuild/plugin-typescript';
import { ModuleFederationPlugin } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTypescript(),
    ModuleFederationPlugin({
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
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 3003,
  },
  dev: {
    assetPrefix: 'http://localhost:3003',
  },
});