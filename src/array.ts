/**
 * 返回数组第一个元素
 * @param array 一个数组
 * @returns 第一个元素，如果数组为空则返回 undefined
 */
export const first = <T>(array: T[]): T | undefined => {
  return array.length > 0 ? array[0] : undefined;
};

/**
 * 返回数组最后一个元素
 * @param array 一个数组
 * @returns 最后一个元素，如果数组为空则返回 undefined
 */
export const last = <T>(array: T[]): T | undefined => {
  return array.length > 0 ? array[array.length - 1] : undefined;
};
