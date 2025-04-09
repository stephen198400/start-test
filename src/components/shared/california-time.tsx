import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';

function CaliforniaTime() {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setNow(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const californiaTimeZone = 'America/Los_Angeles';

	// 转换为加州时间
	const californiaDate = toZonedTime(now, californiaTimeZone);

	// 格式化
	const formatted = format(californiaDate, 'HH:mm');

	return (
		<div className="text-sm font-mono flex items-center gap-1">
			CA <span className="text-sm">{formatted}</span>
		</div>
	);
}

export default CaliforniaTime;
