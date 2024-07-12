/**
 * @file Type Aliases - Options
 * @module mdast-util-from-markdown/types/Options
 */

import type { ParseOptions } from 'micromark-util-types'
import type FromMarkdownOptions from './options-from-markdown'

/**
 * Configuration options.
 *
 * @see {@linkcode FromMarkdownOptions}
 * @see {@linkcode ParseOptions}
 */
type Options = FromMarkdownOptions & ParseOptions

export type { Options as default }
