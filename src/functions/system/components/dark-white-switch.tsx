import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export function DarkWhiteSwitch() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// 初始化时根据当前 html 是否有 dark 类设置状态
		setIsDark(document.documentElement.classList.contains('dark'));
	}, []);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);

		if (newIsDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	};

	return <Switch checked={isDark} onCheckedChange={toggleTheme} />;
}
