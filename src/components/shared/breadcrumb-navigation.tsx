import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useRouter, useRouterState } from '@tanstack/react-router';

interface RouteSegment {
	path: string;
	label: string;
	href: string;
}

export function BreadcrumbNavigation() {
	const router = useRouter();
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;

	// 忽略 _dashboard 路径前缀
	const normalizedPath = pathname.replace(/^\/(_dashboard)?/, '');

	// 生成面包屑路径段
	const segments: RouteSegment[] = [];

	if (normalizedPath && normalizedPath !== '/') {
		const parts = normalizedPath.split('/').filter(Boolean);

		parts.forEach((part, index) => {
			const path = parts.slice(0, index + 1).join('/');
			const href = `/${path}`;

			// 格式化标签（将短横线替换为空格并大写每个单词的首字母）
			const label = part
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');

			segments.push({ path, label, href });
		});
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{segments.map((segment, index) => (
					<BreadcrumbItem key={segment.path}>
						{index === segments.length - 1 ? (
							<BreadcrumbPage>{segment.label}</BreadcrumbPage>
						) : (
							<>
								<BreadcrumbLink asChild>
									<Link to={segment.href}>{segment.label}</Link>
								</BreadcrumbLink>
								<BreadcrumbSeparator />
							</>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
