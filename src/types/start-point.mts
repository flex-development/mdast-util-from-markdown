/**
 * @file Type Aliases - StartPoint
 * @module mdast-util-from-markdown/types/StartPoint
 */

import type { Point } from 'micromark-util-types'

/**
 * The point before the first character in the content.
 *
 * @see {@linkcode Point}
 */
type StartPoint = Omit<Point, '_bufferIndex' | '_index'>

export type { StartPoint as default }
