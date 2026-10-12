/**
 * @file Type Tests - StartPoint
 * @module mdast-util-from-markdown/types/tests/unit-d/StartPoint
 */

import type { Point } from 'micromark-util-types'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../start-point.mts'

describe('unit-d:types/StartPoint', () => {
  it('should equal Omit<Point, "_bufferIndex" | "_index">', () => {
    // Arrange
    type Expect = Omit<Point, '_bufferIndex' | '_index'>

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
