/**
 * @file Interfaces - Extension
 * @module mdast-util-from-markdown/interfaces/Extension
 */

import type {
  Handle,
  Handles,
  Transform
} from '@flex-development/mdast-util-from-markdown'

/**
 * A compiler extension.
 *
 * Compiler extensions can be used to change how tokens are turned into nodes,
 * as well as apply transformations to the final syntax tree.
 */
interface Extension {
  /**
   * The listener, or listeners, to call after a token is {@linkcode enter}ed.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode List}
   */
  afterEnter?: Handle | Handle[] | null | undefined

  /**
   * The listener, or listeners, to call after a token is {@linkcode exit}ed.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode List}
   */
  afterExit?: Handle | Handle[] | null | undefined

  /**
   * The listener, or listeners, to call before a token is {@linkcode enter}ed.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode List}
   */
  beforeEnter?: Handle | Handle[] | null | undefined

  /**
   * The listener, or listeners, to call before a token is {@linkcode exit}ed.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode List}
   */
  beforeExit?: Handle | Handle[] | null | undefined

  /**
   * The list of token types where line endings are allowed.
   */
  canContainEols?: string[] | undefined

  /**
   * Record, where each key is a token type
   * and each value is the handler to call when entering a token.
   *
   * @see {@linkcode Handles}
   */
  enter?: Handles | undefined

  /**
   * Record, where each key is a token type
   * and each value is the handler to call when exiting a token.
   *
   * @see {@linkcode Handles}
   */
  exit?: Handles | undefined

  /**
   * The list of tree transforms to apply.
   *
   * @see {@linkcode Transform}
   */
  transforms?: Transform[] | undefined
}

export type { Extension as default }
