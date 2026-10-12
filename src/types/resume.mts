/**
 * @file Type Aliases - Resume
 * @module mdast-util-from-markdown/types/Resume
 */

import type { CompileContext } from '@flex-development/mdast-util-from-markdown'

/**
 * Stop capturing output and serialize the captured node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {string}
 *  The serialized node
 */
type Resume = (this: CompileContext) => string

export type { Resume as default }
