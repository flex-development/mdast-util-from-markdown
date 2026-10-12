/**
 * @file Type Aliases - StackedToken
 * @module mdast-util-from-markdown/types/StackedToken
 */

import type { OnEnterError } from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'

/**
 * List containing an open token on the stack,
 * and an optional error handler to use if the token isn't closed properly.
 *
 * @see {@linkcode OnEnterError}
 * @see {@linkcode Token}
 */
type StackedToken = [token: Token, handler: OnEnterError | undefined]

export type { StackedToken as default }
