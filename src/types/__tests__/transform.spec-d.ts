/**
 * @file Type Tests - Transform
 * @module mdast-util-from-markdown/types/tests/unit-d/Transform
 */

import type { Root } from 'mdast'
import type TestSubject from '../transform'

describe('unit-d:types/Transform', () => {
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
