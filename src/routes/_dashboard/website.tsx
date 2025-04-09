import { LeadsPanel } from '@/functions/web-cecilia/components/leads-panel';
import { leadsQuery } from '@/functions/web-cecilia/hooks/useLeadsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/_dashboard/website')({
	component: RouteComponent,
});

function LeadsContent() {
	const { data: leads } = useSuspenseQuery(leadsQuery());
	if (!leads) return null;
	return <LeadsPanel leads={leads} />;
}

function RouteComponent() {
	return (
		<div>
			<Suspense
				fallback={
					<div className="flex justify-center items-center h-48">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</div>
				}
			>
				<LeadsContent />
			</Suspense>
		</div>
	);
}
