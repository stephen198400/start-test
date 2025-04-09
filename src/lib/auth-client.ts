import { createAuthClient } from 'better-auth/react';

const getBaseURL = () => {
	// 如果是 Vercel 预览环境
	if (import.meta.env.VITE_VERCEL_ENV === 'preview') {
		return 'https://dev.manageone.app';
	}
	// 如果是 Vercel 生产环境
	if (import.meta.env.VITE_VERCEL_ENV === 'production') {
		return 'https://manageone.app';
	}
	// 本地开发环境
	return 'http://localhost:3000';
};

export const authClient = createAuthClient({
	baseURL: getBaseURL(),
});
