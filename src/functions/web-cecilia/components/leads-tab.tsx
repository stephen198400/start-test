import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

export type TabItem = {
	value: string;
	label: string;
	badgeCount?: number;
	content: ReactNode;
};

type LeadsTabsProps = {
	tabs: TabItem[];
	defaultTab?: string;
};

export function LeadsTabs({ tabs, defaultTab }: LeadsTabsProps) {
	const defaultTabValue = defaultTab || tabs[0]?.value || 'outline';

	return (
		<Tabs
			defaultValue={defaultTabValue}
			className="w-full flex-col justify-start gap-6"
		>
			<div className="flex items-center justify-between px-4 lg:px-6">
				<Label htmlFor="view-selector" className="sr-only">
					View
				</Label>
				<Select defaultValue={defaultTabValue}>
					<SelectTrigger
						className="flex w-fit @4xl/main:hidden cursor-pointer"
						size="sm"
						id="view-selector"
					>
						<SelectValue placeholder="Select a view" />
					</SelectTrigger>
					<SelectContent></SelectContent>
				</Select>
				<TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="cursor-pointer"
						>
							{tab.label}
							{tab.badgeCount ? (
								<Badge variant="secondary">{tab.badgeCount}</Badge>
							) : null}
						</TabsTrigger>
					))}
				</TabsList>
				<div className="w-40">{/* 空的div占位，保持布局平衡 */}</div>
			</div>

			{tabs.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
