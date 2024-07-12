/**
 * @file Type Tests - StartPoint
 * @module mdast-util-from-markdown/types/tests/unit-d/StartPoint
 */

import type { Point } from 'micromark-util-types'
import type TestSubject from '../start-point'

describe('unit-d:types/StartPoint', () => {
  it('should equal Omit<Point, "_bufferIndex" | "_index">', () => {
    // Arrange
    type Expect = Omit<Point, '_bufferIndex' | '_index'>

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
