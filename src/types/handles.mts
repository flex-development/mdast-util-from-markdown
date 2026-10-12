/**
 * @file Type Aliases - Handles
 * @module mdast-util-from-markdown/types/Handles
 */

import type { Handle } from '@flex-development/mdast-util-from-markdown'
import type { TokenType } from 'micromark-util-types'

/**
 * Record, where each key is a token type and each value is an event handler.
 *
 * @see {@linkcode Handle}
 * @see {@linkcode TokenType}
 */
type Handles = Partial<Record<TokenType, Handle>>

export type { Handles as default }
