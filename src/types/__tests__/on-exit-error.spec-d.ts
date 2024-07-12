/**
 * @file Type Tests - OnExitError
 * @module mdast-util-from-markdown/types/tests/unit-d/OnExitError
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from '../compile-context'
import type TestSubject from '../on-exit-error'

describe('unit-d:types/OnExitError', () => {
  it('should match [this: Omit<CompileContext, "sliceSerialize">]', () => {
    // Arrange
    type Expect = Omit<CompileContext, 'sliceSerialize'>

    // Expect
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<Expect>()
  })

  describe('parameters', () => {
    it('should be callable with [Token, Token]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Token, Token]>()
    })
  })

  describe('return', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
