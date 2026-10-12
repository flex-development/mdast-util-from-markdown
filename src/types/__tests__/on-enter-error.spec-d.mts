/**
 * @file Type Tests - OnEnterError
 * @module mdast-util-from-markdown/types/tests/unit-d/OnEnterError
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../on-enter-error.mts'

describe('unit-d:types/OnEnterError', () => {
  it('should extend mark.OnEnterError', () => {
    expectTypeOf<TestSubject>().toExtend<mark.OnEnterError>()
  })
})
