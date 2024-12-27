import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SneakMax/',
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
  server: {
    host: true, //включить автообновление страницы
    open: true, //открыть браузер при старте
    port: 3000, //порт
  },
});