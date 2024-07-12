/**
 * @file compiler
 * @module mdast-util-from-markdown/compiler
 */

import { u } from '@flex-development/unist-util-builder'
import {
  stringifyPosition
} from '@flex-development/unist-util-stringify-position'
import { ok } from 'devlop'
import type { Nodes, Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import { types } from 'micromark-util-symbol'
import type { Event, Token } from 'micromark-util-types'
import {
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
  thematicBreak
} from './creators'
import {
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
} from './handles'
import type {
  CompileContext,
  CompileData,
  Compiler,
  Config,
  Fragment,
  Handle,
  Handles,
  OnEnterError,
  OnExitError,
  Options,
  StartPoint,
  TokenTuple
} from './types'
import { configure, point, prepareList } from './utils'

/**
 * Create an mdast compiler.
 *
 * > 👉 The compiler only understands complete buffering, not streaming.
 *
 * @see {@linkcode Compiler}
 * @see {@linkcode Options}
 *
 * @param {Options | null | undefined} [options] - Configuration
 * @return {Compiler} mdast compiler
 */
function compiler(options?: Options | null | undefined): Compiler {
  /**
   * Point before first character in markdown value.
   *
   * Node positions will be relative to this point.
   *
   * @const {StartPoint} from
   */
  const from: StartPoint = options?.from ?? { column: 1, line: 1, offset: 0 }

  /**
   * Compile data.
   *
   * @const {CompileData} data
   */
  const data: CompileData = {}

  /**
   * Configuration.
   *
   * @const {Config} config
   */
  const config: Config = {
    canContainEols: [
      'emphasis',
      'fragment',
      'heading',
      'paragraph',
      'strong'
    ],
    enter: {
      atxHeading: opener(heading),
      autolink: opener(link),
      autolinkEmail: enterdata,
      autolinkProtocol: enterdata,
      blockQuote: opener(blockquote),
      characterEscape: enterdata,
      characterReference: enterdata,
      codeFenced: opener(code),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeFlowValue: enterdata,
      codeIndented: opener(code, buffer),
      codeText: opener(inlineCode, buffer),
      codeTextData: enterdata,
      data: enterdata,
      definition: opener(definition),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: enterdata,
      htmlText: opener(html, buffer),
      htmlTextData: enterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: enterlistitemvalue,
      listOrdered: opener(list, enterlistordered),
      listUnordered: opener(list),
      paragraph: opener(paragraph),
      reference: enterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: exitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: exitautolinkemail,
      autolinkProtocol: exitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: exitdata,
      characterReference: exitcharacterreference,
      characterReferenceMarkerHexadecimal: exitcharacterreferencemarker,
      characterReferenceMarkerNumeric: exitcharacterreferencemarker,
      characterReferenceValue: exitcharacterreferencevalue,
      codeFenced: closer(exitcodefenced),
      codeFencedFence: exitcodefencedfence,
      codeFencedFenceInfo: exitcodefencedfenceinfo,
      codeFencedFenceMeta: exitcodefencedfencemeta,
      codeFlowValue: exitdata,
      codeIndented: closer(exitcodeindented),
      codeText: closer(exitcodetext),
      codeTextData: exitdata,
      data: exitdata,
      definition: closer(),
      definitionDestinationString: exitdefinitiondestinationstring,
      definitionLabelString: exitdefinitionlabelstring,
      definitionTitleString: exitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(exithardbreak),
      hardBreakTrailing: closer(exithardbreak),
      htmlFlow: closer(exithtml),
      htmlFlowData: exitdata,
      htmlText: closer(exithtml),
      htmlTextData: exitdata,
      image: closer(exitimage),
      label: exitlabel,
      labelText: exitlabeltext,
      lineEnding: exitlineending,
      link: closer(exitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: exitreferencestring,
      resource: exitresource,
      resourceDestinationString: exitresourcedestinationstring,
      resourceTitleString: exitresourcetitlestring,
      setextHeading: closer(exitsetextheading),
      setextHeadingLineSequence: exitsetextheadinglinesequence,
      setextHeadingText: exitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    },
    transforms: []
  }

  return configure(config, options?.mdastExtensions ?? []), compile

  /**
   * Turn micromark events into a syntax tree.
   *
   * @see {@linkcode Event}
   * @see {@linkcode Root}
   *
   * @param {Event[]} events - List of events
   * @return {Root} mdast
   */
  function compile(events: Event[]): Root {
    /**
     * mdast.
     *
     * @var {Root} tree
     */
    let tree: Root = u('root', {
      children: [],
      position: { end: point(from), start: point(from) }
    })

    /**
     * Current index.
     *
     * @var {number} index
     */
    let index: number = -1

    /**
     * List token indices.
     *
     * @const {number[]} listStack
     */
    const listStack: number[] = []

    /**
     * Compile context.
     *
     * @const {Omit<CompileContext, 'sliceSerialize'>} context
     */
    const context: Omit<CompileContext, 'sliceSerialize'> = {
      buffer,
      config,
      data,
      enter,
      exit,
      resume,
      stack: [tree],
      tokenStack: []
    }

    // preprocess lists to add `listItem` tokens, and to infer whether list
    // items are spread out
    while (++index < events.length) {
      const [type, token] = events[index]!

      if (
        token.type === types.listOrdered ||
        token.type === types.listUnordered
      ) {
        if (type === 'enter') {
          listStack.push(index)
        } else {
          /**
           * Last list token index.
           *
           * @const {number | undefined} tail
           */
          const tail: number | undefined = listStack.pop()

          ok(typeof tail === 'number', 'expected list to be open')
          index = prepareList(events, tail, index)
        }
      }
    }

    // call token handlers
    index = -1
    while (++index < events.length) {
      /**
       * Current event.
       *
       * @const {Event} event
       */
      const event: Event = events[index]!

      /**
       * Token to handle.
       *
       * @const {Token} token
       */
      const token: Token = event[1]

      /**
       * Token
       *
       * @const {Handles} handles
       */
      const handles: Handles = config[event[0]]

      if (Object.hasOwnProperty.call(handles, token.type)) {
        handles[token.type]!.call(Object.assign({
          sliceSerialize: event[2].sliceSerialize
        }, context), token)
      }
    }

    // handle tokens still being open
    if (context.tokenStack.length > 0) {
      /**
       * Last token tuple.
       *
       * @const {TokenTuple} tail
       */
      const tail: TokenTuple = context
        .tokenStack[context.tokenStack.length - 1]!

      const [token, handler = error] = tail
      handler.call(context, undefined, token)
    }

    // position tree
    if (events.length) {
      tree.position = {
        end: point(events[events.length - 2]![1].end),
        start: point(events[0]![1].start)
      }
    }

    // transform tree
    index = -1
    while (++index < config.transforms.length) {
      tree = config.transforms[index]!(tree) ?? tree
    }

    return tree
  }

  /**
   * Capture some of the output data.
   *
   * @see {@linkcode CompileContext}
   *
   * @this {CompileContext}
   *
   * @return {undefined} Nothing
   */
  function buffer(this: CompileContext): undefined {
    return void this.stack.push(u('fragment', []))
  }

  /**
   * Create a closer handle.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode Token}
   *
   * @param {Handle | undefined} [and] - Additional handle to run
   * @return {Handle} Closer handle
   */
  function closer(and?: Handle): Handle {
    return close

    /**
     * Closer handle.
     *
     * @this {CompileContext}
     *
     * @param {Token} token - Token to handle
     * @return {undefined} Nothing
     */
    function close(this: CompileContext, token: Token): undefined {
      if (and) and.call(this, token)
      exit.call(this, token)
      return void token
    }
  }

  /**
   * Enter a node.
   *
   * @see {@linkcode CompileContext}
   * @see {@linkcode Nodes}
   * @see {@linkcode OnEnterError}
   * @see {@linkcode Token}
   *
   * @this {CompileContext}
   *
   * @param {Nodes} node - Node to enter
   * @param {Token} token - Corresponding token
   * @param {OnEnterError | undefined} [onError] - Handle the case where this
   * token is open, but it is closed by something else
   * @return {undefined} Nothing
   */
  function enter(
    this: CompileContext,
    node: Nodes,
    token: Token,
    onError?: OnEnterError
  ): undefined {
    /**
     * Last node on stack.
     *
     * @const {Fragment | Nodes | undefined} parent
     */
    const parent: Fragment | Nodes | undefined = this.stack.at(-1)

    ok(parent, 'expected `parent`')
    ok('children' in parent, 'expected `parent`')

    parent.children.push(<never>node)
    this.stack.push(node)
    this.tokenStack.push([token, onError])
    node.position = { end: <never>undefined, start: point(token.start) }

    return void node
  }

  /**
   * Handle the case where the `right` token is open, but is closed by the
   * `left` token, or because end of file was reached.
   *
   * @see {@linkcode Token}
   *
   * @param {Token | undefined} left - Closing token
   * @param {Token} right - Open token
   * @return {never} Nothing
   * @throws {Error}
   */
  function error(left: Token | undefined, right: Token): never {
    throw left
      ? new Error(
        'Cannot close `' +
          left.type +
          '` (' +
          stringifyPosition([left.start, left.end]) +
          '): a different token (`' +
          right.type +
          '`, ' +
          stringifyPosition([right.start, right.end]) +
          ') is open'
      )
      : new Error(
        'Cannot close document, a token (`' +
          right.type +
          '`, ' +
          stringifyPosition([right.start, right.end]) +
          ') is still open'
      )
  }

  /**
   * Exit a node.
   *
   * @see {@linkcode CompileContext}
   * @see {@linkcode OnExitError}
   * @see {@linkcode Token}
   *
   * @this {CompileContext}
   *
   * @param {Token} token - Corresponding token
   * @param {OnExitError | undefined} [onError] - Handle the case where another
   * token is open
   * @return {undefined} Nothing
   * @throws {Error}
   */
  function exit(
    this: CompileContext,
    token: Token,
    onError?: OnExitError
  ): undefined {
    /**
     * Popped node.
     *
     * @const {Fragment | Nodes | undefined} node
     */
    const node: Fragment | Nodes | undefined = this.stack.pop()

    ok(node, 'expected `node`')

    /**
     * Popped token tuple.
     *
     * @const {TokenTuple | undefined} open
     */
    const open: TokenTuple | undefined = this.tokenStack.pop()

    if (!open) {
      throw new Error(
        'Cannot close `' + token.type + '` (' +
          stringifyPosition([token.start, token.end]) + '): it\'s not open'
      )
    } else if (open[0].type !== token.type) {
      if (onError) {
        onError.call(this, token, open[0])
      } else {
        const [right, handler = error.bind(this)] = open
        handler.call(this, token, right)
      }
    }

    ok(node.type !== 'fragment', 'unexpected fragment `exit`ed')
    ok(node.position, 'expected `position` to be defined')
    node.position.end = point(token.end)

    return void token
  }

  /**
   * Create an opener handle.
   *
   * @see {@linkcode Handle}
   * @see {@linkcode Token}
   *
   * @param {(token: Token) => Nodes} create - Create a node
   * @param {Handle | undefined} [and] - Additional handle to run
   * @return {Handle} Opener handle
   */
  function opener(create: (token: Token) => Nodes, and?: Handle): Handle {
    return open

    /**
     * Opener handle.
     *
     * @this {CompileContext}
     *
     * @param {Token} token - Token to handle
     * @return {undefined} Nothing
     */
    function open(this: CompileContext, token: Token): undefined {
      enter.call(this, create(token), token)
      if (and) and.call(this, token)
      return void token
    }
  }

  /**
   * Stop capturing and access the output data.
   *
   * @see {@linkcode CompileContext}
   *
   * @this {CompileContext}
   *
   * @return {string} Captured output data
   */
  function resume(this: CompileContext): string {
    return toString(this.stack.pop())
  }
}

export default compiler
