/**
 * @file Type Tests - Exit
 * @module mdast-util-from-markdown/types/tests/unit-d/Exit
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../exit.mts'

describe('unit-d:types/Exit', () => {
  it('should extend mark.Exit', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Exit>()
  })
})
