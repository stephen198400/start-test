import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	CheckCircle,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Columns,
	MoreVertical,
	Search,
	X,
} from 'lucide-react';
import * as React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartConfig } from '@/components/ui/chart';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';

export const schema = z.object({
	id: z.string(),
	email: z.string(),
	role: z.string(),
	isActive: z.boolean(),
	createdAt: z.date().nullable(),
	updatedAt: z.date().nullable(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="flex items-center justify-start pl-3">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-start pl-3">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
		size: 20,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => {
			return <UserProfileViewer user={row.original} />;
		},
		enableSorting: true,
		enableHiding: false,
		size: 120,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => <div className="w-full">{row.original.role}</div>,
		enableSorting: true,
		size: 160,
	},
	{
		accessorKey: 'isActive',
		header: 'Active',
		cell: ({ row }) => (
			<Badge variant="outline" className="text-muted-foreground px-1.5">
				{row.original.isActive ? 'Active' : 'Inactive'}
			</Badge>
		),
		enableSorting: true,
		size: 100,
	},

	{
		accessorKey: 'createdAt',
		header: 'Registration Date',
		cell: ({ row }) => (
			<div className="w-full">
				{row.original.createdAt
					? row.original.createdAt.toLocaleString()
					: 'Unknown'}
			</div>
		),
		enableSorting: true,
		size: 160,
	},
	{
		accessorKey: 'updatedAt',
		header: 'Last Updated',
		cell: ({ row }) => (
			<div className="w-full">
				{row.original.updatedAt?.toLocaleString() || 'Unknown'}
			</div>
		),
	},
	{
		id: 'actions',
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
						size="icon"
					>
						<MoreVertical />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DropdownMenuItem>View Details</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
		enableSorting: false,
		size: 44,
	},
];

export function AllowedTable({
	data: initialData,
}: {
	data: z.infer<typeof schema>[];
}) {
	// const [data, setData] = React.useState(() => initialData);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	// Update local state when initialData changes
	// React.useEffect(() => {
	// 	setData(initialData);
	// }, [initialData]);

	// 搜索状态
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [searchColumnId, setSearchColumnId] = React.useState<string>('name');

	const table = useReactTable({
		data: initialData,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		columnResizeMode: 'onChange',
	});

	// 获取可搜索的列（排除不想搜索的列，如select和actions）
	const searchableColumns = React.useMemo(() => {
		return table
			.getAllColumns()
			.filter(
				(column) =>
					typeof column.accessorFn !== 'undefined' &&
					column.id !== 'select' &&
					column.id !== 'actions'
			);
	}, [table]);

	// 处理搜索过滤逻辑
	React.useEffect(() => {
		if (searchValue) {
			table.getColumn(searchColumnId)?.setFilterValue(searchValue);
		} else {
			table.getColumn(searchColumnId)?.setFilterValue('');
		}
	}, [searchValue, searchColumnId, table]);

	// 获取当前列的友好名称
	const getCurrentColumnName = React.useMemo(() => {
		// 首字母大写，将驼峰格式转为空格分隔
		const friendlyName = searchColumnId
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase());

		return friendlyName;
	}, [searchColumnId]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2 py-2">
				<div className="flex items-center gap-2">
					{/* 搜索过滤器 */}
					<div className="flex w-full max-w-sm items-center gap-2">
						<div className="relative flex-1 ">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="absolute left-1 top-1/2 z-10 h-7 w-7 -translate-y-1/2 flex items-center justify-center"
									>
										<Search className="text-muted-foreground h-4 w-4" />
										<span className="sr-only">Select search column</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-48 p-2" align="start">
									<p className="mb-2 text-sm font-medium px-2">
										Select search column
									</p>
									{searchableColumns.map((column) => (
										<DropdownMenuItem
											key={column.id}
											className="capitalize"
											onSelect={() => setSearchColumnId(column.id)}
										>
											{column.id.charAt(0).toUpperCase() + column.id.slice(1)}
											{column.id === searchColumnId && (
												<CheckCircle className="ml-auto h-4 w-4" />
											)}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
							<Input
								type="text"
								placeholder="Search users..."
								className="pl-10 h-9"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
							{searchValue && (
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-0.5 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center"
									onClick={() => setSearchValue('')}
								>
									<X className="h-4 w-4" />
									<span className="sr-only">Clear search</span>
								</Button>
							)}
						</div>
					</div>
					{/* column customize */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<Columns />
								<span className="hidden lg:inline">Columns</span>
								<span className="lg:hidden">Columns</span>
								<ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !== 'undefined' &&
										column.getCanHide()
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* 清除排序按钮 */}
					{table.getState().sorting.length > 0 && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setSorting([])}
							className="flex items-center gap-1"
						>
							<X className="size-4" />
							<span>Clear Sort</span>
						</Button>
					)}
				</div>
			</div>
			<div className="overflow-hidden rounded-lg border">
				<Table className="w-full table-fixed [&_th]:pl-3 [&_th]:pr-3 [&_td]:pl-3 [&_td]:pr-3">
					<TableHeader className="bg-muted sticky top-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{ width: header.getSize() }}
											className="text-start"
										>
											{header.isPlaceholder ? null : (
												<div className="flex items-center gap-1">
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{header.column.getCanSort() && (
														<Button
															variant="ghost"
															size="icon"
															className="size-6 ml-1"
															onClick={() =>
																header.column.toggleSorting(undefined, true)
															}
															aria-label={`Sort by ${header.column.id}`}
														>
															<div className="relative flex flex-col items-center justify-center">
																<div
																	className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] ${
																		header.column.getIsSorted() === 'asc'
																			? 'border-b-primary'
																			: 'border-b-muted-foreground/30'
																	} transition-colors duration-200`}
																/>
																<div
																	className={`w-0 h-0 mt-[1px] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] ${
																		header.column.getIsSorted() === 'desc'
																			? 'border-t-primary'
																			: 'border-t-muted-foreground/30'
																	} transition-colors duration-200`}
																/>

																{table.getState().sorting.length > 1 &&
																	header.column.getIsSorted() && (
																		<span className="absolute -right-2.5 -top-0.5 text-[0.6rem] font-bold text-primary">
																			{table
																				.getState()
																				.sorting.findIndex(
																					(sort) => sort.id === header.column.id
																				) + 1}
																		</span>
																	)}
															</div>
														</Button>
													)}
												</div>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{ width: cell.column.getSize() }}
											className="text-start"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No data found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between px-4">
				<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
					Selected {table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} rows.
				</div>
				<div className="flex w-full items-center gap-8 lg:w-fit">
					<div className="hidden items-center gap-2 lg:flex">
						<Label htmlFor="rows-per-page" className="text-sm font-medium">
							Rows per page
						</Label>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
						>
							<SelectTrigger size="sm" className="w-20" id="rows-per-page">
								<SelectValue
									placeholder={table.getState().pagination.pageSize}
								/>
							</SelectTrigger>
							<SelectContent side="top">
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex w-fit items-center justify-center text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</div>
					<div className="ml-auto flex items-center gap-2 lg:ml-0">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeft />
						</Button>
						<Button
							variant="outline"
							className="size-8"
							size="icon"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft />
						</Button>
						<Button
							variant="outline"
							className="size-8"
							size="icon"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRight />
						</Button>
						<Button
							variant="outline"
							className="hidden size-8 lg:flex"
							size="icon"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to last page</span>
							<ChevronsRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--primary)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--primary)',
	},
} satisfies ChartConfig;

function UserProfileViewer({ user }: { user: z.infer<typeof schema> }) {
	const isMobile = useIsMobile();

	return (
		<Drawer direction={isMobile ? 'bottom' : 'right'}>
			<DrawerTrigger asChild>
				<Button variant="link" className="text-foreground w-fit px-0 text-left">
					{capitalizeFirstLetter(user.email.split('@')[0])}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="gap-1">
					<DrawerTitle>
						{capitalizeFirstLetter(user.email.split('@')[0])}
					</DrawerTitle>
					<DrawerDescription>User Details</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
					<Separator />
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<Label htmlFor="email">Email</Label>
							<Input id="email" defaultValue={user.email} />
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="role">Role</Label>
							<Select defaultValue={user.role || 'user'}>
								<SelectTrigger id="role" className="w-full">
									<SelectValue placeholder="Select user role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">
										{capitalizeFirstLetter('administrator')}
									</SelectItem>
									<SelectItem value="editor">
										{capitalizeFirstLetter('editor')}
									</SelectItem>
									<SelectItem value="user">
										{capitalizeFirstLetter('regular user')}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="createdAt">Registration Date</Label>
							<Input
								id="createdAt"
								value={
									user.createdAt ? user.createdAt.toLocaleString() : 'Unknown'
								}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="isActive">Status</Label>
							<Badge
								variant={user.isActive ? 'default' : 'secondary'}
								className="w-fit"
							>
								{user.isActive ? 'Active' : 'Inactive'}
							</Badge>
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
