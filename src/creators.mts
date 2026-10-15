/**
 * @file creators
 * @module mdast-util-from-markdown/creators
 */

import type * as ast from '@flex-development/mark/ast'
import type * as parse from '@flex-development/mark/parse'
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
 * @see {@linkcode Blockquote}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Blockquote>}
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
 * @see {@linkcode ast.CreateNode}
 * @see {@linkcode Code}
 *
 * @type {ast.CreateNode<Code>}
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
 * @see {@linkcode Definition}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Definition>}
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
 * @see {@linkcode Emphasis}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Emphasis>}
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
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Break>}
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
 * @see {@linkcode Heading}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Heading>}
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
 * @see {@linkcode Html}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Html>}
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
 * @see {@linkcode Image}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Image>}
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
 * @see {@linkcode InlineCode}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<InlineCode>}
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
 * @see {@linkcode Link}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Link>}
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
 * @see {@linkcode List}
 * @see {@linkcode ast.CreateNode}
 * @see {@linkcode parse.Token}
 *
 * @type {ast.CreateNode<List>}
 *
 * @this {void}
 *
 * @param {parse.Token} token
 *  The corresponding token
 * @return {List}
 *  The new node
 */
function list(this: void, token: parse.Token): List {
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
 * @see {@linkcode ListItem}
 * @see {@linkcode ast.CreateNode}
 * @see {@linkcode parse.Token}
 *
 * @type {ast.CreateNode<ListItem>}
 *
 * @this {void}
 *
 * @param {parse.Token} token
 *  The corresponding token
 * @return {ListItem}
 *  The new node
 */
function listItem(this: void, token: parse.Token): ListItem {
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
 * @see {@linkcode Paragraph}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Paragraph>}
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
 * @see {@linkcode Strong}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Strong>}
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
 * @see {@linkcode Text}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<Text>}
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
 * @see {@linkcode ThematicBreak}
 * @see {@linkcode ast.CreateNode}
 *
 * @type {ast.CreateNode<ThematicBreak>}
 *
 * @this {void}
 *
 * @return {ThematicBreak}
 *  The new node
 */
function thematicBreak(this: void): ThematicBreak {
  return u('thematicBreak', { position: undefined })
}
