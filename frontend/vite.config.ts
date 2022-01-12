import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { minifyHtml } from 'vite-plugin-html';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [preact(), vanillaExtractPlugin(), minifyHtml()],
  define: {
    'process.env.VITE_BACKEND_API_URL': `"${process.env.VITE_BACKEND_API_URL}"`,
  },
});
