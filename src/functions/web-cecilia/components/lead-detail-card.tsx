import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/shared/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@radix-ui/react-select';
import { Separator } from '@radix-ui/react-separator';
import { capitalizeFirstLetter } from 'better-auth';
import { Submission } from './leads-table';

export function LeadDetailCard({ lead }: { lead: Submission }) {
	const isMobile = useIsMobile();

	return (
		<Drawer direction={isMobile ? 'bottom' : 'right'}>
			<DrawerTrigger asChild>
				<Button
					variant="link"
					className="text-foreground w-fit cursor-pointer px-0 text-left"
				>
					{capitalizeFirstLetter(lead.email)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="">
				<DrawerHeader className="gap-1">
					<DrawerTitle>{lead.email}</DrawerTitle>
					<DrawerDescription>Lead Details</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
					111
					<Separator />
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<Label htmlFor="name">Username</Label>
							<Input id="name" defaultValue={lead.email} />
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="email">Email</Label>
							<Input id="email" defaultValue={lead.email} />
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="role">Role</Label>
							<Select defaultValue="user">
								<SelectTrigger id="role" className="w-full">
									<SelectValue placeholder="Select user role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">Administrator</SelectItem>
									<SelectItem value="editor">Editor</SelectItem>
									<SelectItem value="user">Regular User</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="createdAt">Registration Date</Label>
							<Input
								id="createdAt"
								value={
									lead.created_at ? lead.created_at.toLocaleString() : 'Unknown'
								}
								disabled
							/>
						</div>
					</form>
				</div>
				<DrawerFooter>
					<Button>Save</Button>
					<DrawerClose asChild>
						<Button variant="outline">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
