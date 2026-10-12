/**
 * @file Unit Tests - takeExtension
 * @module mdast-util-from-markdown/internal/tests/unit/takeExtension
 */

import type {
  Config,
  Extension
} from '@flex-development/mdast-util-from-markdown'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import testSubject from '../take-extension.mts'

describe('unit:internal/takeExtension', () => {
  let combined: Config

  beforeEach(() => {
    combined = {
      afterEnter: [],
      afterExit: [],
      beforeEnter: [],
      beforeExit: [],
      canContainEols: [],
      enter: {},
      exit: {},
      transforms: []
    }
  })

  it.each<[extension: Extension, field?: keyof Extension | undefined]>([
    [{ beforeEnter: vi.fn().mockName('beforeEnter') }],
    [{ canContainEols: ['heading', 'paragraph'] }, 'canContainEols'],
    [{}, 'canContainEols']
  ])('should merge extension field into `combined` (%#)', (
    extension,
    field
  ) => {
    // Act
    testSubject(combined, extension, field)

    // Expect
    expect(combined).toMatchSnapshot()
  })
})
