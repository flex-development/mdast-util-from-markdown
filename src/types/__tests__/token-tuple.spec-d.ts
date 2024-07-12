/**
 * @file Type Tests - TokenTuple
 * @module mdast-util-from-markdown/types/tests/unit-d/TokenTuple
 */

import type { Token } from 'micromark-util-types'
import type OnEnterError from '../on-enter-error'
import type TestSubject from '../token-tuple'

describe('unit-d:types/TokenTuple', () => {
  it('should match [0: Token]', () => {
    expectTypeOf<TestSubject>().toHaveProperty(0).toEqualTypeOf<Token>()
  })

  it('should match [1: OnEnterError | undefined]', () => {
    // Arrange
    type Expect = OnEnterError | undefined

    // Expect
    expectTypeOf<TestSubject>().toHaveProperty(1).toEqualTypeOf<Expect>()
  })
})
