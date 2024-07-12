/**
 * @file Type Aliases - TokenTuple
 * @module mdast-util-from-markdown/types/TokenTuple
 */

import type { Token } from 'micromark-util-types'
import type OnEnterError from './on-enter-error'

/**
 * List containing an open token on the stack, and an optional error handler to
 * use if the token isn't closed properly.
 *
 * @see {@linkcode OnEnterError}
 * @see {@linkcode Token}
 */
type TokenTuple = [token: Token, handler: OnEnterError | undefined]

export type { TokenTuple as default }
