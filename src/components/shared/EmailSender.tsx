import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { useState } from 'react';

export const EmailSender = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<{
		success?: boolean;
		message: string;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setStatus(null);

		try {
			const response = await fetch('/api/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					to: [email],
					subject: '欢迎使用我们的服务',
					firstName: name,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || '发送邮件失败');
			}

			setStatus({
				success: true,
				message: '邮件发送成功！',
			});
		} catch (error) {
			setStatus({
				success: false,
				message: (error as Error).message || '发送邮件失败',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-xl font-bold">发送测试邮件</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">邮箱地址</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="请输入接收邮件的邮箱"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="name">姓名</Label>
					<Input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="请输入接收者姓名"
						required
					/>
				</div>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? '发送中...' : '发送邮件'}
				</Button>
				{status && (
					<div
						className={`p-2 mt-2 text-sm ${
							status.success
								? 'bg-green-100 text-green-700'
								: 'bg-red-100 text-red-700'
						} rounded`}
					>
						{status.message}
					</div>
				)}
			</form>
		</div>
	);
};
