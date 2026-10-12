/**
 * @file mdast
 * @module mdast-util-from-markdown/mdast
 */

import type * as mdast from 'mdast-util-from-markdown'

declare module '@flex-development/mdast-util-from-markdown' {
  interface CompileData extends mdast.CompileData {}
}
