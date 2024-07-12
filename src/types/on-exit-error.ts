/**
 * @file Type Aliases - OnExitError
 * @module mdast-util-from-markdown/types/OnExitError
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from './compile-context'

/**
 * Handle the case where the `right` token is open, but is closed by exiting the
 * `left` token.
 *
 * @this {Omit<CompileContext, 'sliceSerialize'>}
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @param {Token} left - Left token
 * @param {Token} right - Open token
 * @return {undefined} Nothing
 */
type OnExitError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token,
  right: Token
) => undefined

export type { OnExitError as default }
