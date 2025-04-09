import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { SiteHeader } from '@/components/layout/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar variant="inset" />
				<SidebarInset>
					<SiteHeader />
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2 py-4">
							<Outlet />
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
