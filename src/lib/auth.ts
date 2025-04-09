import { db } from '@/db'; // your drizzle instance
import { account, session, user, verification } from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const getBaseURL = () => {
	// 如果是 Vercel 预览环境
	if (process.env.VERCEL_ENV === 'preview') {
		return 'https://dev.manageone.app';
	}
	// 如果是 Vercel 生产环境
	if (process.env.VERCEL_ENV === 'production') {
		return 'https://manageone.app';
	}
	// 本地开发环境
	return 'http://localhost:3000';
};

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	user: {
		deleteUser: {
			enabled: true,
		},
		additionalFields: {
			role: {
				type: 'string',
				required: true,
				defaultValue: 'user',
				input: false,
			},
			status: {
				type: 'string',
				required: true,
				defaultValue: 'active',
				input: false,
			},
		},
	},
	baseURL: getBaseURL(),
	secret: process.env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: user,
			session: session,
			account: account,
			verification: verification,
		},
	}),
});
