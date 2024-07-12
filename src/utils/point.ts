/**
 * @file Utilities - point
 * @module mdast-util-from-markdown/utils/point
 */

import type { Point } from 'unist'

/**
 * Copy a point-like value.
 *
 * @see {@linkcode Point}
 *
 * @param {Point} pt - Point to copy
 * @return {Point} unist point
 */
function point(pt: Point): Point {
  return { column: pt.column, line: pt.line, offset: pt.offset }
}

export default point
