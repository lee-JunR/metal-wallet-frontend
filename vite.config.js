import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "https://matalwallet.duckdns.org/metal-wallet-server",
				changeOrigin: true,
				secure: true, // HTTPS 사용
				rewrite: (path) => path.replace(/^\/api/, "api"), // '/api' 경로 유지
			},
		},
	},
});
