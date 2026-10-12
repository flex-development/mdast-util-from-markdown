/**
 * @file Type Aliases - OnEnterError
 * @module mdast-util-from-markdown/types/OnEnterError
 */

import type { CompileContext } from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'

/**
 * Handle the case where the `right` token is open,
 * but is closed by the `left` token, or because end of content was reached.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {Omit<CompileContext, 'sliceSerialize'>}
 *
 * @param {Token | undefined} left
 *  The exiting token
 * @param {Token} right
 *  The open token
 * @return {undefined}
 */
type OnEnterError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token | undefined,
  right: Token
) => undefined

export type { OnEnterError as default }
