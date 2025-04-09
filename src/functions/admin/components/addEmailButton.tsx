import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

// 定义表单验证 schema
export const addEmailSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	role: z.enum(['user', 'admin']),
});

type AddEmailFormValues = z.infer<typeof addEmailSchema>;

export function AddEmailButton() {
	const [open, setOpen] = React.useState(false);
	const isMobile = useIsMobile();

	if (!isMobile) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">
						<Plus />
						<span>Add New</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Allowed Email</DialogTitle>
						<DialogDescription>
							Add an allowed email to the list.
						</DialogDescription>
					</DialogHeader>
					<AddEmailForm onSuccess={() => setOpen(false)} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Add Allowed Email</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Add Allowed Email</DrawerTitle>
					<DrawerDescription>
						Add an allowed email to the list. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<AddEmailForm className="px-4" onSuccess={() => setOpen(false)} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

interface AddEmailFormProps extends React.ComponentProps<'form'> {
	onSuccess?: () => void;
}

function AddEmailForm({ className, onSuccess }: AddEmailFormProps) {
	const form = useForm<AddEmailFormValues>({
		resolver: zodResolver(addEmailSchema),
		defaultValues: {
			email: '',
			role: 'user', // 设置默认角色为 user
		},
	});

	const queryClient = useQueryClient();
	async function onSubmit(data: AddEmailFormValues) {
		try {
			console.log(data);
		} catch (error) {
			toast.error('Failed to add email. Please try again.');
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter email address"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="user">User</SelectItem>
									<SelectItem value="admin">Admin</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full mt-4">
					Submit
				</Button>
			</form>
		</Form>
	);
}
