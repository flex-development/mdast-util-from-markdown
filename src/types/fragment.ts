/**
 * @file Type Aliases - Fragment
 * @module mdast-util-from-markdown/types/Fragment
 */

import type { Parent, PhrasingContent } from 'mdast'

/**
 * Temporary node.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Omit<Parent,'children'|'type'>}
 */
type Fragment = Omit<Parent, 'children' | 'type'> & {
  /**
   * List of children.
   *
   * @see {@linkcode PhrasingContent}
   */
  children: PhrasingContent[]

  /**
   * Node type.
   */
  type: 'fragment'
}

export type { Fragment as default }
