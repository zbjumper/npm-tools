import { describe, expect, test } from 'vitest'
import { difference, intersection, union } from '@/array'

describe('intersection', () => {
  test('should return intersection with strict equality by default', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })

  test('should preserve duplicates from the first array when matched', () => {
    expect(intersection([1, 2, 2, 3], [2, 4])).toEqual([2, 2])
  })

  test('should use custom comparator for object arrays', () => {
    const a1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const a2 = [{ id: 2 }, { id: 4 }]

    expect(intersection(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 2 }])
  })
})

describe('union', () => {
  test('should return union with strict equality by default', () => {
    expect(union([1, 2, 2], [2, 3, 3])).toEqual([1, 2, 3])
  })

  test('should keep first array order and append unique items from second array with custom comparator', () => {
    const a1 = [{ id: 1 }, { id: 2 }]
    const a2 = [{ id: 2 }, { id: 3 }, { id: 3 }]

    expect(union(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })
})

describe('difference', () => {
  test('should return difference with strict equality by default', () => {
    expect(difference([1, 2, 3, 4], [2, 4, 6])).toEqual([1, 3])
  })

  test('should preserve duplicates from the first array when not matched', () => {
    expect(difference([1, 1, 2, 3], [2])).toEqual([1, 1, 3])
  })

  test('should use custom comparator for object arrays', () => {
    const a1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const a2 = [{ id: 2 }, { id: 4 }]

    expect(difference(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 3 }])
  })
})
