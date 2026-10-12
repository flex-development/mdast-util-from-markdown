/**
 * @file Interfaces - Options
 * @module mdast-util-from-markdown/interfaces/Options
 */

import type {
  Extension,
  StartPoint
} from '@flex-development/mdast-util-from-markdown'
import type { ParseOptions } from 'micromark-util-types'

/**
 * Configuration options.
 *
 * @see {@linkcode ParseOptions}
 *
 * @extends {ParseOptions}
 */
interface Options extends ParseOptions {
  /**
   * The point before the first character in the content.
   *
   * Node positions will be relative to this point.
   *
   * @see {@linkcode StartPoint}
   *
   * @default
   *  { column: 1, line: 1, offset: 0 }
   */
  from?: StartPoint | null | undefined

  /**
   * The list of extensions to apply.
   *
   * Extensions are mainly used to change how token types are turned into nodes.
   *
   * @see {@linkcode Extension}
   */
  mdastExtensions?: (Extension | Extension[])[] | null | undefined
}

export type { Options as default }
