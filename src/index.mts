/**
 * @file Entry Point - Package
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

export { default as compiler } from './compiler.mts'
export { default, default as fromMarkdown } from './from-markdown.mts'
export type * from './interfaces/index.mts'
export { default as preprocess } from './preprocess.mts'
export { default as takeExtension } from './take-extension.mts'
export type * from './types/index.mts'
