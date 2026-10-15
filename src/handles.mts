/**
 * @file handles
 * @module mdast-util-from-markdown/handles
 */

import type { Context, Node } from '@flex-development/mark/ast'
import type { Token } from '@flex-development/mark/parse'
import type { Handle } from '@flex-development/mdast-util-from-markdown'
import { text } from '@flex-development/mdast-util-from-markdown/creators'
import { decodeNamedCharacterReference } from 'decode-named-character-reference'
import { ok } from 'devlop'
import type { Heading, ReferenceType } from 'mdast'
import {
  decodeNumericCharacterReference
} from 'micromark-util-decode-numeric-character-reference'
import { decodeString } from 'micromark-util-decode-string'
import { normalizeIdentifier } from 'micromark-util-normalize-identifier'
import { codes, constants, types } from 'micromark-util-symbol'
import point from './internal/point.mts'

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

/**
 * Enter data.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function enterdata(this: Context, token: Token): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok('children' in node, 'expected parent on stack')

  /**
   * The list of sibling nodes.
   *
   * @const {Node[]} siblings
   */
  const siblings: Node[] = node.children

  /**
   * The last sibling node.
   *
   * @var {Node | undefined} tail
   */
  let tail: Node | undefined = siblings.at(-1)

  // add a new `text` node.
  if (!tail || tail.type !== 'text') {
    tail = text() // @ts-expect-error(2322): `end` will be patched later.
    tail.position = { end: undefined, start: point(token.start) }
    siblings.push(tail)
  }

  return void this.stack.push(tail)
}

/**
 * Enter a list item value.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function enterlistitemvalue(this: Context, token: Token): undefined {
  if (this.data.expectingFirstListItemValue) {
    /**
     * The ancestor node.
     *
     * @const {Node | undefined} ancestor
     */
    const ancestor: Node | undefined = this.stack.at(-2)

    ok(ancestor, 'expected ancestor node on stack')
    ok(ancestor.type === 'list', 'expected list on stack')

    /**
     * The serialized token.
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
 * Enter an ordered list.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function enterlistordered(this: Context): undefined {
  return void (this.data.expectingFirstListItemValue = true)
}

/**
 * Enter a reference.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function enterreference(this: Context): undefined {
  return void (this.data.referenceType = 'collapsed')
}

/**
 * Exit a `mailto:` link.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitautolinkemail(this: Context, token: Token): undefined {
  exitdata.call(this, token)

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  node.url = 'mailto:' + this.sliceSerialize(token)
  return void node
}

/**
 * Exit an autolink.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitautolinkprotocol(this: Context, token: Token): undefined {
  exitdata.call(this, token)

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  node.url = this.sliceSerialize(token)
  return void node
}

/**
 * Exit an atx `heading`.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitatxheadingsequence(this: Context, token: Token): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'heading', 'expected heading on stack')

  if (!(node.depth as number)) {
    /**
     * The heading depth.
     *
     * @const {number} depth
     */
    const depth: number = this.sliceSerialize(token).length

    ok(depth >= 1 && depth <= 6, 'expected `depth` between `1` and `6`')
    node.depth = depth as Heading['depth']
  }

  return void node
}

/**
 * Exit a character reference.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitcharacterreference(this: Context, token: Token): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} tail
   */
  const tail: Node | undefined = this.stack.pop()

  ok(tail, 'expected `tail`')
  ok(tail.position, 'expected `tail.position`')

  tail.position.end = point(token.end)
  return void tail
}

/**
 * Exit a character reference marker.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitcharacterreferencemarker(
  this: Context,
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
 * Exit a character reference value.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitcharacterreferencevalue(
  this: Context,
  token: Token
): undefined {
  const { characterReferenceType } = this.data

  /**
   * The serialized token.
   *
   * @const {string} data
   */
  const data: string = this.sliceSerialize(token)

  /**
   * The node value.
   *
   * @var {string} value
   */
  let value: string

  if (characterReferenceType) {
    value = decodeNumericCharacterReference(
      data,
      characterReferenceType === types.characterReferenceMarkerNumeric
        ? constants.numericBaseDecimal
        : constants.numericBaseHexadecimal
    )
    this.data.characterReferenceType = undefined
  } else {
    /**
     * The decode result.
     *
     * @const {false | string} result
     */
    const result: false | string = decodeNamedCharacterReference(data)

    ok(result !== false, 'expected reference to decode')
    value = result
  }

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} tail
   */
  const tail: Node | undefined = this.stack.at(-1)

  ok(tail, 'expected `tail`')
  ok('value' in tail, 'expected `tail.value`')
  tail.value += value

  return void tail
}

/**
 * Exit fenced `code`.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodefenced(this: Context): undefined {
  /**
   * The node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')

  node.value = value.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')
  this.data.flowCodeInside = undefined

  return void node
}

/**
 * Exit a fenced code fence.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodefencedfence(this: Context): undefined {
  if (!this.data.flowCodeInside) {
    this.buffer()
    this.data.flowCodeInside = true
  }

  return void this.data.flowCodeInside
}

/**
 * Exit fenced code info.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodefencedfenceinfo(this: Context): undefined {
  /**
   * The language info to attach.
   *
   * @const {string} lang
   */
  const lang: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')

  node.lang = lang
  return void node
}

/**
 * Exit fenced code metadata.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodefencedfencemeta(this: Context): undefined {
  /**
   * The metadata to attach.
   *
   * @const {string} meta
   */
  const meta: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')

  node.meta = meta
  return void node
}

/**
 * Exit indented code.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodeindented(this: Context): undefined {
  /**
   * The node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'code', 'expected code on stack')

  node.value = value.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')
  return void node
}

/**
 * Exit code text.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitcodetext(this: Context): undefined {
  /**
   * The node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'inlineCode', 'expected inline code on stack')

  node.value = value
  return void node
}

/**
 * Exit data.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitdata(this: Context, token: Token): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} tail
   */
  const tail: Node | undefined = this.stack.pop()

  ok(tail, 'expected a `node` to be on the stack')
  ok('value' in tail, 'expected a `literal` to be on the stack')
  ok(tail.position, 'expected `node` to have an open position')

  tail.value += this.sliceSerialize(token)
  tail.position.end = point(token.end)

  return void tail
}

/**
 * Exit a definition destination string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitdefinitiondestinationstring(this: Context): undefined {
  /**
   * The definition url.
   *
   * @const {string} url
   */
  const url: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')

  node.url = url
  return void node
}

/**
 * Exit a definition label string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitdefinitionlabelstring(
  this: Context,
  token: Token
): undefined {
  /**
   * The definition label.
   *
   * @const {string} label
   */
  const label: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')

  node.label = label
  node.identifier = normalizeIdentifier(this.sliceSerialize(token))
  node.identifier = node.identifier.toLowerCase()

  return void node
}

/**
 * Exit a definition title string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitdefinitiontitlestring(this: Context): undefined {
  /**
   * The definition title.
   *
   * @const {string} title
   */
  const title: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'definition', 'expected definition on stack')

  node.title = title
  return void node
}

/**
 * Exit a hard break.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exithardbreak(this: Context): undefined {
  return void (this.data.atHardBreak = true)
}

/**
 * Exit raw HTML.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exithtml(this: Context): undefined {
  /**
   * The node value.
   *
   * @const {string} value
   */
  const value: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'html', 'expected html on stack')

  node.value = value
  return void node
}

/**
 * Exit an image.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitimage(this: Context): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'image', 'expected image on stack')

  if (this.data.inReference) {
    /**
     * The reference type.
     *
     * @var {ReferenceType | undefined} referenceType
     */
    let referenceType: ReferenceType | undefined = this.data.referenceType

    referenceType ??= 'shortcut'
    node.type += 'Reference'

    // @ts-expect-error(2339): mutate.
    node.referenceType = referenceType

    // @ts-expect-error(2339): mutate.
    delete node.url
    delete node.title
  } else {
    // @ts-expect-error(2339): mutate.
    delete node.identifier
    // @ts-expect-error(2339): mutate.
    delete node.label
  }

  return void (this.data.referenceType = undefined)
}

/**
 * Exit a label.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitlabel(this: Context): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} tail
   */
  const tail: Node | undefined = this.stack.at(-1)

  ok(tail, 'expected node on stack')
  ok(tail.type === 'fragment', 'expected fragment on stack')

  /**
   * The `alt` value of the image node.
   *
   * @const {string} alt
   */
  const alt: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  // assume a reference.
  this.data.inReference = true

  if (node.type === 'link') {
    node.children = tail.children
  } else {
    node.alt = alt
  }

  return void node
}

/**
 * Exit label text.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitlabeltext(this: Context, token: Token): undefined {
  /**
   * The label text.
   *
   * @const {string} string
   */
  const string: string = this.sliceSerialize(token)

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} ancestor
   */
  const ancestor: Node | undefined = this
    .stack[this.stack.length - 2]

  ok(ancestor, 'expected ancestor on stack')
  ok(
    ancestor.type === 'image' || ancestor.type === 'link',
    'expected image or link on stack'
  )

  // @ts-expect-error(2339): stash on node, might become a reference later.
  ancestor.label = decodeString(string)
  // @ts-expect-error(2339): same as above.
  ancestor.identifier = normalizeIdentifier(string).toLowerCase()

  return void ancestor
}

/**
 * Exit a line ending.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitlineending(this: Context, token: Token): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected `node`')

  // include line ending at hard break.
  if (this.data.atHardBreak) {
    ok('children' in node, 'expected `parent`')

    /**
     * The last child node.
     *
     * @const {Node} tail
     */
    const tail: Node = node.children[node.children.length - 1]!

    ok(tail, 'expected `tail`')
    ok(tail.position, 'expected tail to have a starting position')

    tail.position.end = point(token.end)
    this.data.atHardBreak = undefined

    return void tail
  }

  // parse line ending as text.
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
 * Exit a link.
 *
 * @see {@linkcode Context}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitlink(this: Context): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'link', 'expected link on stack')

  if (this.data.inReference) {
    /**
     * The reference type.
     *
     * @var {ReferenceType} referenceType
     */
    let referenceType: ReferenceType | undefined = this.data.referenceType

    referenceType ??= 'shortcut'
    node.type += 'Reference'

    // @ts-expect-error(2339): mutate.
    node.referenceType = referenceType

    // @ts-expect-error(2339): mutate.
    delete node.url
    delete node.title
  } else {
    // @ts-expect-error(2339): mutate.
    delete node.identifier
    // @ts-expect-error(2339): mutate.
    delete node.label
  }

  return void (this.data.referenceType = undefined)
}

/**
 * Exit a reference string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitreferencestring(this: Context, token: Token): undefined {
  /**
   * The reference string.
   *
   * @const {string} label
   */
  const label: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image reference or link reference on stack'
  )

  // @ts-expect-error(2339): stash on node, it might become a reference later.
  node.label = label
  // @ts-expect-error(2339): same as above.
  node.identifier = normalizeIdentifier(this.sliceSerialize(token))
  // @ts-expect-error(2339): same as above.
  node.identifier = (node.identifier as string).toLowerCase()

  this.data.referenceType = 'full'
  return void node
}

/**
 * Exit a resource.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitresource(this: Context): undefined {
  return void (this.data.inReference = undefined)
}

/**
 * Exit a resource destination string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitresourcedestinationstring(this: Context): undefined {
  /**
   * The resource destination.
   *
   * @const {string} url
   */
  const url: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  node.url = url
  return void node
}

/**
 * Exit a resource title string.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitresourcetitlestring(this: Context): undefined {
  /**
   * The resource destination title.
   *
   * @const {string} title
   */
  const title: string = this.resume()

  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(
    node.type === 'image' || node.type === 'link',
    'expected image or link on stack'
  )

  node.title = title
  return void node
}

/**
 * Exit a setext heading.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitsetextheading(this: Context): undefined {
  return void (this.data.setextHeadingSlurpLineEnding = undefined)
}

/**
 * Exit a setext heading line sequence.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 * @see {@linkcode Token}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @param {Token} token
 *  The corresponding token
 * @return {undefined}
 */
function exitsetextheadinglinesequence(
  this: Context,
  token: Token
): undefined {
  /**
   * The last node on the stack.
   *
   * @const {Node | undefined} node
   */
  const node: Node | undefined = this.stack.at(-1)

  ok(node, 'expected node on stack')
  ok(node.type === 'heading', 'expected heading on stack')

  node.depth = this.sliceSerialize(token).codePointAt(0) === codes.equalsTo
    ? 1
    : 2

  return void node
}

/**
 * Exit setext heading text.
 *
 * @see {@linkcode Context}
 * @see {@linkcode Handle}
 *
 * @type {Handle}
 *
 * @this {Context}
 *
 * @return {undefined}
 */
function exitsetextheadingtext(this: Context): undefined {
  return void (this.data.setextHeadingSlurpLineEnding = true)
}
