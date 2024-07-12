/**
 * @file Type Tests - Handles
 * @module mdast-util-from-markdown/types/tests/unit-d/Handles
 */

import type Handle from '../handle'
import type TestSubject from '../handles'

describe('unit-d:types/Handles', () => {
  it('should equal Record<string, Handle>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Record<string, Handle>>()
  })
})
