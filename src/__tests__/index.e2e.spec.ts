/**
 * @file E2E Tests - api
 * @module mdast-util-from-markdown/tests/e2e/api
 */

import { alphabetize, identity } from '@flex-development/tutils'
import * as testSubject from '../index'

describe('e2e:mdast-util-from-markdown', () => {
  it('should expose public api', () => {
    expect(alphabetize(Object.keys(testSubject), identity)).toMatchSnapshot()
  })
})
