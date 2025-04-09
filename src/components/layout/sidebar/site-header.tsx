import { BreadcrumbNavigation } from '@/components/shared/breadcrumb-navigation';
import CaliforniaTime from '@/components/shared/california-time';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function SiteHeader() {
	return (
		<header className="flex h-10 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 pt-safe">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<div className="flex-1">
					<BreadcrumbNavigation />
				</div>
				<div className="ml-auto flex items-center gap-2">
					<CaliforniaTime />
				</div>
			</div>
		</header>
	);
}
