import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type LinkGroup } from '@/route-config';
import { Link } from '@tanstack/react-router';

export function NavMarketing({ items }: { items: LinkGroup[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Marketing</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<Link to={item.url} key={item.id}>
							<SidebarMenuItem key={item.id}>
								<SidebarMenuButton tooltip={item.id} className="cursor-pointer">
									{item.icon && (
										<img src={item.icon} alt={item.name} className="w-4 h-4" />
									)}
									<span>{item.name}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
