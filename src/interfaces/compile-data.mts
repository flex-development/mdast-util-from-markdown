/**
 * @file Interfaces - CompileData
 * @module mdast-util-from-markdown/interfaces/CompileData
 */

import type {
  CharacterReferenceType
} from '@flex-development/mdast-util-from-markdown'
import type { ReferenceType } from 'mdast'

/**
 * Registry of tracked data.
 *
 * This interface can be augmented to register custom data.
 *
 * @example
 *  declare module '@flex-development/mdast-util-from-markdown' {
 *    interface CompileData {
 *      mathFlowInside?: boolean | undefined
 *    }
 *  }
 */
interface CompileData {
  /**
   * Whether we're inside a hard break.
   */
  atHardBreak?: boolean | undefined

  /**
   * The current character reference type.
   *
   * @see {@linkcode CharacterReferenceType}
   */
  characterReferenceType?: CharacterReferenceType | undefined

  /**
   * Whether a first list item value (e.g. `1` in `1. a`) is expected.
   */
  expectingFirstListItemValue?: boolean | undefined

  /**
   * Whether we're inside flow code.
   */
  flowCodeInside?: boolean | undefined

  /**
   * Whether we're inside a reference.
   */
  inReference?: boolean | undefined

  /**
   * Whether a slurpable line ending from a setext heading is expected.
   */
  setextHeadingSlurpLineEnding?: boolean | undefined

  /**
   * The current reference type.
   *
   * @see {@linkcode ReferenceType}
   */
  referenceType?: Exclude<ReferenceType, 'shortcut'> | undefined
}

export type { CompileData as default }
