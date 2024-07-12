/**
 * @file Integration Tests - fromMarkdown
 * @module mdast-util-from-markdown/tests/integration/fromMarkdown
 */

import type {
  CompileContext,
  Extension,
  Options,
  Transform
} from '#src/types'
import { constant, noop } from '@flex-development/tutils'
import { u } from '@flex-development/unist-util-builder'
import { inspectNoColor } from '@flex-development/unist-util-inspect'
import { commonmark } from 'commonmark.json'
import { ok } from 'devlop'
import type * as hast from 'hast'
import { fromHtml } from 'hast-util-from-html'
import { toHtml } from 'hast-util-to-html'
import { fromMarkdown as mdast } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { toString } from 'mdast-util-to-string'
import type { Token, Value } from 'micromark-util-types'
import type { VFile } from 'vfile'
import type { MockInstance, TestContext } from 'vitest'
import testSubject from '../from-markdown'

describe('integration:fromMarkdown', () => {
  beforeEach((context: TestContext): void => {
    context.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspectNoColor(val),
      test: constant(true)
    })
  })

  it.each<[string, Value | null | undefined]>([
    ['autolink (email)', '<aa@bb.cc>'],
    ['autolink (protocol)', '<tel:123>'],
    ['blockquote', '> a'],
    ['character escape', 'a\\*b'],
    ['character reference', 'a&amp;b'],
    ['code (fenced)', '```a b\nc\n```'],
    ['code (indented)', '    a'],
    ['code (text)', '`a`'],
    ['definition', '[a]: b "c"'],
    ['emphasis', '*a*'],
    ['empty (document)', ''],
    ['empty (nil)', null],
    ['empty (typed array)', new Uint8Array()],
    ['hard break (escape)', 'a\\\nb'],
    ['hard break (prefix)', 'a  \nb'],
    ['heading (atx)', '## a'],
    ['heading (setext)', 'a\n='],
    ['html (flow)', '<a>\nb\n</a>'],
    ['html (text)', '<a>b</a>'],
    ['image (collapsed reference)', '![a][]\n\n[a]: b'],
    ['image (full reference)', '![a][b]\n\n[b]: c'],
    ['image (resource)', '![a](b "c")'],
    ['image (shortcut reference)', '![a]\n\n[a]: b'],
    ['link (collapsed reference + inline code label)', '[`a`][]\n\n[`a`]: b'],
    ['link (collapsed reference)', '[a][]\n\n[a]: b'],
    ['link (full reference)', '[a][b]\n\n[b]: c'],
    ['link (resource)', '[a](b "c")'],
    ['link (shortcut reference)', '[a]\n\n[a]: b'],
    ['paragraph', 'a\nb'],
    ['strong', '**a**'],
    ['thematic break', '***']
  ])('should parse %s', (_, value) => {
    // Act
    const tree = testSubject(value)

    // Expect
    expect(tree).toMatchSnapshot()
    expect(tree).to.eql(mdast(value ?? ''))
  })

  it('should support encoding', () => {
    // Arrange
    const value: Value = new Uint8Array([
      0xff,
      0xfe,
      0x61,
      0x00,
      0x62,
      0x00,
      0x63,
      0x00
    ])

    // Act + Expect
    expect(toString(testSubject(value, 'utf-16le'))).to.eq('abc')
  })

  describe('commonmark', () => {
    it.each(commonmark.map(x => {
      return [x.section.toLowerCase(), x]
    }))('%s (%#)', (_, example) => {
      // Arrange
      const expected: string = example.html.slice(0, -1)
      let actual: string

      // Act
      const mdast = testSubject(example.markdown.slice(0, -1))
      const hast = toHast(mdast, { allowDangerousHtml: true })
      ok(<hast.Nodes | null>hast && hast.type === 'root', 'expected `root`')
      actual = toHtml(hast, { allowDangerousHtml: true })
      actual = toHtml(fromHtml(actual, { fragment: true }))

      // Expect
      expect(actual).to.eq(toHtml(fromHtml(expected, { fragment: true })))
    })
  })

  describe('errors', () => {
    it('should crash if a token is opened but not closed', () => {
      // Arrange
      const message: RegExp =
        /Cannot close document, a token \(`paragraph`, 1:1-1:2\) is still open/

      // Act + Expect
      expect(function(): void {
        return void testSubject('a', {
          mdastExtensions: [
            {
              enter: {
                paragraph(this: CompileContext, token: Token): undefined {
                  return void this.enter(u('paragraph', []), token)
                }
              },
              exit: { paragraph: noop }
            }
          ]
        })
      }).to.throw(message)
    })

    it('should crash when closing unopened token (mismatch custom)', () => {
      // Arrange
      const message: string = 'problem'

      // Act + Expect
      expect(function(): void {
        return void testSubject('a', {
          mdastExtensions: [
            {
              exit: {
                paragraph(this: CompileContext, token: Token): undefined {
                  return void this.exit(
                    Object.assign({}, token, { type: 'lol' }),
                    function(a: Token, b: Token): never {
                      assert.equal(a.type, 'lol')
                      assert.equal(b.type, 'paragraph')
                      throw new Error(message)
                    }
                  )
                }
              }
            }
          ]
        })
      }).to.throw(message)
    })

    it('should crash when closing unopened token (mismatch)', () => {
      // Arrange
      const message: RegExp =
        /Cannot close `lol` \(1:1-1:2\): a different token \(`paragraph`, 1:1-1:2\) is open/

      // Act + Expect
      expect(function(): void {
        return void testSubject('a', {
          mdastExtensions: [
            {
              exit: {
                paragraph(this: CompileContext, token: Token): undefined {
                  return void this.exit(Object.assign({}, token, {
                    type: 'lol'
                  }))
                }
              }
            }
          ]
        })
      }).to.throw(message)
    })

    it('should crash when closing unopened token', () => {
      expect(function(): void {
        return void testSubject('a', {
          mdastExtensions: [
            {
              enter: {
                paragraph(this: CompileContext, token: Token): undefined {
                  return void this.exit(token)
                }
              }
            }
          ]
        })
      }).to.throw(/Cannot close `paragraph` \(1:1-1:2\): it's not open/)
    })
  })

  describe('extensions', () => {
    let lineEnding: Extension
    let lineEndingBlank: Extension
    let transform1: MockInstance<Transform>
    let transform2: MockInstance<Transform>

    beforeAll(() => {
      lineEnding = {
        canContainEols: ['someType'],
        enter: {
          lineEnding(this: CompileContext, token: Token): undefined {
            return void this.enter({ type: 'break' }, token)
          }
        },
        exit: {
          lineEnding(this: CompileContext, token: Token): undefined {
            return void this.exit(token)
          }
        },
        transforms: [transform1 = vi.fn(tree => tree)]
      }

      lineEndingBlank = {
        enter: {
          lineEndingBlank(this: CompileContext, token: Token): undefined {
            return void this.enter({
              data: { blank: true },
              type: 'break'
            }, token)
          }
        },
        exit: {
          lineEndingBlank(this: CompileContext, token: Token): undefined {
            return void this.exit(token)
          }
        },
        transforms: [transform2 = vi.fn(tree => void tree)]
      }
    })

    it('should support extensions (multiple)', () => {
      // Arrange
      const extensions: Extension[] = [lineEnding, lineEndingBlank]
      const options: Options = { mdastExtensions: [extensions] }
      const value: string = 'a\n\nb'

      // Act
      const tree = testSubject(value, options)

      // Expect
      expect(tree).toMatchSnapshot()
      expect(tree).to.eql(mdast(value, options))
      expect(transform1).toHaveBeenCalled()
      expect(transform1).toHaveBeenCalledWith(tree)
      expect(transform2).toHaveBeenCalled()
      expect(transform2).toHaveBeenCalledWith(tree)
    })

    it('should support extensions', () => {
      // Arrange
      const options: Options = { mdastExtensions: [lineEnding] }
      const value: string = 'a\nb'

      // Act
      const tree = testSubject(value, options)

      // Expect
      expect(tree).toMatchSnapshot()
      expect(tree).to.eql(mdast(value, options))
      expect(transform1).toHaveBeenCalled()
      expect(transform1).toHaveBeenCalledWith(tree)
      expect(transform2).not.toHaveBeenCalled()
    })
  })

  describe('fixtures', () => {
    it.each<[string, VFile]>(files.map(f => [f.stem!, f]))('%s', (_, file) => {
      // Arrange
      const value: string = String(file)

      // Act
      const tree = testSubject(value, {
        from: { column: 1, line: 1, offset: 0 }
      })

      // Expect
      expect(tree).toMatchSnapshot()
      expect(tree).to.eql(mdast(value))
    })
  })
})
