/**
 * @file Type Tests - StackedNode
 * @module mdast-util-from-markdown/types/tests/unit-d/StackedNode
 */

import type { Nodes } from 'mdast'
import type Fragment from '../fragment'
import type TestSubject from '../stacked-node'

describe('unit-d:types/StackedNode', () => {
  it('should extract Fragment', () => {
    expectTypeOf<TestSubject>().extract<Fragment>().not.toBeNever()
  })

  it('should extract Nodes', () => {
    expectTypeOf<TestSubject>().extract<Nodes>().not.toBeNever()
  })
})
