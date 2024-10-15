import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/metal-wallet-frontend/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	define: {
		API_BASE_URL: JSON.stringify(
			"https://matalwallet.duckdns.org/metal-wallet-server/api"
		),
	},
	server: {
		proxy: {
			"/api": {
				target: "https://matalwallet.duckdns.org/metal-wallet-server",
				changeOrigin: true, // 필요 시 CORS 문제 해결
				secure: true, // HTTPS 사용
				rewrite: (path) => path.replace(/^\/api/, "api"), // '/api' 경로 유지
			},
		},
	},
});
