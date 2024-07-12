/**
 * @file Type Aliases - Extension
 * @module mdast-util-from-markdown/types/Extension
 */

import type Config from './config'

/**
 * Change how tokens are turned into nodes.
 *
 * @see {@linkcode Config}
 */
type Extension = Partial<Config>

export type { Extension as default }
