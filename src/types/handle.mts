/**
 * @file Type Aliases - Handle
 * @module mdast-util-from-markdown/types/Handle
 */

import type { CompileContext } from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'

/**
 * Handle an event token.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token
 *  The token to handle
 * @return {undefined | void}
 */
type Handle = (this: CompileContext, token: Token) => undefined | void

export type { Handle as default }
