/**
 * @file Utilities - extension
 * @module mdast-util-from-markdown/utils/extension
 */

import type {
  Config,
  Extension,
  Handles,
  Transform
} from '#src/types'

/**
 * Merge the given `extension` into `combined`.
 *
 * @see {@linkcode Config}
 * @see {@linkcode Extension}
 *
 * @param {Config} combined - Configuration
 * @param {Extension} extension - Extension to merge
 * @return {undefined} Nothing
 */
function extension(combined: Config, extension: Extension): undefined {
  /**
   * Extension key.
   *
   * @var {keyof Extension} key
   */
  let key: keyof Extension

  for (key in extension) {
    if (Object.hasOwnProperty.call(extension, key)) {
      switch (key) {
        case 'canContainEols':
          /**
           * Token types where line endings are used.
           *
           * @const {string[] | undefined} eols
           */
          const eols: string[] | undefined = extension[key]

          if (eols) combined[key].push(...eols)
          break
        case 'enter':
        case 'exit':
          /**
           * Opening and closing
           *
           * @const {Handles | undefined} eols
           */
          const handles: Handles | undefined = extension[key]

          if (handles) Object.assign(combined[key], handles)
          break
        case 'transforms':
          /**
           * Tree transforms.
           *
           * @const {Transform[] | undefined} transforms
           */
          const transforms: Transform[] | undefined = extension[key]

          if (transforms) combined[key].push(...transforms)
          break
      }
    }
  }

  return void extension
}

export default extension
