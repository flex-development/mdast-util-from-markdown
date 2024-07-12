/**
 * @file Type Aliases - CompileContext
 * @module mdast-util-from-markdown/types/CompileContext
 */

import type { Nodes } from 'mdast'
import type { CompileData } from 'mdast-util-from-markdown'
import type { Token, TokenizeContext } from 'micromark-util-types'
import type Config from './config'
import type OnEnterError from './on-enter-error'
import type OnExitError from './on-exit-error'
import type StackedNode from './stacked-node'
import type TokenTuple from './token-tuple'

/**
 * mdast compiler context.
 */
type CompileContext = {
  /**
   * Capture some of the output data.
   *
   * @this {CompileContext}
   *
   * @return {undefined} Nothing
   */
  buffer(this: CompileContext): undefined

  /**
   * Configuration.
   *
   * @see {@linkcode Config}
   */
  config: Config

  /**
   * Info passed around; key/value store.
   *
   * @see {@linkcode CompileData}
   */
  data: CompileData

  /**
   * Enter a node.
   *
   * @see {@linkcode Nodes}
   * @see {@linkcode OnEnterError}
   * @see {@linkcode Token}
   *
   * @this {CompileContext}
   *
   * @param {Nodes} node - Node to enter
   * @param {Token} token - Corresponding token
   * @param {OnEnterError | undefined} [onError] - Handle the case where `token`
   * is open, but closed by something else
   * @return {undefined} Nothing
   */
  enter(
    this: CompileContext,
    node: Nodes,
    token: Token,
    onError?: OnEnterError
  ): undefined

  /**
   * Exit a node.
   *
   * @see {@linkcode OnExitError}
   * @see {@linkcode Token}
   *
   * @this {CompileContext}
   *
   * @param {Token} token - Corresponding token
   * @param {OnExitError | undefined} [onError] - Handle the case where another
   * token is open
   * @return {undefined} Nothing
   */
  exit(this: CompileContext, token: Token, onError?: OnExitError): undefined

  /**
   * Stop capturing and access the output data.
   *
   * @this {CompileContext}
   *
   * @return {string} Captured output data
   */
  resume(this: CompileContext): string

  /**
   * Get the string value of a token.
   *
   * @see {@linkcode TokenizeContext.sliceSerialize}
   */
  sliceSerialize: TokenizeContext['sliceSerialize']

  /**
   * Stack of nodes.
   *
   * @see {@linkcode StackedNode}
   */
  stack: StackedNode[]

  /**
   * Stack of tokens.
   *
   * @see {@linkcode TokenTuple}
   */
  tokenStack: TokenTuple[]
}

export type { CompileContext as default }
