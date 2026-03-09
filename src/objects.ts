
/**
 * 对象深拷贝
 * @template T - 对象的类型
 * @param obj - 需要深拷贝的对象
 * @returns 拷贝后的新对象
 * @description 递归复制对象的所有属性，支持Date和Array类型
 */
export const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as any;
  }

  const copy: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy((obj as any)[key]);
    }
  }
  return copy;
};

/**
 * 合并对象
 * @template T - 目标对象的类型
 * @param target - 目标对象
 * @param source - 源对象（部分属性）
 * @returns 合并后的新对象
 * @description 将源对象的属性递归合并到目标对象中，保留目标对象的原有属性
 */
export const mergeObjects = <T>(target: T, source: Partial<T>): T => {
  const result: any = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (Array.isArray(source[key])) {
        result[key] = source[key];
      } else if (typeof source[key] === "object" && source[key] !== null) {
        result[key] = mergeObjects(result[key] || {}, source[key] as any);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
};
