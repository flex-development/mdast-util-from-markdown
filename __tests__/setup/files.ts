/**
 * @file Test Setup - files
 * @module tests/setup/files
 */

import pathe from '@flex-development/pathe'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'
import { findDownAll } from 'vfile-find-down'

/**
 * Fixture files.
 *
 * @const {VFile[]} files
 */
const files: VFile[] = await findDownAll('.md', pathe.resolve('__fixtures__'))

// populate file.value
for (const file of files) await read(file)

global.files = files
