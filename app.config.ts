// app.config.ts
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

import svgr from 'vite-plugin-svgr';
export default defineConfig({
	server: {
		preset: 'vercel',
	},
	tsr: {
		appDirectory: 'src',
	},
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
			svgr({
				svgrOptions: {
					icon: true,
					// SVG 配置选项
					svgoConfig: {
						plugins: [
							{
								name: 'removeViewBox',
								active: false,
							},
						],
					},
				},
			}),
		],
	},
});
