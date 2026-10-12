/**
 * @file Type Tests - OnExitError
 * @module mdast-util-from-markdown/types/tests/unit-d/OnExitError
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../on-exit-error.mts'

describe('unit-d:types/OnExitError', () => {
  it('should extend mark.OnExitError', () => {
    expectTypeOf<TestSubject>().toExtend<mark.OnExitError>()
  })
})
