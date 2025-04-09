import * as React from 'react';

import logo from '@/assets/icons/logo.svg';
import { NavBottom } from '@/components/layout/sidebar/nav-bottom';
import { NavMain } from '@/components/layout/sidebar/nav-main';
import { NavUser } from '@/components/layout/sidebar/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { routes } from '@/route-config';
import { NavLinks } from './nav-links';
import { NavMarketing } from './nav-marketing';
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
	const userRoutes = routes;

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<img src={logo} alt="ManageOne" className="w-6 h-6" />
								<span className="text-base font-semibold">ManageOne</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={userRoutes.navMain || []} />
				<NavMarketing items={userRoutes.navMarketing || []} />
				<NavLinks items={userRoutes.links || []} />
				<NavBottom items={userRoutes.navBottom || []} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
