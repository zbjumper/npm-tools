import type { Point } from "@/math/point";

const normalizeNumericInput = (value: number | string): number => {
  if (typeof value === "number") {
    return value;
  }

  const trimmedValue = value.trim();
  const matched = trimmedValue.match(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)/);

  if (!matched) {
    return Number.NaN;
  }

  return Number(matched[0]);
};

/**
 * 保留 n 位小数，并输出字符串；不满足补零，超出位数则四舍五入
 * @param num 目标数字或数字字符串
 * @param n 小数位数
 * @returns
 */
export const keepNDecimalPlaces = (num: number | string, n: number): string => {
  return normalizeNumericInput(num).toFixed(n);
};


/**
 * 计算直线上某点的 y 坐标
 * @param p1 直线上的第一个点
 * @param p2 直线上的第二个点
 * @param x 目标点的 x 坐标
 * @returns 目标点的 y 坐标
 */
export const calculateYOnLine = (p1: Point, p2: Point, x: number): number => {
  const slope = (p2.y - p1.y) / (p2.x - p1.x);
  return p1.y + slope * (x - p1.x);
};
