/**
 * @file Internal - prepareList
 * @module mdast-util-from-markdown/internal/prepareList
 */

import type { Event, Token } from '@flex-development/mark/parse'
import { u } from '@flex-development/unist-util-builder'
import { types } from 'micromark-util-symbol'

export default prepareList

/**
 * Preprocess a list to add `listItem` tokens,
 * and to infer whether list items are spread out.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  The current list of events
 * @param {number} start
 *  The index to start at
 * @param {number} length
 *  The index to end at
 * @return {number}
 *  The next event index
 */
function prepareList(
  this: void,
  events: Event[],
  start: number,
  length: number
): number {
  /**
   * Whether we're at a list item marker.
   *
   * @var {boolean | undefined} atMarker
   */
  let atMarker: boolean | undefined

  /**
   * The number of columns to shift when entering or exiting a container.
   *
   * @var {number} containerBalance
   */
  let containerBalance: number = -1

  /**
   * The index of the first blank line.
   *
   * @var {number | undefined} firstBlankLineIndex
   */
  let firstBlankLineIndex: number | undefined

  /**
   * The index of the current event.
   *
   * @var {number} index
   */
  let index: number = start - 1

  /**
   * The index of the current line ending.
   *
   * @var {number | undefined} lineIndex
   */
  let lineIndex: number | undefined

  /**
   * The list item token.
   *
   * @var {Token | undefined} listItem
   */
  let listItem: Token | undefined

  /**
   * Whether one or more children is separated by a blank line.
   *
   * @var {boolean} listSpread
   */
  let listSpread: boolean = false

  while (++index <= length) {
    const [ev, token, tokenize] = events[index]!

    switch (token.type) {
      case types.blockQuote:
      case types.listOrdered:
      case types.listUnordered:
        ev === 'enter' ? containerBalance++ : containerBalance--
        atMarker = undefined
        break
      case types.lineEndingBlank:
        if (ev === 'enter') {
          if (
            listItem &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index
          }

          atMarker = undefined
        }

        break
      case types.linePrefix:
      case types.listItemMarker:
      case types.listItemPrefix:
      case types.listItemPrefixWhitespace:
      case types.listItemValue:
        break
      default:
        atMarker = undefined
    }

    if (
      (
        !containerBalance &&
        ev === 'enter' &&
        token.type === types.listItemPrefix
      ) ||
      (
        containerBalance === -1 &&
        ev === 'exit' &&
        (
          token.type === types.listOrdered ||
          token.type === types.listUnordered
        )
      )
    ) {
      if (listItem) {
        /**
         * The last index.
         *
         * @var {number} tailIndex
         */
        let tailIndex: number = index

        lineIndex = undefined

        while (tailIndex--) {
          const [ev, token] = events[tailIndex]!

          if (
            token.type === types.lineEnding ||
            token.type === types.lineEndingBlank
          ) {
            if (ev === 'exit') continue

            if (lineIndex) {
              events[lineIndex]![1].type = types.lineEndingBlank
              listSpread = true
            }

            token.type = types.lineEnding
            lineIndex = tailIndex
          } else if (
            token.type === types.blockQuoteMarker ||
            token.type === types.blockQuotePrefix ||
            token.type === types.blockQuotePrefixWhitespace ||
            token.type === types.linePrefix ||
            token.type === types.listItemIndent
          ) {
            // empty
          } else {
            break
          }
        }

        if (
          firstBlankLineIndex &&
          (!lineIndex || firstBlankLineIndex < lineIndex)
        ) {
          listItem._spread = true
        }

        // fix position.
        listItem.end = Object.assign(
          {},
          lineIndex ? events[lineIndex]![1].start : token.end
        )

        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        events.splice(lineIndex || index, 0, ['exit', listItem, tokenize])
        index++
        length++
      }

      // create new list item.
      if (token.type === types.listItemPrefix) {
        listItem = u('listItem', {
          _spread: false,
          end: undefined as never,
          start: Object.assign({}, token.start)
        })

        events.splice(index, 0, ['enter', listItem, tokenize])
        index++
        length++
        firstBlankLineIndex = undefined
        atMarker = true
      }
    }
  }

  events[start]![1]._spread = listSpread
  return length
}
