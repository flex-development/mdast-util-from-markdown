/**
 * @file Type Aliases - FromMarkdownOptions
 * @module mdast-util-from-markdown/types/FromMarkdownOptions
 */

import type Extension from './extension'
import type StartPoint from './start-point'

/**
 * Configuration options for building mdast.
 */
type FromMarkdownOptions = {
  /**
   * Point before first character in markdown value.
   *
   * Node positions will be relative to this point.
   *
   * @see {@linkcode StartPoint}
   */
  from?: StartPoint | null | undefined

  /**
   * Extensions for this utility to change how tokens are turned into nodes.
   *
   * @see {@linkcode Extension}
   */
  mdastExtensions?: (Extension | Extension[])[] | null | undefined
}

export type { FromMarkdownOptions as default }
