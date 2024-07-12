/**
 * @file Type Aliases - OnEnterError
 * @module mdast-util-from-markdown/types/OnEnterError
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from './compile-context'

/**
 * Handle the case where the `right` token is open, but is closed by the `left`
 * token, or because end of file was reached.
 *
 * @this {Omit<CompileContext, 'sliceSerialize'>}
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @param {Token | undefined} left - Left token
 * @param {Token} right - Open token
 * @return {undefined} Nothing
 */
type OnEnterError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token | undefined,
  right: Token
) => undefined

export type { OnEnterError as default }
