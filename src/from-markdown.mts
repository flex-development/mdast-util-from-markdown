/**
 * @file fromMarkdown
 * @module mdast-util-from-markdown/fromMarkdown
 */

import type {
  Encoding,
  Options,
  Value
} from '@flex-development/mdast-util-from-markdown'
import type { Root } from 'mdast'
import { parse, postprocess, preprocess } from 'micromark'
import compiler from './compiler.mts'

export default fromMarkdown

/**
 * Turn markdown into a syntax tree.
 *
 * @see {@linkcode Encoding}
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {Value | null | undefined} value
 *  The markdown to parse
 * @param {Encoding | null | undefined} [encoding]
 *  The character encoding to use when `value` is an {@linkcode Uint8Array}
 * @param {Options | null | undefined} [options]
 *  The configuration options
 * @return {Root}
 *  mdast
 */
function fromMarkdown(
  this: void,
  value: Value | null | undefined,
  encoding?: Encoding | null | undefined,
  options?: Options | null | undefined
): Root

/**
 * Turn markdown into a syntax tree.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {Value | null | undefined} value
 *  The markdown to parse
 * @param {Options | null | undefined} [options]
 *  The configuration options
 * @return {Root}
 *  mdast
 */
function fromMarkdown(
  this: void,
  value: Value | null | undefined,
  options?: Options | null | undefined
): Root

/**
 * Turn markdown into a syntax tree.
 *
 * @see {@linkcode Encoding}
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {Value | null | undefined} value
 *  The markdown to parse
 * @param {Encoding | Options | null | undefined} [encoding]
 *  The character encoding to use when `value` is an {@linkcode Uint8Array},
 *  or configuration options
 * @param {Options | null | undefined} [options]
 *  The configuration options
 * @return {Root}
 *  mdast
 */
function fromMarkdown(
  this: void,
  value: Value | null | undefined,
  encoding?: Encoding | Options | null | undefined,
  options?: Options | null | undefined
): Root {
  if (typeof encoding !== 'string') {
    options = encoding
    encoding = undefined
  }

  return compiler(options)(
    postprocess(
      parse(options)
        .document(options?.from ?? undefined)
        .write(preprocess()(value ?? '', encoding, true))
    )
  )
}
