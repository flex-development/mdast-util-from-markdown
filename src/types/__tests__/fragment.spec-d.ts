/**
 * @file Type Tests - Fragment
 * @module mdast-util-from-markdown/types/tests/unit-d/Fragment
 */

import type { Parent, PhrasingContent } from 'mdast'
import type TestSubject from '../fragment'

describe('unit-d:types/Fragment', () => {
  it('should extend Parent', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Parent>()
  })

  it('should match [children: PhrasingContent[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('children')
      .toEqualTypeOf<PhrasingContent[]>()
  })

  it('should match [type: "fragment"]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'fragment'>()
  })
})
