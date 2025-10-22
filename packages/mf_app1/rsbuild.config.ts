import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypescript } from '@rsbuild/plugin-typescript';
import { ModuleFederationPlugin } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTypescript(),
    ModuleFederationPlugin({
      name: 'mf_app1',
      exposes: {
        './Header': './src/components/Header',
        './ProductList': './src/components/ProductList',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 3001,
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
});