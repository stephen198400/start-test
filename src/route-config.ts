// 导入 SVG 图标
import adminIcon from './assets/icons/admin.svg';
import dashboardIcon from './assets/icons/dashboard.svg';
import websiteIcon from './assets/icons/data.svg';
import linkIcon from './assets/icons/link.svg';
import projectIcon from './assets/icons/project.svg';
import settingIcon from './assets/icons/setting.svg';
import taskIcon from './assets/icons/task.svg';
export interface LinkGroup {
	id: string;
	name: string;
	isPublic: boolean;
	url: string;
	icon: string; // 修改为 string 类型，用于存储图标路径
}

interface DashboardNavConfig {
	navMain: LinkGroup[];
	navMarketing: LinkGroup[];
	navBottom: LinkGroup[];
	links: LinkGroup[];
}

export const routes: DashboardNavConfig = {
	navMain: [
		{
			id: 'dashboard',
			name: 'Dashboard',
			isPublic: true,
			url: '/',
			icon: dashboardIcon,
		},
		{
			id: 'tasks',
			name: 'Tasks',
			isPublic: true,
			url: '/tasks',
			icon: taskIcon,
		},
		{
			id: 'projects',
			name: 'Projects',
			isPublic: true,
			url: '/projects',
			icon: projectIcon,
		},
	],
	navMarketing: [
		{
			id: 'website',
			name: 'Website',
			isPublic: true,
			url: '/website',
			icon: websiteIcon,
		},
	],
	navBottom: [
		{
			id: 'settings',
			name: 'Settings',
			isPublic: true,
			url: '/settings',
			icon: settingIcon,
		},
		{
			id: 'admin',
			name: 'Admin',
			isPublic: false,
			url: '/admin',
			icon: adminIcon,
		},
	],
	links: [
		{
			id: 'thumbtack',
			name: 'Thumbtack',
			isPublic: true,
			url: '/thumbtack',
			icon: linkIcon,
		},
		{
			id: 'home-depot',
			name: 'HomeDepot',
			isPublic: true,
			url: '/home-depot',
			icon: linkIcon,
		},
		{
			id: 'pandadoc',
			name: 'Pandadoc',
			isPublic: true,
			url: '/pandadoc',
			icon: linkIcon,
		},
	],
};
