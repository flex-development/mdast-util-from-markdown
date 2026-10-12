/**
 * @file Type Tests - Options
 * @module mdast-util-from-markdown/interfaces/tests/unit-d/Options
 */

import type {
  Extension,
  StartPoint
} from '@flex-development/mdast-util-from-markdown'
import type { Nilable, OptionalKeys } from '@flex-development/tutils'
import type { ParseOptions } from 'micromark-util-types'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../options.mts'

describe('unit-d:interfaces/Options', () => {
  type Optional = OptionalKeys<TestSubject>

  it('should extend ParseOptions', () => {
    expectTypeOf<TestSubject>().toExtend<ParseOptions>()
  })

  it('should match [from?: StartPoint | null | undefined]', () => {
    expectTypeOf<Optional>().extract<'from'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<StartPoint>>()
  })

  it('should match [mdastExtensions?: (Extension | Extension[])[] | null | undefined]', () => {
    expectTypeOf<Optional>().extract<'mdastExtensions'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('mdastExtensions')
      .toEqualTypeOf<Nilable<(Extension | Extension[])[]>>()
  })
})
