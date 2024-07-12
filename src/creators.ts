/**
 * @file creators
 * @module mdast-util-from-markdown/creators
 */

import { u } from '@flex-development/unist-util-builder'
import type {
  Blockquote,
  Break,
  Code,
  Definition,
  Emphasis,
  Heading,
  Html,
  Image,
  InlineCode,
  Link,
  List,
  ListItem,
  Paragraph,
  Strong,
  Text,
  ThematicBreak
} from 'mdast'
import type { Token } from 'micromark-util-types'

/**
 * Create a blockquote.
 *
 * @see {@linkcode Blockquote}
 *
 * @return {Blockquote} Blockquote node
 */
function blockquote(): Blockquote {
  return u('blockquote', [])
}

/**
 * Create a code flow node.
 *
 * @see {@linkcode Code}
 *
 * @return {Code} Code flow node
 */
function code(): Code {
  return u('code', { lang: null, meta: null, value: '' })
}

/**
 * Create a definition.
 *
 * @see {@linkcode Definition}
 *
 * @return {Definition} Definition node
 */
function definition(): Definition {
  return u('definition', {
    identifier: '',
    label: null,
    title: null,
    url: ''
  })
}

/**
 * Create a definition.
 *
 * @see {@linkcode Emphasis}
 *
 * @return {Emphasis} Emphasis node
 */
function emphasis(): Emphasis {
  return u('emphasis', [])
}

/**
 * Create a break node.
 *
 * @see {@linkcode Break}
 *
 * @return {Break} Break node
 */
function hardBreak(): Break {
  return u('break')
}

/**
 * Create a heading.
 *
 * @see {@linkcode Heading}
 *
 * @return {Heading} Heading node
 */
function heading(): Heading {
  return u('heading', { children: [], depth: <Heading['depth']>0 })
}

/**
 * Create a raw HTML node.
 *
 * @see {@linkcode Html}
 *
 * @return {Html} Raw HTML node
 */
function html(): Html {
  return u('html', { value: '' })
}

/**
 * Create an image node.
 *
 * @see {@linkcode Image}
 *
 * @return {Image} Image node
 */
function image(): Image {
  return u('image', { alt: null, title: null, url: '' })
}

/**
 * Create an inline code node.
 *
 * @see {@linkcode InlineCode}
 *
 * @return {InlineCode} Inline code node
 */
function inlineCode(): InlineCode {
  return u('inlineCode', { value: '' })
}

/**
 * Create a link node.
 *
 * @see {@linkcode Link}
 *
 * @return {Link} Link node
 */
function link(): Link {
  return u('link', { children: [], title: null, url: '' })
}

/**
 * Create a list node.
 *
 * @see {@linkcode List}
 * @see {@linkcode Token}
 *
 * @param {Token} token - Token being entered
 * @return {List} List node
 */
function list(token: Token): List {
  return u('list', {
    children: [],
    ordered: token.type === 'listOrdered',
    spread: token._spread,
    start: null
  })
}

/**
 * Create a list item node.
 *
 * @see {@linkcode ListItem}
 * @see {@linkcode Token}
 *
 * @param {Token} token - Token being entered
 * @return {ListItem} List item node
 */
function listItem(token: Token): ListItem {
  return u('listItem', {
    checked: null,
    children: [],
    spread: token._spread
  })
}

/**
 * Create a paragraph node.
 *
 * @see {@linkcode Paragraph}
 *
 * @return {Paragraph} Paragraph node
 */
function paragraph(): Paragraph {
  return u('paragraph', [])
}

/**
 * Create a strong node.
 *
 * @see {@linkcode Strong}
 *
 * @return {Strong} Strong node
 */
function strong(): Strong {
  return u('strong', [])
}

/**
 * Create a text node.
 *
 * @see {@linkcode Text}
 *
 * @return {Text} Text node
 */
function text(): Text {
  return u('text', { value: '' })
}

/**
 * Create a thematic break node.
 *
 * @see {@linkcode ThematicBreak}
 *
 * @return {ThematicBreak} Thematic break node
 */
function thematicBreak(): ThematicBreak {
  return u('thematicBreak')
}

export {
  blockquote,
  code,
  definition,
  emphasis,
  hardBreak,
  heading,
  html,
  image,
  inlineCode,
  link,
  list,
  listItem,
  paragraph,
  strong,
  text,
  thematicBreak
}
