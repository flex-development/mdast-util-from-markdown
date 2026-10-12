/**
 * @file Package Entry Point
 * @module mdast-util-from-markdown
 */

import type {} from 'micromark-util-types'

declare module 'micromark-util-types' {
  interface Token {
    /**
     * Whether a list item is spread out.
     */
    _spread?: boolean
  }

  interface TokenTypeMap {
    listItem: 'listItem'
  }
}

export type { Encoding, Token, Value } from 'micromark-util-types'
export { default as compiler } from './compiler.mts'
export { default, default as fromMarkdown } from './from-markdown.mts'
export type * from './interfaces/index.mts'
export type * from './types/index.mts'
