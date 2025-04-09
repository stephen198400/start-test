/**
 * 从 timestamptz 字符串或 Date 对象中提取月份（1-12）
 * @param input timestamptz 字符串或 Date 对象
 * @returns 月份（1-12）
 */
export function getMonthFromTz(input: string | Date): number {
	const date = typeof input === 'string' ? new Date(input) : input;
	if (isNaN(date.getTime())) {
		throw new Error('Invalid timestamptz input');
	}
	return date.getMonth() + 1; // JavaScript月份从0开始，+1调整为1-12
}
/**
 * 从 timestamptz 字符串或 Date 对象中提取年份和月份，格式为 'YYYY-MM'
 * @param input timestamptz 字符串或 Date 对象
 * @returns 形如 '2024-05' 的字符串
 */
export function getYearMonthFromTz(input: string | Date): string {
	const date = typeof input === 'string' ? new Date(input) : input;
	if (isNaN(date.getTime())) {
		throw new Error('Invalid timestamptz input');
	}
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 补零
	return `${year}-${month}`;
}

/**
 * 从 timestamptz 字符串或 Date 对象中提取格式化的时间字符串，形如 'HH:MM UTC+8'
 * @param input timestamptz 字符串或 Date 对象
 * @returns 形如 '14:30 UTC+8' 的字符串
 */
export function getTimeInfoFromTz(input: string | Date): string {
	const date = typeof input === 'string' ? new Date(input) : input;
	if (isNaN(date.getTime())) {
		throw new Error('Invalid timestamptz input');
	}

	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');

	const offsetMinutes = -date.getTimezoneOffset(); // 注意符号，正数为东区
	const sign = offsetMinutes >= 0 ? '+' : '-';
	const absOffset = Math.abs(offsetMinutes);
	const offsetHours = Math.floor(absOffset / 60);
	const offsetMins = absOffset % 60;
	const timezone = `UTC${sign}${offsetHours}${offsetMins === 0 ? '' : ':' + offsetMins.toString().padStart(2, '0')}`;

	return `${hour}:${minute} ${timezone}`;
}
