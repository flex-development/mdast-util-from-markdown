/**
 * @file Type Tests - CharacterReferenceType
 * @module mdast-util-from-markdown/types/tests/unit-d/CharacterReferenceType
 */

import { describe, expectTypeOf, it } from 'vitest'
import type TestSubject from '../character-reference-type.mts'

describe('unit-d:types/CharacterReferenceType', () => {
  it('should extract "characterReferenceMarkerHexadecimal"', () => {
    expectTypeOf<TestSubject>()
      .extract<'characterReferenceMarkerHexadecimal'>()
      .not.toBeNever()
  })

  it('should extract "characterReferenceMarkerNumeric"', () => {
    expectTypeOf<TestSubject>()
      .extract<'characterReferenceMarkerNumeric'>()
      .not.toBeNever()
  })
})
