/**
 * @file handles
 * @module mdast-util-from-markdown/handles
 */

import { decodeNamedCharacterReference } from 'decode-named-character-reference'
import { ok } from 'devlop'
import type { Heading, Nodes, ReferenceType } from 'mdast'
import {
  decodeNumericCharacterReference
} from 'micromark-util-decode-numeric-character-reference'
import { decodeString } from 'micromark-util-decode-string'
import { normalizeIdentifier } from 'micromark-util-normalize-identifier'
import { codes, constants, types } from 'micromark-util-symbol'
import type { Token } from 'micromark-util-types'
import { text } from './creators'
import type {
  CharacterReferenceType,
  CompileContext,
  StackedNode
} from './types'
import { point } from './utils'

/**
 * Open a `text` node with arbitrary data.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function enterdata(this: CompileContext, token: Token): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok('children' in node, 'expected parent on stack')

  /**
   * Sibling nodes.
   *
   * @const {Nodes[]} siblings
   */
  const siblings: Nodes[] = node.children

  /**
   * Last sibling node.
   *
   * @var {Nodes} tail
   */
  let tail: Nodes | undefined = siblings.at(-1)

  // add data node
  if (!tail || tail.type !== 'text') {
    tail = text()
    tail.position = { end: <never>undefined, start: point(token.start) }
    siblings.push(tail)
  }

  return void this.stack.push(tail)
}

/**
 * Attach the starting number of a list.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function enterlistitemvalue(this: CompileContext, token: Token): undefined {
  if (this.data.expectingFirstListItemValue) {
    /**
     * Ancestor node.
     *
     * @const {StackedNode | undefined} ancestor
     */
    const ancestor: StackedNode | undefined = this.stack.at(-2)

    ok(ancestor, 'expected ancestor node on stack')
    ok(ancestor.type === 'list', 'expected list on stack')

    /**
     * String value of {@linkcode token}.
     *
     * @const {string} value
     */
    const value: string = this.sliceSerialize(token)

    ancestor.start = Number.parseInt(value, constants.numericBaseDecimal)
    this.data.expectingFirstListItemValue = undefined
  }

  return void token
}

/**
 * Expect the first list item value.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function enterlistordered(this: CompileContext): undefined {
  return void (this.data.expectingFirstListItemValue = true)
}

/**
 * Open a reference.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function enterreference(this: CompileContext): undefined {
  return void (this.data.referenceType = 'collapsed')
}

/**
 * Close a `link` node representing a `mailto` link.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitautolinkemail(this: CompileContext, token: Token): undefined {
  exitdata.call(this, token)

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  node.url = 'mailto:' + this.sliceSerialize(token)
  return void node
}

/**
 * Close a `link` node.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitautolinkprotocol(this: CompileContext, token: Token): undefined {
  exitdata.call(this, token)

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  node.url = this.sliceSerialize(token)
  return void node
}

/**
 * Close an atx `heading`.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitatxheadingsequence(this: CompileContext, token: Token): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'heading', 'expected heading on stack')

  // set heading depth
  if (!<number>node.depth) {
    /**
     * Heading depth.
     *
     * @const {number} depth
     */
    const depth: number = this.sliceSerialize(token).length

    ok(depth >= 1 && depth <= 6, 'expected `depth` between `1` and `6`')
    node.depth = <Heading['depth']>depth
  }

  return void node
}

/**
 * Close a character reference.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitcharacterreference(this: CompileContext, token: Token): undefined {
  /**
   * Tail node.
   *
   * @const {StackedNode | undefined} tail
   */
  const tail: StackedNode | undefined = this.stack.pop()

  ok(tail, 'expected `tail`')
  ok(tail.position, 'expected `tail.position`')
  tail.position.end = point(token.end)

  return void tail
}

/**
 * Set the current character reference type.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitcharacterreferencemarker(
  this: CompileContext,
  token: Token
): undefined {
  ok(
    token.type === 'characterReferenceMarkerNumeric' ||
      token.type === 'characterReferenceMarkerHexadecimal'
  )

  this.data.characterReferenceType = token.type
  return void token
}

/**
 * Attach a character reference value.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitcharacterreferencevalue(
  this: CompileContext,
  token: Token
): undefined {
  /**
   * Serialized token.
   *
   * @const {string} data
   */
  const data: string = this.sliceSerialize(token)

  /**
   * Character reference type.
   *
   * @const {CharacterReferenceType | undefined} type
   */
  const type: CharacterReferenceType | undefined = this
    .data
    .characterReferenceType

  /**
   * Node value.
   *
   * @var {string} value
   */
  let value: string

  if (type) {
    value = decodeNumericCharacterReference(
      data,
      type === types.characterReferenceMarkerNumeric
        ? constants.numericBaseDecimal
        : constants.numericBaseHexadecimal
    )
    this.data.characterReferenceType = undefined
  } else {
    /**
     * Decoded reference.
     *
     * @const {false | string} result
     */
    const result: false | string = decodeNamedCharacterReference(data)

    ok(result !== false, 'expected reference to decode')
    value = result
  }

  /**
   * Tail node.
   *
   * @const {StackedNode | undefined} tail
   */
  const tail: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(tail, 'expected `tail`')
  ok('value' in tail, 'expected `tail.value`')
  tail.value += value

  return void tail
}

/**
 * Close fenced `code`.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodefenced(this: CompileContext): undefined {
  /**
   * Node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')

  node.value = value.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')
  this.data.flowCodeInside = undefined

  return void node
}

/**
 * Handle a code fence.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodefencedfence(this: CompileContext): undefined {
  if (!this.data.flowCodeInside) {
    this.buffer()
    this.data.flowCodeInside = true
  }

  return void this.data.flowCodeInside
}

/**
 * Attach language info to fenced code.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodefencedfenceinfo(this: CompileContext): undefined {
  /**
   * Language info.
   *
   * @const {string} lang
   */
  const lang: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')
  node.lang = lang

  return void node
}

/**
 * Attach metadata to fenced code.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodefencedfencemeta(this: CompileContext): undefined {
  /**
   * Metadata.
   *
   * @const {string} meta
   */
  const meta: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')
  node.meta = meta

  return void node
}

/**
 * Close indented `code`.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodeindented(this: CompileContext): undefined {
  /**
   * Node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')
  node.value = value.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')

  return void node
}

/**
 * Close an `inlineCode` node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitcodetext(this: CompileContext): undefined {
  /**
   * Node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'inlineCode', 'expected inline code on stack')
  node.value = value

  return void node
}

/**
 * Close a `text` node.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitdata(this: CompileContext, token: Token): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} tail
   */
  const tail: StackedNode | undefined = this.stack.pop()

  ok(tail, 'expected a `node` to be on the stack')
  ok('value' in tail, 'expected a `literal` to be on the stack')
  ok(tail.position, 'expected `node` to have an open position')

  tail.value += this.sliceSerialize(token)
  tail.position.end = point(token.end)

  return void tail
}

/**
 * Close a `definition` url.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitdefinitiondestinationstring(this: CompileContext): undefined {
  /**
   * Definition url.
   *
   * @const {string} url
   */
  const url: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')
  node.url = url

  return void node
}

/**
 * Close a `definition` identifier and label.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitdefinitionlabelstring(
  this: CompileContext,
  token: Token
): undefined {
  /**
   * Definition label.
   *
   * @const {string} label
   */
  const label: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')

  node.label = label
  node.identifier = normalizeIdentifier(this.sliceSerialize(token))
  node.identifier = node.identifier.toLowerCase()

  return void node
}

/**
 * Close a `definition` title.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitdefinitiontitlestring(this: CompileContext): undefined {
  /**
   * Definition title.
   *
   * @const {string} title
   */
  const title: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')
  node.title = title

  return void node
}

/**
 * Indicate a hard break.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exithardbreak(this: CompileContext): undefined {
  return void (this.data.atHardBreak = true)
}

/**
 * Close an `html` node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exithtml(this: CompileContext): undefined {
  /**
   * Node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'html', 'expected html on stack')
  node.value = value

  return void node
}

/**
 * Close an `image` node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitimage(this: CompileContext): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'image', 'expected image on stack')

  if (this.data.inReference) {
    /**
     * Reference type.
     *
     * @var {ReferenceType} referenceType
     */
    let referenceType: ReferenceType | undefined = this.data.referenceType

    referenceType ??= 'shortcut'
    node.type += 'Reference'

    // @ts-expect-error: mutate
    node.referenceType = referenceType

    // @ts-expect-error: mutate.
    delete node.url
    delete node.title
  } else {
    // @ts-expect-error: mutate.
    delete node.identifier
    // @ts-expect-error: mutate.
    delete node.label
  }

  return void (this.data.referenceType = undefined)
}

/**
 * Close an `image` or `link` label.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitlabel(this: CompileContext): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} tail
   */
  const tail: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(tail, 'expected node on stack')
  ok(tail.type === 'fragment', 'expected fragment on stack')

  /**
   * Image node `alt` value.
   *
   * @const {string} alt
   */
  const alt: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  // assume a reference
  this.data.inReference = true

  if (node.type === 'link') {
    node.children = tail.children
  } else {
    node.alt = alt
  }

  return void node
}

/**
 * Close `image` or `link` label text.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitlabeltext(this: CompileContext, token: Token): undefined {
  /**
   * Label text.
   *
   * @const {string} string
   */
  const string: string = this.sliceSerialize(token)

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} ancestor
   */
  const ancestor: StackedNode | undefined = this
    .stack[this.stack.length - 2]

  ok(ancestor, 'expected ancestor on stack')
  ok(
    ancestor.type === 'image' || ancestor.type === 'link',
    'expected image or link on stack'
  )

  // @ts-expect-error stash on node, as it might become a reference later
  ancestor.label = decodeString(string)
  // @ts-expect-error: same as above
  ancestor.identifier = normalizeIdentifier(string).toLowerCase()

  return void ancestor
}

/**
 * Close a line ending.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitlineending(this: CompileContext, token: Token): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected `node`')

  // include line ending at hard break
  if (this.data.atHardBreak) {
    ok('children' in node, 'expected `parent`')

    /**
     * Last child node.
     *
     * @const {StackedNode} tail
     */
    const tail: StackedNode = node.children[node.children.length - 1]!

    ok(tail, 'expected `tail`')
    ok(tail.position, 'expected tail to have a starting position')

    tail.position.end = point(token.end)
    this.data.atHardBreak = undefined

    return void tail
  }

  // parse line ending as text
  if (
    !this.data.setextHeadingSlurpLineEnding &&
    this.config.canContainEols.includes(node.type)
  ) {
    enterdata.call(this, token)
    exitdata.call(this, token)
  }

  return void node
}

/**
 * Close a `link` node.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitlink(this: CompileContext): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  if (this.data.inReference) {
    /**
     * Reference type.
     *
     * @var {ReferenceType} referenceType
     */
    let referenceType: ReferenceType | undefined = this.data.referenceType

    referenceType ??= 'shortcut'
    node.type += 'Reference'

    // @ts-expect-error: mutate
    node.referenceType = referenceType

    // @ts-expect-error: mutate.
    delete node.url
    delete node.title
  } else {
    // @ts-expect-error: mutate.
    delete node.identifier
    // @ts-expect-error: mutate.
    delete node.label
  }

  return void (this.data.referenceType = undefined)
}

/**
 * Close a reference string.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitreferencestring(this: CompileContext, token: Token): undefined {
  /**
   * Reference string.
   *
   * @const {string} label
   */
  const label: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image reference or link reference on stack'
  )

  // @ts-expect-error: stash on node, as it might become a reference later
  node.label = label
  // @ts-expect-error: same as above
  node.identifier = normalizeIdentifier(this.sliceSerialize(token))
  // @ts-expect-error: same as above
  node.identifier = (<string>node.identifier).toLowerCase()

  this.data.referenceType = 'full'
  return void node
}

/**
 * Indicate the end of a reference.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitresource(this: CompileContext): undefined {
  return void (this.data.inReference = undefined)
}

/**
 * Close an `image` or `link` url.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitresourcedestinationstring(this: CompileContext): undefined {
  /**
   * Resource destination.
   *
   * @const {string} url
   */
  const url: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  node.url = url

  return void node
}

/**
 * Close an `image` or `link` title.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitresourcetitlestring(this: CompileContext): undefined {
  /**
   * Resource destination title.
   *
   * @const {string} title
   */
  const title: string = this.resume()

  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  node.title = title

  return void node
}

/**
 * Indicate a line ending from a setext heading is not expected.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitsetextheading(this: CompileContext): undefined {
  return void (this.data.setextHeadingSlurpLineEnding = undefined)
}

/**
 * Close a setext `heading`.
 *
 * @see {@linkcode CompileContext}
 * @see {@linkcode Token}
 *
 * @this {CompileContext}
 *
 * @param {Token} token - Token to handle
 * @return {undefined} Nothing
 */
function exitsetextheadinglinesequence(
  this: CompileContext,
  token: Token
): undefined {
  /**
   * Last node on stack.
   *
   * @const {StackedNode | undefined} node
   */
  const node: StackedNode | undefined = this.stack[this.stack.length - 1]

  ok(node, 'expected node on stack')
  ok(node.type === 'heading', 'expected heading on stack')

  node.depth = this.sliceSerialize(token).codePointAt(0) === codes.equalsTo
    ? 1
    : 2

  return void node
}

/**
 * Indicate a line ending from a setext heading is expected.
 *
 * @see {@linkcode CompileContext}
 *
 * @this {CompileContext}
 *
 * @return {undefined} Nothing
 */
function exitsetextheadingtext(this: CompileContext): undefined {
  return void (this.data.setextHeadingSlurpLineEnding = true)
}

export {
  enterdata,
  enterlistitemvalue,
  enterlistordered,
  enterreference,
  exitatxheadingsequence,
  exitautolinkemail,
  exitautolinkprotocol,
  exitcharacterreference,
  exitcharacterreferencemarker,
  exitcharacterreferencevalue,
  exitcodefenced,
  exitcodefencedfence,
  exitcodefencedfenceinfo,
  exitcodefencedfencemeta,
  exitcodeindented,
  exitcodetext,
  exitdata,
  exitdefinitiondestinationstring,
  exitdefinitionlabelstring,
  exitdefinitiontitlestring,
  exithardbreak,
  exithtml,
  exitimage,
  exitlabel,
  exitlabeltext,
  exitlineending,
  exitlink,
  exitreferencestring,
  exitresource,
  exitresourcedestinationstring,
  exitresourcetitlestring,
  exitsetextheading,
  exitsetextheadinglinesequence,
  exitsetextheadingtext
}
