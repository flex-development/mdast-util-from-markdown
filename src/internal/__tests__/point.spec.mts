/**
 * @file Unit Tests - point
 * @module mdast-util-from-markdown/internal/tests/unit/point
 */

import { describe, expect, it } from 'vitest'
import testSubject from '../point.mts'

describe('unit:internal/point', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [{ column: 3, line: 13, offset: 2 }]
  ])('should return new point (%j)', point => {
    // Act
    const result = testSubject(point)

    // Expect
    expect(result).to.not.eq(point)
    expect(result).toMatchSnapshot()
  })
})
