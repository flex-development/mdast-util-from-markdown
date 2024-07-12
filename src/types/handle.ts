/**
 * @file Type Aliases - Handle
 * @module mdast-util-from-markdown/types/Handle
 */

import type { Token } from 'micromark-util-types'
import type CompileContext from './compile-context'

/**
 * Handle a token.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined | void} Nothing
 */
type Handle = (this: CompileContext, token: Token) => undefined | void

export type { Handle as default }
