import { describe, expect, test } from 'vitest'
import { regexps } from '@/regexp'

describe('regexps.url', () => {
  test('should match valid http URL', () => {
    expect(regexps.url.test('http://example.com')).toBe(true)
  })

  test('should match valid https URL', () => {
    expect(regexps.url.test('https://www.example.com/path?q=1#hash')).toBe(true)
  })

  test('should match ftp URL', () => {
    expect(regexps.url.test('ftp://ftp.example.com/file.txt')).toBe(true)
  })

  test('should not match invalid URL', () => {
    expect(regexps.url.test('not a url')).toBe(false)
    expect(regexps.url.test('example.com')).toBe(false)
    expect(regexps.url.test('')).toBe(false)
  })
})

describe('regexps.email', () => {
  test('should match valid email', () => {
    expect(regexps.email.test('user@example.com')).toBe(true)
    expect(regexps.email.test('user.name+tag@sub.domain.org')).toBe(true)
  })

  test('should not match invalid email', () => {
    expect(regexps.email.test('user@')).toBe(false)
    expect(regexps.email.test('@example.com')).toBe(false)
    expect(regexps.email.test('user@example')).toBe(false)
    expect(regexps.email.test('')).toBe(false)
  })
})

describe('regexps.phone', () => {
  test('should match valid Chinese mobile number', () => {
    expect(regexps.phone.test('13800138000')).toBe(true)
    expect(regexps.phone.test('19912345678')).toBe(true)
  })

  test('should not match invalid phone number', () => {
    expect(regexps.phone.test('12345678901')).toBe(false)
    expect(regexps.phone.test('1380013800')).toBe(false)
    expect(regexps.phone.test('138001380000')).toBe(false)
    expect(regexps.phone.test('')).toBe(false)
  })
})

describe('regexps.idCard', () => {
  test('should match valid 18-digit ID card', () => {
    expect(regexps.idCard.test('110101199001011234')).toBe(true)
    expect(regexps.idCard.test('11010119900101123X')).toBe(true)
  })

  test('should not match invalid ID card', () => {
    expect(regexps.idCard.test('12345')).toBe(false)
    expect(regexps.idCard.test('110101199013011234')).toBe(false) // 月份 13
    expect(regexps.idCard.test('')).toBe(false)
  })
})
