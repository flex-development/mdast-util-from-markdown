/**
 * @file preprocess
 * @module mdast-util-from-markdown/preprocess
 */

import type * as ast from '@flex-development/mark/ast'
import type * as parse from '@flex-development/mark/parse'
import { ok } from 'devlop'
import { types } from 'micromark-util-symbol'
import prepareList from './internal/prepare-list.mts'

export default preprocess

/**
 * Prepare `events` before compilation begins.
 *
 * @see {@linkcode ast.Context}
 * @see {@linkcode ast.Preprocess}
 * @see {@linkcode parse.Event}
 *
 * @type {ast.Preprocess}
 *
 * @this {ast.Context}
 *
 * @param {parse.Event[]} events
 *  The current list of events
 * @return {undefined}
 */
function preprocess(this: ast.Context, events: parse.Event[]): undefined {
  /**
   * The `enter` event positions for each list.
   *
   * @const {number[]} listStack
   */
  const listStack: number[] = []

  /**
   * The index of the current event.
   *
   * @var {number} index
   */
  let index: number = -1

  // preprocess lists to add `listItem` tokens,
  // and to infer whether list items are spread out.
  while (++index < events.length) {
    const [type, token] = events[index]!

    if (
      token.type === types.listOrdered ||
      token.type === types.listUnordered
    ) {
      if (type === 'enter') {
        listStack.push(index)
      } else {
        /**
         * The last list token index.
         *
         * @const {number | undefined} tail
         */
        const tail: number | undefined = listStack.pop()

        ok(typeof tail === 'number', 'expected list to be open')
        index = prepareList(events, tail, index)
      }
    }
  }

  return void events
}
