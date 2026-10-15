/**
 * @file takeExtension
 * @module mdast-util-from-markdown/takeExtension
 */

import type * as ast from '@flex-development/mark/ast'

/**
 * Merge `extension` into the `combined` configuration.
 *
 * @see {@linkcode ast.Config}
 * @see {@linkcode ast.Extension}
 * @see {@linkcode ast.TakeExtension}
 *
 * @type {ast.TakeExtension}
 *
 * @this {void}
 *
 * @param {ast.Config} combined
 *  The current configuration
 * @param {ast.Extension} extension
 *  The extension to merge
 * @param {keyof ast.Extension | undefined} [field]
 *  The current `extension` field
 * @return {undefined}
 */
function takeExtension(
  this: void,
  combined: ast.Config,
  extension: ast.Extension,
  field?: keyof ast.Extension | undefined
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
