/**
 * @file Type Aliases - Transform
 * @module mdast-util-from-markdown/types/Transform
 */

import type { Root } from 'mdast'

/**
 * Extra transform, to change the AST afterwards.
 *
 * @see {@linkcode Root}
 *
 * @param {Root} tree - Tree to transform
 * @return {Root | null | undefined | void} New tree or nothing (in which case
 * the current tree is used)
 */
type Transform = (tree: Root) => Root | null | undefined | void

export type { Transform as default }
