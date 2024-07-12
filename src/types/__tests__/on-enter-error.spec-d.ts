/**
 * @file Type Tests - OnEnterError
 * @module mdast-util-from-markdown/types/tests/unit-d/OnEnterError
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from '../compile-context'
import type TestSubject from '../on-enter-error'

describe('unit-d:types/OnEnterError', () => {
  it('should match [this: Omit<CompileContext, "sliceSerialize">]', () => {
    // Arrange
    type Expect = Omit<CompileContext, 'sliceSerialize'>

    // Expect
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<Expect>()
  })

  describe('parameters', () => {
    it('should be callable with [Token | undefined, Token]', () => {
      // Arrange
      type Expect = [Token | undefined, Token]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
    })
  })

  describe('return', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
