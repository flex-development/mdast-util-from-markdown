/**
 * @file Interfaces - CompileContext
 * @module mdast-util-from-markdown/interfaces/CompileContext
 */

import type * as mark from '@flex-development/mark/ast'
import type {
  Buffer,
  CompileData,
  Config,
  Enter,
  Exit,
  Node,
  Resume,
  StackedToken,
  Transform
} from '@flex-development/mdast-util-from-markdown'
import type { Event, Token } from 'micromark-util-types'

/**
 * The event compilation context.
 *
 * Event compilation consumes the {@linkcode Event}s of a parser to produce a
 * syntax tree.
 *
 * During compilation, event handlers orchestrate {@linkcode Node} creation,
 * {@linkcode enter} nodes onto the {@linkcode stack}, and {@linkcode exit}
 * them later.
 *
 * The compilation {@linkcode config} defines how {@linkcode Token} types map to
 * compilation behavior.
 * After the initial compilation, {@linkcode Transform}s can be applied to
 * manipulate the final tree.
 *
 * @see {@linkcode mark.CompileContext}
 *
 * @extends {mark.CompileContext}
 */
interface CompileContext extends mark.CompileContext {
  /**
   * Start capturing output into a temporary node.
   *
   * Captured values can later be serialized with {@linkcode resume}.
   *
   * @see {@linkcode Buffer}
   *
   * @override
   */
  buffer: Buffer

  /**
   * The compilation configuration.
   *
   * @see {@linkcode Config}
   *
   * @override
   */
  config: Config

  /**
   * Info passed around; key/value store.
   *
   * @see {@linkcode CompileData}
   *
   * @override
   */
  data: CompileData

  /**
   * Enter a node.
   *
   * @see {@linkcode Enter}
   *
   * @override
   */
  enter: Enter

  /**
   * Exit a node.
   *
   * @see {@linkcode Exit}
   *
   * @override
   */
  exit: Exit

  /**
   * Stop {@linkcode buffer}ing and serialize the captured node.
   *
   * @see {@linkcode Resume}
   *
   * @override
   */
  resume: Resume

  /**
   * The node stack.
   *
   * @see {@linkcode Node}
   *
   * @override
   */
  stack: Node[]

  /**
   * The token stack.
   *
   * @see {@linkcode StackedToken}
   *
   * @override
   */
  tokenStack: StackedToken[]
}

export type { CompileContext as default }
