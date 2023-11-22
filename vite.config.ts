import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  // 配置项目别名
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
  server: {
    proxy: {
      // 使用本地代理服务器发送请求
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite(path) {
          return path.replace("/api", "");
        },
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  base: "./",
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/var.scss";',
      },
    },
  },
});
