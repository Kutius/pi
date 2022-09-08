import { describe, expect, it } from 'vitest'
import { isValidIP } from '../src/detect'

describe('Short IP validate', () => {
  it('exported', () => {
    expect(isValidIP('2', true)).toEqual(false)
  })
  it('exported', () => {
    expect(isValidIP('192.2.2', true)).toEqual(false)
  })
  it('exported', () => {
    expect(isValidIP('3.147', true)).toEqual(true)
  })
})

describe('Long IP validate', () => {
  it('exported', () => {
    expect(isValidIP('122')).toEqual(false)
  })
  it('exported', () => {
    expect(isValidIP('192.2.2.2.2')).toEqual(false)
  })
  it('exported', () => {
    expect(isValidIP('192.168.3.145')).toEqual(true)
  })
})
