import { describe, expect, it } from 'vitest'
import { getConfig } from '../src/config'

describe('Parse args', () => {
  it('exported', () => {
    expect(getConfig()).toBeDefined()
  })
})
