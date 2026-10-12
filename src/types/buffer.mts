/**
 * @file Type Aliases - Buffer
 * @module mdast-util-from-markdown/types/Buffer
 */

import type { CompileContext } from '@flex-development/mdast-util-from-markdown'

/**
 * Start capturing output into a temporary node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined}
 */
type Buffer = (this: CompileContext) => undefined

export type { Buffer as default }
