/**
 * @file fromMarkdown
 * @module mdast-util-from-markdown/fromMarkdown
 */

import type { Root } from 'mdast'
import { parse, postprocess, preprocess } from 'micromark'
import type { Encoding, Value } from 'micromark-util-types'
import compiler from './compiler'
import type { Options } from './types'

/**
 * Turn markdown into a syntax tree.
 *
 * @see {@linkcode Encoding}
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 * @see {@linkcode Value}
 *
 * @param {Value | null | undefined} value - Markdown to parse
 * @param {Encoding | null | undefined} [encoding] - Character encoding to use
 * when `value` is {@linkcode Uint8Array}
 * @param {Options | null | undefined} [options] - Configuration
 * @return {Root} mdast
 */
function fromMarkdown(
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
 * @param {Value | null | undefined} value - Markdown to parse
 * @param {Options | null | undefined} [options] - Configuration
 * @return {Root} mdast
 */
function fromMarkdown(
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
 * @param {Value | null | undefined} value - Markdown to parse
 * @param {Encoding | Options | null | undefined} [encoding] - Character
 * encoding to use when `value` is {@linkcode Uint8Array}, or configuration
 * @param {Options | null | undefined} [options] - Configuration
 * @return {Root} mdast
 */
function fromMarkdown(
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

export default fromMarkdown
