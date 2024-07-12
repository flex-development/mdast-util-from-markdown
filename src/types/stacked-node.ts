/**
 * @file Type Aliases - StackedNode
 * @module mdast-util-from-markdown/types/StackedNode
 */

import type { Nodes } from 'mdast'
import type Fragment from './fragment'

/**
 * A node on the compiler context stack.
 *
 * @see {@linkcode Fragment}
 * @see {@linkcode Nodes}
 */
type StackedNode = Fragment | Nodes

export type { StackedNode as default }
