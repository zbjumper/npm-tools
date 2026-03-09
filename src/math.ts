
/**
 * 保留 n 位小数，并输出字符串；不满足补零，超出位数则四舍五入
 * @param num 目标数字
 * @param n 小数位数
 * @returns 
 */
export const keepNDecimalPlaces = (num: number, n: number): string => {
  return num.toFixed(n);
};