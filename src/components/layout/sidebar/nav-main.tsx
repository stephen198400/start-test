import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type LinkGroup } from '@/route-config';
import { Link } from '@tanstack/react-router';

export function NavMain({ items }: { items: LinkGroup[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<Link to={item.url} key={item.id}>
							<SidebarMenuItem key={item.id}>
								<SidebarMenuButton tooltip={item.id} className="cursor-pointer">
									<img src={item.icon} alt={item.name} className="w-4 h-4" />
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
