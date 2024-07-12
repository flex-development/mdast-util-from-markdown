/**
 * @file Utilities - configure
 * @module mdast-util-from-markdown/utils/configure
 */

import type { Config, Extension } from '#src/types'
import extension from './extension'

/**
 * Configure `extensions`.
 *
 * @see {@linkcode Config}
 * @see {@linkcode Extension}
 *
 * @param {Config} combined - Configuration
 * @param {(Extension | Extension[])[]} extensions - Extensions to merge
 * @return {undefined} Nothing
 */
function configure(
  combined: Config,
  extensions: (Extension | Extension[])[]
): undefined {
  /**
   * Current index.
   *
   * @var {number} index
   */
  let index: number = -1

  while (++index < extensions.length) {
    /**
     * Current extension or list of extensions.
     *
     * @const {Extension | Extension[]} value
     */
    const value: Extension | Extension[] = extensions[index]!

    if (Array.isArray(value)) {
      configure(combined, value)
    } else {
      extension(combined, value)
    }
  }

  return void combined
}

export default configure
