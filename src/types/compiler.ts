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
 * @param {Event[]} events - List of events
 * @return {Root} mdast
 */
type Compiler = (events: Event[]) => Root

export type { Compiler as default }
