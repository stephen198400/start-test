import { AdminTabs, type TabItem } from '../../admin/components/admin-tabs';
import { LeadsTable, Submission } from './leads-table';

export function LeadsPanel({ leads }: { leads: Submission[] }) {
	// 确保数据类型与 LeadsTable 期望的类型匹配

	const tabs: TabItem[] = [
		{
			value: 'outline',
			label: 'Users Management',
			content: <LeadsTable data={leads} />,
		},
	];

	return <AdminTabs tabs={tabs} defaultTab="outline" />;
}
