/**
 * @file Type Tests - Fragment
 * @module mdast-util-from-markdown/interfaces/tests/unit-d/Fragment
 */

import type * as mark from '@flex-development/mark/ast'
import type { RequiredKeys } from '@flex-development/tutils'
import type { Parent, PhrasingContent } from 'mdast'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../fragment.mts'

describe('unit-d:interfaces/Fragment', () => {
  type Required = RequiredKeys<TestSubject>

  it('should extend Parent', () => {
    expectTypeOf<TestSubject>().toExtend<Parent>()
  })

  it('should extend mark.Fragment', () => {
    expectTypeOf<TestSubject>().toExtend<mark.Fragment>()
  })

  it('should match [children: PhrasingContent[]]', () => {
    expectTypeOf<Required>().extract<'children'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('children')
      .toEqualTypeOf<PhrasingContent[]>()
  })

  it('should match [type: "fragment"]', () => {
    expectTypeOf<Required>().extract<'type'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'fragment'>()
  })
})
