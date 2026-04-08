/**
 * 返回数组第一个元素
 * @param array 一个数组
 * @returns 第一个元素，如果数组为空则返回 undefined
 */
export const first = <T>(array: T[]): T | undefined => {
  return array.length > 0 ? array[0] : undefined;
};

/**
 * 返回数组中满足条件的第一个元素
 * @param array 一个数组
 * @param predicate 一个函数，用于测试数组中的每个元素是否满足条件
 * @returns 满足条件的第一个元素，如果没有满足条件的元素则返回 undefined
 */
export const find = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
};

/**
 * 返回数组中满足条件的最后一个元素
 * @param array 一个数组
 * @param predicate 一个函数，用于测试数组中的每个元素是否满足条件
 * @returns 满足条件的最后一个元素，如果没有满足条件的元素则返回 undefined
 */
export const findLast = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
};

/**
 * 返回数组中最小的元素（根据回调方法比较元素大小）
 * @param array 一个数组
 * @param compareFn 一个函数，用于比较数组中的两个元素的大小
 * @returns 最小的元素，如果数组为空则返回 undefined
 */
export const min = <T>(array: T[], compareFn: (a: T, b: T) => number): T | undefined => {
  if (array.length === 0) return undefined;
  return array.reduce((min, current) => (compareFn(current, min) < 0 ? current : min));
};

/**
 * 返回数组中最大的元素（根据回调方法比较元素大小）
 * @param array 一个数组
 * @param compareFn 一个函数，用于比较数组中的两个元素的大小
 * @returns 最大的元素，如果数组为空则返回 undefined
 */
export const max = <T>(array: T[], compareFn: (a: T, b: T) => number): T | undefined => {
  if (array.length === 0) return undefined;
  return array.reduce((max, current) => (compareFn(current, max) > 0 ? current : max));
};

/**
 * 返回数组最后一个元素
 * @param array 一个数组
 * @returns 最后一个元素，如果数组为空则返回 undefined
 */
export const last = <T>(array: T[]): T | undefined => {
  return array.length > 0 ? array[array.length - 1] : undefined;
};

/**
 * 计算两个数组的交集（根据回调方法判断元素是否相等）
 * @param array1 第一个数组
 * @param array2 第二个数组
 * @param isEqual 可选的比较函数，用于判断两个元素是否相等。如果未提供，将使用默认的严格相等比较。
 * @returns 交集数组
 */
export const intersection = <T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[] => {
  if (isEqual) {
    return array1.filter(item1 => array2.some(item2 => isEqual(item1, item2)));
  }
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
};

/**
 * 计算两个数组的并集（根据回调方法判断元素是否相等）
 * @param array1 第一个数组
 * @param array2 第二个数组
 * @param isEqual 可选的比较函数，用于判断两个元素是否相等。如果未提供，将使用默认的严格相等比较。
 * @returns 并集数组
 */
export const union = <T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[] => {
  if (isEqual) {
    const result: T[] = [...array1];
    array2.forEach(item2 => {
      if (!result.some(item1 => isEqual(item1, item2))) {
        result.push(item2);
      }
    });
    return result;
  }
  const set = new Set([...array1, ...array2]);
  return Array.from(set);
};

/**
 * 计算两个数组的差集（根据回调方法判断元素是否相等）
 * @param array1 第一个数组
 * @param array2 第二个数组
 * @param isEqual 可选的比较函数，用于判断两个元素是否相等。如果未提供，将使用默认的严格相等比较。
 * @returns 差集数组
 */
export const difference = <T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[] => {
  if (isEqual) {
    return array1.filter(item1 => !array2.some(item2 => isEqual(item1, item2)));
  }
  const set2 = new Set(array2);
  return array1.filter(item => !set2.has(item));
};