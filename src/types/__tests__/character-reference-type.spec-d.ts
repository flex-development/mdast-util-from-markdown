/**
 * @file Type Tests - CharacterReferenceType
 * @module mdast-util-from-markdown/types/tests/unit-d/CharacterReferenceType
 */

import type TestSubject from '../character-reference-type'

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
