/**
 * @file Type Tests - Handle
 * @module mdast-util-from-markdown/types/tests/unit-d/Handle
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../handle.mts'

describe('unit-d:types/Handle', () => {
  it('should extend mark.Handle', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Handle>()
  })
})
