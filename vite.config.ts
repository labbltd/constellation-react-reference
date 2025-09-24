import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@labb/dx-engine/auth.html",
          dest: "./"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/bootstrap-shell.js",
          dest: "./"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/bootstrap-shell.*.*",
          dest: "./"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/lib_asset.json",
          dest: "./"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/constellation-core.*",
          dest: "./prerequisite"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/constellation-core.*.*",
          dest: "./prerequisite"
        },
        {
          src: "./node_modules/@pega/constellationjs/dist/js/*.*",
          dest: "./prerequisite/js"
        }
      ]
    })
],
})
