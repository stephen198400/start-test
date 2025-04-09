import { allowedQuery } from '@/functions/admin/hooks/allowedQuery';
import { usersQuery } from '@/functions/admin/hooks/usersQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/_dashboard/admin')({
	component: RouteComponent,
});

function AdminContent() {
	const { data: users } = useSuspenseQuery(usersQuery());
	const { data: allowedEmails } = useSuspenseQuery(allowedQuery());

	if (!users || !allowedEmails) return null;
	return (
		<div>
			<h1>Admin</h1>
		</div>
	);
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
				<AdminContent />
			</Suspense>
		</div>
	);
}
