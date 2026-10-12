/**
 * @file Type Tests - Handles
 * @module mdast-util-from-markdown/types/tests/unit-d/Handles
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../handles.mts'

describe('unit-d:types/Handles', () => {
  it('should extend mark.Handles', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Handles>()
  })
})
