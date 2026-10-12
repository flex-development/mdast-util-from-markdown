/**
 * @file Type Tests - CompileData
 * @module mdast-util-from-markdown/interfaces/tests/unit-d/CompileData
 */

import type {
  CharacterReferenceType
} from '@flex-development/mdast-util-from-markdown'
import type { OptionalKeys } from '@flex-development/tutils'
import type { ReferenceType } from 'mdast'
import type * as mdastUtil from 'mdast-util-from-markdown'
import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../compile-data.mts'

describe('unit-d:interfaces/CompileData', () => {
  it('should extend mdastUtil.CompileData', () => {
    expectTypeOf<TestSubject>().toExtend<mdastUtil.CompileData>()
  })

  it('should have all optional keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<OptionalKeys<TestSubject>>()
  })

  it('should match [atHardBreak?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('atHardBreak')
      .toEqualTypeOf<boolean | undefined>()
  })

  it('should match [characterReferenceType?: CharacterReferenceType | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('characterReferenceType')
      .toEqualTypeOf<CharacterReferenceType | undefined>()
  })

  it('should match [expectingFirstListItemValue?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('expectingFirstListItemValue')
      .toEqualTypeOf<boolean | undefined>()
  })

  it('should match [flowCodeInside?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('flowCodeInside')
      .toEqualTypeOf<boolean | undefined>()
  })

  it('should match [inReference?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('inReference')
      .toEqualTypeOf<boolean | undefined>()
  })

  it('should match [referenceType?: Exclude<ReferenceType, "shortcut"> | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('referenceType')
      .toEqualTypeOf<Exclude<ReferenceType, 'shortcut'> | undefined>()
  })
})
