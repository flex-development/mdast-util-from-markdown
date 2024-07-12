/**
 * @file Type Tests - Options
 * @module mdast-util-from-markdown/types/tests/unit-d/Options
 */

import type { ParseOptions } from 'micromark-util-types'
import type TestSubject from '../options'
import type FromMarkdownOptions from '../options-from-markdown'

describe('unit-d:types/Options', () => {
  it('should equal FromMarkdownOptions & ParseOptions', () => {
    // Arrange
    type Expect = FromMarkdownOptions & ParseOptions

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
