/**
 * @file Type Tests - Transform
 * @module mdast-util-from-markdown/types/tests/unit-d/Transform
 */

import type { Root } from 'mdast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../transform.mts'

describe('unit-d:types/Transform', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Root]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Root]>()
    })
  })

  describe('return', () => {
    it('should return Root | null | undefined | void', () => {
      // Arrange
      type Expect = Root | null | undefined | void

      // Expect
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Expect>()
    })
  })
})
