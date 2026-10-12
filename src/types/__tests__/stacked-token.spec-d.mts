/**
 * @file Type Tests - StackedToken
 * @module mdast-util-from-markdown/types/tests/unit-d/StackedToken
 */

import type { OnEnterError } from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../stacked-token.mts'

describe('unit-d:types/StackedToken', () => {
  it('should match [0: Token]', () => {
    expectTypeOf<TestSubject>().toHaveProperty(0).toEqualTypeOf<Token>()
  })

  it('should match [1: OnEnterError | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(1)
      .toEqualTypeOf<OnEnterError | undefined>()
  })
})
