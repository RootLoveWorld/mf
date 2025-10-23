import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'mf_app2',
      remotes: {
        mf_app1: 'mf_app1@http://localhost:3001/remoteEntry.js',
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
    port: 3002,
  },
  dev: {
    assetPrefix: 'http://localhost:3002',
  },
});