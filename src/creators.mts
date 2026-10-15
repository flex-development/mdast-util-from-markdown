/**
 * @file creators
 * @module mdast-util-from-markdown/creators
 */

import type { CreateNode } from '@flex-development/mark/ast'
import type { Token } from '@flex-development/mark/parse'
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

export {
  blockquote,
  code,
  code as codeFlow,
  inlineCode as codeText,
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

/**
 * Create a blockquote.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Blockquote}
 *
 * @type {CreateNode<Blockquote>}
 *
 * @this {void}
 *
 * @return {Blockquote}
 *  The new node
 */
function blockquote(this: void): Blockquote {
  return u('blockquote', { children: [], position: undefined })
}

/**
 * Create flow code.
 *
 * @see {@linkcode Code}
 * @see {@linkcode CreateNode}
 *
 * @type {CreateNode<Code>}
 *
 * @this {void}
 *
 * @return {Code}
 *  The new node
 */
function code(this: void): Code {
  return u('code', { lang: null, meta: null, position: undefined, value: '' })
}

/**
 * Create a definition.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Definition}
 *
 * @type {CreateNode<Definition>}
 *
 * @this {void}
 *
 * @return {Definition}
 *  The new node
 */
function definition(this: void): Definition {
  return u('definition', {
    identifier: '',
    label: null,
    position: undefined,
    title: null,
    url: ''
  })
}

/**
 * Create an emphasis.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Emphasis}
 *
 * @type {CreateNode<Emphasis>}
 *
 * @this {void}
 *
 * @return {Emphasis}
 *  The new node
 */
function emphasis(this: void): Emphasis {
  return u('emphasis', { children: [], position: undefined })
}

/**
 * Create a hard break.
 *
 * @see {@linkcode Break}
 * @see {@linkcode CreateNode}
 *
 * @type {CreateNode<Break>}
 *
 * @this {void}
 *
 * @return {Break}
 *  The new node
 */
function hardBreak(this: void): Break {
  return u('break', { position: undefined })
}

/**
 * Create a heading.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Heading}
 *
 * @type {CreateNode<Heading>}
 *
 * @this {void}
 *
 * @return {Heading}
 *  The new node
 */
function heading(this: void): Heading {
  return u('heading', {
    children: [],
    depth: 0 as Heading['depth'],
    position: undefined
  })
}

/**
 * Create raw HTML.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Html}
 *
 * @type {CreateNode<Html>}
 *
 * @this {void}
 *
 * @return {Html}
 *  The new node
 */
function html(this: void): Html {
  return u('html', { position: undefined, value: '' })
}

/**
 * Create an image.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Image}
 *
 * @type {CreateNode<Image>}
 *
 * @this {void}
 *
 * @return {Image}
 *  The new node
 */
function image(this: void): Image {
  return u('image', { alt: null, position: undefined, title: null, url: '' })
}

/**
 * Create code text.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode InlineCode}
 *
 * @type {CreateNode<InlineCode>}
 *
 * @this {void}
 *
 * @return {InlineCode}
 *  The new node
 */
function inlineCode(this: void): InlineCode {
  return u('inlineCode', { position: undefined, value: '' })
}

/**
 * Create a link.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Link}
 *
 * @type {CreateNode<Link>}
 *
 * @this {void}
 *
 * @return {Link}
 *  The new node
 */
function link(this: void): Link {
  return u('link', { children: [], position: undefined, title: null, url: '' })
}

/**
 * Create a list.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode List}
 * @see {@linkcode Token}
 *
 * @type {CreateNode<List>}
 *
 * @this {void}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {List}
 *  The new node
 */
function list(this: void, token: Token): List {
  return u('list', {
    children: [],
    ordered: token.type === 'listOrdered',
    position: undefined,
    spread: token._spread,
    start: null
  })
}

/**
 * Create a list item.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode ListItem}
 * @see {@linkcode Token}
 *
 * @type {CreateNode<ListItem>}
 *
 * @this {void}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {ListItem}
 *  The new node
 */
function listItem(this: void, token: Token): ListItem {
  return u('listItem', {
    checked: null,
    children: [],
    position: undefined,
    spread: token._spread
  })
}

/**
 * Create a paragraph.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Paragraph}
 *
 * @type {CreateNode<Paragraph>}
 *
 * @this {void}
 *
 * @return {Paragraph}
 *  The new node
 */
function paragraph(this: void): Paragraph {
  return u('paragraph', { children: [], position: undefined })
}

/**
 * Create strong text.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Strong}
 *
 * @type {CreateNode<Strong>}
 *
 * @this {void}
 *
 * @return {Strong}
 *  The new node
 */
function strong(this: void): Strong {
  return u('strong', { children: [], position: undefined })
}

/**
 * Create text.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode Text}
 *
 * @type {CreateNode<Text>}
 *
 * @this {void}
 *
 * @return {Text}
 *  The new node
 */
function text(this: void): Text {
  return u('text', { position: undefined, value: '' })
}

/**
 * Create a thematic break.
 *
 * @see {@linkcode CreateNode}
 * @see {@linkcode ThematicBreak}
 *
 * @type {CreateNode<ThematicBreak>}
 *
 * @this {void}
 *
 * @return {ThematicBreak}
 *  The new node
 */
function thematicBreak(this: void): ThematicBreak {
  return u('thematicBreak', { position: undefined })
}
