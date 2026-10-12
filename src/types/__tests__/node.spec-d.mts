/**
 * @file Type Tests - StackedNode
 * @module mdast-util-from-markdown/types/tests/unit-d/StackedNode
 */

import type { Fragment } from '@flex-development/mdast-util-from-markdown'
import type mdast from 'mdast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../node.mts'

describe('unit-d:types/StackedNode', () => {
  it('should extract Fragment', () => {
    expectTypeOf<TestSubject>().extract<Fragment>().not.toBeNever()
  })

  it('should extract mdast.Nodes', () => {
    expectTypeOf<TestSubject>().extract<mdast.Nodes>().not.toBeNever()
  })
})
