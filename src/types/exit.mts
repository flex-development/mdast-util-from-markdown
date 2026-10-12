/**
 * @file Type Aliases - Exit
 * @module mdast-util-from-markdown/types/Exit
 */

import type {
  CompileContext,
  OnExitError
} from '@flex-development/mdast-util-from-markdown'
import type { Token } from 'micromark-util-types'

/**
 * Exit a node.
 *
 * @see {@linkcode OnExitError}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token
 *  The token associated with the node
 * @param {OnExitError | null | undefined} [onError]
 *  Handle the case where another token is open
 * @return {undefined}
 */
type Exit = (
  this: CompileContext,
  token: Token,
  onError?: OnExitError | null | undefined
) => undefined

export type { Exit as default }
