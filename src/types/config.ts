/**
 * @file Type Aliases - Config
 * @module mdast-util-from-markdown/types/Config
 */

import type Handles from './handles'
import type Transform from './transform'

/**
 * Configuration.
 */
type Config = {
  /**
   * Token types where line endings are used.
   */
  canContainEols: string[]

  /**
   * Opening handles.
   *
   * @see {@linkcode Handles}
   */
  enter: Handles

  /**
   * Closing handles.
   *
   * @see {@linkcode Handles}
   */
  exit: Handles

  /**
   * Tree transforms.
   *
   * @see {@linkcode Transform}
   */
  transforms: Transform[]
}

export type { Config as default }
