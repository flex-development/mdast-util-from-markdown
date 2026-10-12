/**
 * @file compiler
 * @module mdast-util-from-markdown/compiler
 */

import { createCompiler } from '@flex-development/mark-compiler'
import type {
  Buffer,
  Closer,
  CompileContext,
  CreateExtensions,
  Extension,
  Opener
} from '@flex-development/mark/ast'
import type {
  Compiler,
  Options
} from '@flex-development/mdast-util-from-markdown'
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
} from '@flex-development/mdast-util-from-markdown/creators'
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
} from '@flex-development/mdast-util-from-markdown/handles'
import { toString } from 'mdast-util-to-string'
import preprocess from './preprocess.mts'
import takeExtension from './take-extension.mts'

export default compiler

/**
 * Create an mdast compiler.
 *
 * > 👉 The compiler only understands complete buffering, not streaming.
 *
 * @this {void}
 *
 * @param {Options | null | undefined} [options]
 *  The configuration options
 * @return {Compiler}
 *  The mdast compiler
 */
function compiler(this: void, options?: Options | null | undefined): Compiler {
  /**
   * The event compilation context.
   *
   * @const {CompileContext} context
   */
  const context: CompileContext = createCompiler({
    extensions,
    from: options?.from,
    preprocess,
    serializeNode: toString,
    takeExtension
  })

  return context.compile

  /**
   * Create the base AST extension.
   *
   * @type {CreateExtensions}
   *
   * @this {void}
   *
   * @param {Opener} opener
   *  Create an `enter` event handler
   * @param {Closer} closer
   *  Create an `exit` event handler
   * @param {Buffer} buffer
   *  Start capturing output into a `fragment`
   * @return {Extension}
   *  The base extension
   */
  function extension(
    this: void,
    opener: Opener,
    closer: Closer,
    buffer: Buffer
  ): Extension {
    return {
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
      }
    }
  }

  /**
   * Create a list of AST extensions.
   *
   * @type {CreateExtensions}
   *
   * @this {void}
   *
   * @param {Opener} opener
   *  Create an `enter` event handler
   * @param {Closer} closer
   *  Create an `exit` event handler
   * @param {Buffer} buffer
   *  Start capturing output into a fragment
   * @return {(Extension | Extension[])[]}
   *  The list of extensions
   */
  function extensions(
    this: void,
    opener: Opener,
    closer: Closer,
    buffer: Buffer
  ): (Extension | Extension[])[] {
    const { mdastExtensions } = options ?? {}
    return [extension(opener, closer, buffer), ...(mdastExtensions ?? [])]
  }
}
