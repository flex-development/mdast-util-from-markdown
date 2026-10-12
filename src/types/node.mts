/**
 * @file Type Aliases - Node
 * @module mdast-util-from-markdown/types/Node
 */

import type { Fragment } from '@flex-development/mdast-util-from-markdown'
import type { Root, RootContent } from 'mdast'

/**
 * Union of nodes that can be created during event compilation.
 *
 * @see {@linkcode Fragment}
 * @see {@linkcode Root}
 * @see {@linkcode RootContent}
 */
type Node = Fragment | Root | RootContent

export type { Node as default }
