/**
 * @file Type Tests - Buffer
 * @module mdast-util-from-markdown/types/tests/unit-d/Buffer
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../buffer.mts'

describe('unit-d:types/Buffer', () => {
  it('should extend mark.Buffer', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Buffer>()
  })
})
