/**
 * @file Type Tests - FromMarkdownOptions
 * @module mdast-util-from-markdown/types/tests/unit-d/FromMarkdownOptions
 */

import type { Nilable } from '@flex-development/tutils'
import type Extension from '../extension'
import type TestSubject from '../options-from-markdown'
import type StartPoint from '../start-point'

describe('unit-d:types/FromMarkdownOptions', () => {
  it('should match [from?: StartPoint | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<StartPoint>>()
  })

  it('should match [mdastExtensions?: (Extension | Extension[])[] | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mdastExtensions')
      .toEqualTypeOf<Nilable<(Extension | Extension[])[]>>()
  })
})
