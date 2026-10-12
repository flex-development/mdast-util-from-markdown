/**
 * @file Type Tests - Enter
 * @module mdast-util-from-markdown/types/tests/unit-d/Enter
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../enter.mts'

describe('unit-d:types/Enter', () => {
  it('should extend mark.Enter', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Enter>()
  })
})
