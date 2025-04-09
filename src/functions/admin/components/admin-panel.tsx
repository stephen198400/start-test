import { allowedEmails } from './admin-table';

import { AdminTabs, type TabItem } from './admin-tabs';
import { AllowedTable } from './allowed-table';

// 移除了模拟数据

interface AdminPanelProps {
	allowedEmails: allowedEmails[];
}
export function AdminPanel({ allowedEmails }: AdminPanelProps) {
	// 转换数据结构从snake_case到camelCase
	const transformedEmails = allowedEmails.map((email) => ({
		id: email.id,
		email: email.email,
		role: email.role,
		isActive: email.is_active,
		createdAt: email.created_at ? new Date(email.created_at) : null,
		updatedAt: email.updated_at ? new Date(email.updated_at) : null,
	}));

	// 定义tabs内容
	const tabs: TabItem[] = [
		// {
		// 	value: 'outline',
		// 	label: 'Users Management',
		// 	content: <AdminTable data={users} />,
		// },
		{
			value: 'past-performance',
			label: 'Allowed Emails',
			content: <AllowedTable data={transformedEmails} />,
		},
	];

	return (
		<div className="w-full">
			<AdminTabs tabs={tabs} defaultTab="outline" />
		</div>
	);
}
