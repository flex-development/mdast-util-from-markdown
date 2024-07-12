/**
 * @file Type Tests - Extension
 * @module mdast-util-from-markdown/types/tests/unit-d/Extension
 */

import type Config from '../config'
import type TestSubject from '../extension'

describe('unit-d:types/Extension', () => {
  it('should equal Partial<Config>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Partial<Config>>()
  })
})
