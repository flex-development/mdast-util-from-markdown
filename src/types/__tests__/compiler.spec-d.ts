/**
 * @file Type Tests - Compiler
 * @module mdast-util-from-markdown/types/tests/unit-d/Compiler
 */

import type { Root } from 'mdast'
import type { Event } from 'micromark-util-types'
import type TestSubject from '../compiler'

describe('unit-d:types/Compiler', () => {
  describe('parameters', () => {
    it('should be callable with [Event[]]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Event[]]>()
    })
  })

  describe('return', () => {
    it('should return Root', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Root>()
    })
  })
})
