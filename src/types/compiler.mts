/**
 * @file Type Aliases - Compiler
 * @module mdast-util-from-markdown/types/Compiler
 */

import type { Root } from 'mdast'
import type { Event } from 'micromark-util-types'

/**
 * Turn micromark events into a syntax tree.
 *
 * @see {@linkcode Event}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @param {Event[] | null | undefined} [events]
 *  The list of events
 * @return {Root}
 *  mdast
 */
type Compiler = (this: void, events?: Event[] | null | undefined) => Root

export type { Compiler as default }
