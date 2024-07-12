/**
 * @file Type Tests - Config
 * @module mdast-util-from-markdown/types/tests/unit-d/Config
 */

import type TestSubject from '../config'
import type Handles from '../handles'
import type Transform from '../transform'

describe('unit-d:types/Config', () => {
  it('should match [canContainEols: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('canContainEols')
      .toEqualTypeOf<string[]>()
  })

  it('should match [enter: Handles]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('enter').toEqualTypeOf<Handles>()
  })

  it('should match [exit: Handles]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('exit').toEqualTypeOf<Handles>()
  })

  it('should match [transforms: Transform[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('transforms')
      .toEqualTypeOf<Transform[]>()
  })
})
