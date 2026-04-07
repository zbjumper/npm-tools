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