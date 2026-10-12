/**
 * @file Type Aliases - OnExitError
 * @module mdast-util-from-markdown/types/OnExitError
 */

import type { CompileContext } from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'

/**
 * Handle the case where the `right` token is open,
 * but is closed by exiting the `left` token.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {Omit<CompileContext, 'sliceSerialize'>}
 *
 * @param {Token} left
 *  The exiting token
 * @param {Token} right
 *  The open token
 * @return {undefined}
 */
type OnExitError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token,
  right: Token
) => undefined

export type { OnExitError as default }
