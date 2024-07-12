/**
 * @file Type Aliases - Handles
 * @module mdast-util-from-markdown/types/Handles
 */

import type Handle from './handle'

/**
 * Token types mapped to handles.
 *
 * @see {@linkcode Handle}
 */
type Handles = Record<string, Handle>

export type { Handles as default }
