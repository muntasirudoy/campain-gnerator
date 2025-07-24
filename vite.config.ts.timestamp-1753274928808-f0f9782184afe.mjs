// vite.config.ts
import { defineConfig } from "file:///D:/chutney-ads-web-app/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/chutney-ads-web-app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwindcss from "file:///D:/chutney-ads-web-app/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\chutney-ads-web-app";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@shared/components": path.resolve(__vite_injected_original_dirname, "./src/shared/components"),
      "@views": path.resolve(__vite_injected_original_dirname, "./src/views"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts"),
      "@store": path.resolve(__vite_injected_original_dirname, "./src/store"),
      "@router": path.resolve(__vite_injected_original_dirname, "./src/router"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@constant": path.resolve(__vite_injected_original_dirname, "./src/constant"),
      "@lib": path.resolve(__vite_injected_original_dirname, "./src/lib"),
      "@shared": path.resolve(__vite_injected_original_dirname, "./src/shared"),
      "@types": path.resolve(__vite_injected_original_dirname, "./src/types")
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["client.chutneyads.local"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjaHV0bmV5LWFkcy13ZWItYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjaHV0bmV5LWFkcy13ZWItYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jaHV0bmV5LWFkcy13ZWItYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB0YWlsd2luZGNzcygpLFxyXG4gIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgJ0BzaGFyZWQvY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zaGFyZWQvY29tcG9uZW50cycpLFxyXG4gICAgICAnQHZpZXdzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3ZpZXdzJyksXHJcbiAgICAgICdAbGF5b3V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9sYXlvdXRzJyksXHJcbiAgICAgICdAc3RvcmUnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3RvcmUnKSxcclxuICAgICAgJ0Byb3V0ZXInOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcm91dGVyJyksXHJcbiAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcclxuICAgICAgJ0Bjb25zdGFudCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb25zdGFudCcpLFxyXG4gICAgICAnQGxpYic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9saWInKSxcclxuICAgICAgJ0BzaGFyZWQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc2hhcmVkJyksXHJcbiAgICAgICdAdHlwZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdHlwZXMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IHRydWUsXHJcbiAgICBwb3J0OiA1MTczLFxyXG4gICAgYWxsb3dlZEhvc3RzOiBbJ2NsaWVudC5jaHV0bmV5YWRzLmxvY2FsJ10sXHJcbiAgfVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1AsU0FBUyxvQkFBb0I7QUFDclIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0UsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3pELHNCQUFzQixLQUFLLFFBQVEsa0NBQVcseUJBQXlCO0FBQUEsTUFDdkUsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFlBQVksS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUNuRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDM0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGNBQWMsQ0FBQyx5QkFBeUI7QUFBQSxFQUMxQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
