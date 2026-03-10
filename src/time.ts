/**
 * 计算过去时间到现在的间隔
 * @param pastTime Unix 时间戳（秒）
 * @returns 形如 "1小时 5分3秒" 的文本，输入不合法时返回空字符串
 */
export const getTimeAgo = (pastTime: number | string): string => {
	const timestampInSeconds = Number(pastTime);

	if (!Number.isFinite(timestampInSeconds) || timestampInSeconds <= 0) {
		return "";
	}

	const diffMs = Date.now() - timestampInSeconds * 1000;
	const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours}小时 ${minutes}分${seconds}秒`;
	}

	if (minutes > 0) {
		return `${minutes}分${seconds}秒`;
	}

	return `${seconds}秒`;
};
