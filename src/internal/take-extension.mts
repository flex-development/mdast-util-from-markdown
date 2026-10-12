/**
 * @file Internal - takeExtension
 * @module mdast-util-from-markdown/internal/takeExtension
 */

import type {
  Config,
  Extension,
  TakeExtension
} from '@flex-development/mark/ast'

/**
 * Merge `extension` into the `combined` configuration.
 *
 * @internal
 *
 * @type {TakeExtension}
 *
 * @this {void}
 *
 * @param {Config} combined
 *  The current configuration
 * @param {Extension} extension
 *  The extension to merge
 * @param {keyof Extension | undefined} [field]
 *  The current `extension` field
 * @return {undefined}
 */
function takeExtension(
  this: void,
  combined: Config,
  extension: Extension,
  field?: keyof Extension | undefined
): undefined {
  if (field === 'canContainEols') {
    /**
     * The list of token types where line endings are allowed.
     *
     * @const {string[] | undefined} value
     */
    const value: string[] | undefined = extension[field]

    if (value) {
      combined[field] ??= []
      combined[field].push(...value)
    }
  }

  return void field
}

export default takeExtension
