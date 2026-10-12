/**
 * @file Type Tests - Compiler
 * @module mdast-util-from-markdown/types/tests/unit-d/Compiler
 */

import type { Root } from 'mdast'
import type { Event } from 'micromark-util-types'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../compiler.mts'

describe('unit-d:types/Compiler', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [(Event[] | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[(Event[] | null | undefined)?]>()
    })
  })

  describe('return', () => {
    it('should return Root', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Root>()
    })
  })
})
