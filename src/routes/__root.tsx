import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
} from '@tanstack/react-router';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Toaster } from '@/components/ui/sonner';

import appCss from '@/styles/app.css?url';
import { QueryClient } from '@tanstack/react-query';

// const getUser = createServerFn({ method: 'GET' }).handler(async () => {
// 	const { headers } = getWebRequest()!;
// 	const session = await auth.api.getSession({ headers });

// 	return session?.user || null;
// });

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	// user: Awaited<ReturnType<typeof getUser>>;
	// userRoutes: ReturnType<typeof getUserRoutes>;
}>()({
	// beforeLoad: async ({ context }) => {
	// 	const user = await context.queryClient.fetchQuery({
	// 		queryKey: ['user'],
	// 		queryFn: ({ signal }) => getUser({ signal }),
	// 	});

	// 	// 如果用户已登录，预获取路由权限
	// 	let allowedRoutes = [];
	// 	if (user?.id) {
	// 		allowedRoutes = await context.queryClient.fetchQuery({
	// 			queryKey: ['allowedRoutes', user.id],
	// 			queryFn: async () => {
	// 				return await getAllowedRoutes({ data: user.id });
	// 			},
	// 		});
	// 	}
	// 	const userRoutes = getUserRoutes(user?.id, allowedRoutes);
	// 	return { user, userRoutes };
	// },
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1, viewport-fit=cover',
			},
			{
				title: 'ManageOne - Dev Preview',
			},
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: '/favicon.ico' },
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
			{ rel: 'manifest', href: '/manifest.json' },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		// suppress since we're updating the "dark" class in a custom script below
		<html suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
				</ScriptOnce>

				{children}
				<Toaster />
				<ReactQueryDevtools buttonPosition="bottom-right" />
				<TanStackRouterDevtools position="bottom-right" />

				<Scripts />
			</body>
		</html>
	);
}
