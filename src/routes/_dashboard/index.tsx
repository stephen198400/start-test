import { ChartAreaInteractive } from '@/components/shared/chart-area-interactive';
import { DataTable } from '@/components/shared/data-table';
import { SectionCards } from '@/components/shared/section-cards';
import data from '@/dashboard/data.json';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
			<div className="px-4 lg:px-6">
				<ChartAreaInteractive />
			</div>
			<DataTable data={data} />
		</div>
	);
}
