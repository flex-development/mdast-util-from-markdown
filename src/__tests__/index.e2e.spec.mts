/**
 * @file E2E Tests - api
 * @module mdast-util-from-markdown/tests/e2e/api
 */

import * as testSubject from '@flex-development/mdast-util-from-markdown'
import { describe, expect, it } from 'vitest'

describe('e2e:mdast-util-from-markdown', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
