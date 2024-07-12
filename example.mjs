import { fromMarkdown } from '@flex-development/mdast-util-from-markdown'
import { inspect } from '@flex-development/unist-util-inspect'
import { read } from 'to-vfile'

const file = await read('example.md')
const tree = fromMarkdown(String(file))

console.log(inspect(tree))
