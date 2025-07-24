import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@shared/components': path.resolve(__dirname, './src/shared/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@store': path.resolve(__dirname, './src/store'),
      '@router': path.resolve(__dirname, './src/router'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['client.chutneyads.local'],
  }
})





