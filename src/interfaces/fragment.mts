/**
 * @file Interfaces - Fragment
 * @module mdast-util-from-markdown/interfaces/Fragment
 */

import type { Parent, PhrasingContent } from 'mdast'

/**
 * A temporary node.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Parent}
 */
interface Fragment extends Parent {
  /**
   * The list of children.
   *
   * @see {@linkcode PhrasingContent}
   *
   * @override
   */
  children: PhrasingContent[]

  /**
   * The node type.
   *
   * @override
   */
  type: 'fragment'
}

export type { Fragment as default }
