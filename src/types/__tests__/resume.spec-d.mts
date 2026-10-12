/**
 * @file Type Tests - Resume
 * @module mdast-util-from-markdown/types/tests/unit-d/Resume
 */

import type * as mark from '@flex-development/mark/ast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../resume.mts'

describe('unit-d:types/Resume', () => {
  it('should extend mark.Resume', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Resume>()
  })
})
