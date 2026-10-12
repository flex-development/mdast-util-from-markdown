/**
 * @file Type Tests - Node
 * @module mdast-util-from-markdown/types/tests/unit-d/Node
 */

import type { Fragment } from '@flex-development/mdast-util-from-markdown'
import type mdast from 'mdast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../node.mts'

describe('unit-d:types/Node', () => {
  it('should extract Fragment', () => {
    expectTypeOf<TestSubject>().extract<Fragment>().not.toBeNever()
  })

  it('should extract mdast.Nodes', () => {
    expectTypeOf<TestSubject>().extract<mdast.Nodes>().not.toBeNever()
  })
})
