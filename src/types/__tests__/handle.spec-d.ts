/**
 * @file Type Tests - Handle
 * @module mdast-util-from-markdown/types/tests/unit-d/Handle
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from '../compile-context'
import type TestSubject from '../handle'

describe('unit-d:types/Handle', () => {
  it('should match [this: CompileContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<CompileContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Token]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Token]>()
    })
  })

  describe('return', () => {
    it('should return undefined | void', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined | void>()
    })
  })
})
