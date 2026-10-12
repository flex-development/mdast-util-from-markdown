# mdast-util-from-markdown

[![github release](https://img.shields.io/github/v/release/flex-development/mdast-util-from-markdown.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/mdast-util-from-markdown/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/mdast-util-from-markdown.svg)](https://npmjs.com/package/@flex-development/mdast-util-from-markdown)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/mdast-util-from-markdown.svg)](https://www.npmcharts.com/compare/@flex-development/mdast-util-from-markdown?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/mdast-util-from-markdown)](https://packagephobia.now.sh/result?p=@flex-development/mdast-util-from-markdown)
[![minified bundle size](https://badgen.net/bundlephobia/min/@flex-development/mdast-util-from-markdown?cache)](https://bundlephobia.com/package/@flex-development/mdast-util-from-markdown)
[![tree shaking suppport](https://badgen.net/bundlephobia/tree-shaking/@flex-development/mdast-util-from-markdown)](https://bundlephobia.com/package/@flex-development/mdast-util-from-markdown)
[![codecov](https://codecov.io/github/flex-development/mdast-util-from-markdown/graph/badge.svg?token=qLeyGURlL3)](https://codecov.io/github/flex-development/mdast-util-from-markdown)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/mdast-util-from-markdown.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

**[mdast][]** utility that turns markdown into a syntax tree

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`fromMarkdown(value[, encoding][, options])`][api-from-markdown]
  - [`compiler([options])`][api-compiler]
  - [`preprocess(events)`][api-preprocess]
  - [`takeExtension(combined, extension[, field])`][api-take-extension]
  - [creators][api-creators]
  - [handles][api-handles]
- [Types](#types)
  - [`Buffer`][types-buffer]
  - [`CharacterReferenceType`][types-character-reference-type]
  - [`CompileContext`][types-compile-context]
  - [`CompileData`][types-compile-data]
  - [`Compiler`][types-compiler]
  - [`Config`][types-config]
  - [`Encoding`][types-encoding]
  - [`Enter`][types-enter]
  - [`Event`][types-event]
  - [`Exit`][types-exit]
  - [`Extension`][types-extension]
  - [`Fragment`][types-fragment]
  - [`Handle`][types-handle]
  - [`Handles`][types-handles]
  - [`Node`][types-node]
  - [`OnEnterError`][types-on-enter-error]
  - [`OnExitError`][types-on-exit-error]
  - [`Options`][types-options]
  - [`ParseOptions`][types-parse-options]
  - [`Point`][types-point]
  - [`Resume`][types-resume]
  - [`StackedToken`][types-stacked-token]
  - [`StartPoint`][types-start-point]
  - [`TokenType`][types-token-type]
  - [`Token`][types-token]
  - [`TokenizeContext`][types-tokenize-context]
  - [`Transform`][types-transform]
  - [`Value`][types-value]
- [List of extensions](#list-of-extensions)
- [Syntax](#syntax)
- [Syntax tree](#syntax-tree)
- [Security](#security)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package is a utility that takes markdown input and turns it into a [markdown abstract syntax tree][mdast].

This utility uses [`micromark`][micromark], which turns markdown into tokens, and then turns those tokens into nodes.

## When should I use this?

If you want to handle syntax trees manually, use this.\
When you *just* want to turn markdown into HTML, use [`micromark`][micromark] instead.\
For an easier time processing content, use the **[remark][]** ecosystem instead.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][]:

```sh
yarn add @flex-development/mdast-util-from-markdown
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { fromMarkdown } from 'https://esm.sh/@flex-development/mdast-util-from-markdown'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { fromMarkdown } from 'https://esm.sh/@flex-development/mdast-util-from-markdown'
</script>
```

## Use

Say we have the following markdown file `example.md`:

```markdown
## Hello, *World*!
```

…and our module `example.mjs` looks as follows:

```js
import { fromMarkdown } from '@flex-development/mdast-util-from-markdown'
import { inspect } from '@flex-development/unist-util-inspect'
import { read } from 'to-vfile'

const file = await read('example.md')
const tree = fromMarkdown(String(file))

console.log(inspect(tree))
```

…now running `node example.mjs` yields:

```sh
root[1] (1:1-2:1, 0-19)
└─0 heading[3] (1:1-1:19, 0-18)
    │ depth: 2
    ├─0 text "Hello, " (1:4-1:11, 3-10)
    ├─1 emphasis[1] (1:11-1:18, 10-17)
    │   └─0 text "World" (1:12-1:17, 11-16)
    └─2 text "!" (1:18-1:19, 17-18)
```

## API

This package exports the identifiers [`fromMarkdown`][api-from-markdown], [`compiler`][api-compiler],
[`preprocess`][api-preprocess], and [`takeExtension`][api-take-extension].\
The default export is `fromMarkdown`.

Additional exports are located at [`@flex-development/mdast-util-from-markdown/creators`][api-creators]
and [`@flex-development/mdast-util-from-markdown/handles`][api-handles].

### `fromMarkdown(value[, encoding][, options])`

Turn markdown into a syntax tree.

#### Overloads

- `(value: Value | null | undefined, encoding?: Encoding | null | undefined, options?: Options) => Root`
- `(value: Value | null | undefined, options?: Options | null | undefined) => Root`

#### Parameters

- `value` ([`Value`][types-value] | `null` | `undefined`)
  — the markdown to parse
- `encoding` ([`Encoding`][types-encoding] | `null` | `undefined`, optional)
  — the [character encoding][encoding] for when `value` is [`Uint8Array`][uint8-array]
  - default: `'utf8'`
- `options` ([`Options`][types-options] | `null` | `undefined`, optional)
  — the configuration options

#### Returns

([`Root`][root]) mdast

### `compiler([options])`

Create an mdast compiler.

> 👉 The compiler only understands complete buffering, not streaming.

#### Parameters

- `options` ([`Options`][types-options] | `null` | `undefined`, optional)
  — the configuration options

#### Returns

([`Compiler`][types-compiler]) The mdast compiler

### `preprocess(events)`

Prepare `events` before compilation begins.

#### Parameters

- **`this`** ([`mark.Context`][mark-ast-context])
  — the event compilation context
- `events` ([`mark.Event[]`][mark-parse-event])
  — the current list of events

#### Returns

(`undefined`) Nothing

### `takeExtension(combined, extension[, field])`

Merge `extension` into the `combined` configuration.

#### Parameters

- `combined` ([`mark.Config`][mark-ast-config])
  — the current configuration
- `extension` ([`mark.Extension`][mark-ast-extension])
  — the extension to merge
- `field` ([`keyof mark.Extension`][mark-ast-extension] | `undefined`, optional)
  — the current `extension` field

#### Returns

(`undefined`) Nothing

### creators

`@flex-development/mdast-util-markdown/creators` exports default [`Node`][types-node] factories by name.

### handles

`@flex-development/mdast-util-markdown/handles` exports default token [`Handle`][types-handle]s by name.

## Types

This package is fully typed with [TypeScript][].

### `Buffer`

Start capturing output into a temporary node (`type`).

```ts
type Buffer = (this: CompileContext) => undefined
```

#### Parameters

- **`this`** ([`CompileContext`][types-compile-context])
  — the event compilation context

#### Returns

(`undefined`) Nothing

### `CharacterReferenceType`

Union of character reference types (`type`).

```ts
type CharacterReferenceType =
  | 'characterReferenceMarkerHexadecimal'
  | 'characterReferenceMarkerNumeric'
```

### `CompileContext`

The event compilation context (`interface`).

Event compilation consumes the [`Event`][types-event]s of a parser to produce a syntax tree.

During compilation, event handlers orchestrate [`Node`][types-node] creation, `enter` nodes onto the `stack`,
and `exit` them later.

The compilation `config` defines how [`TokenType`][types-token-type]s map to compilation behavior.
After the initial compilation, [`Transform`][types-transform]s can be applied to manipulate the final tree.

#### Properties

- `buffer` ([`Buffer`][types-buffer])
  — start capturing output into a temporary node.\
  captured values can later be serialized with `resume`
- `config` ([`Config`][types-config])
  — the compilation configuration
- `data` ([`CompileData`][types-compile-data])
  — info passed around; key/value store
- `enter` ([`Enter`][types-enter])
  — enter a node
- `exit` ([`Exit`][types-exit])
  — exit a node
- `resume` ([`Resume`][types-resume])
  — stop `buffer`ing and serialize the captured node
- `sliceSerialize` ([`TokenizeContext['sliceSerialize']`][types-tokenize-context])
  — get the string value of a token
- `stack` ([`Node[]`][types-node])
  — the node stack
- `tokenStack` ([`StackedToken[]`][types-stacked-token])
  — the token stack

### `CompileData`

Interface of tracked data (`interface`).

```ts
interface CompileData {/* see code */}
```

When developing extensions that use more data, augment `CompileData` to register custom fields:

```ts
declare module 'mdast-util-from-markdown' {
  interface CompileData {
    mathFlowInside?: boolean | undefined
  }
}
```

To sync native augmentations, import `@flex-development/mdast-util-from-markdown/mdast`:

```ts
import type {} from '@flex-development/mdast-util-from-markdown/mdast'
```

### `Compiler`

Turn micromark events into a syntax tree (`type`).

```ts
type Compiler = (this: void, events?: Event[] | null | undefined) => Root
```

#### Parameters

- `events` ([`Event[]`][types-event] | `null` | `undefined`, optional)
  — the list of events

#### Returns

([`Root`][root]) mdast

### `Config`

The event compilation configuration (`interface`).

#### Extends

- [`Extension`][types-extension]

#### Properties

- `afterEnter` ([`Handle[]`][types-handle])
  — the list of listeners to call after a token is `enter`ed
- `afterExit` ([`Handle[]`][types-handle])
  — the list of listeners to call after a token is `exited`ed
- `beforeEnter` ([`Handle[]`][types-handle])
  — the list of listeners to call before a token is `enter`ed
- `beforeExit` ([`Handle[]`][types-handle])
  — the list of listeners to call before a token is `exited`ed
- `canContainEols` (`string[]`)
  — the list of token types where line endings are used
- `enter` ([`Handles`][types-handles])
  — record, where each key is a [`TokenType`][types-token-type]
  and each value is the handler to call when entering a token
- `exit` ([`Handles`][types-handles])
  — record, where each key is a [`TokenType`][types-token-type]
  and each value is the handler to call when exiting a token
- `transforms` ([`Transform[]`][types-transform])
  — the list of tree transforms to apply

### `Encoding`

Encodings supported by `TextEncoder` (`type`).

See [`micromark-util-types`][micromark-util-types] for more info.

```ts
type Encoding =
  | 'utf-8' // always supported in node
  | 'utf-16le' // always supported in node
  | 'utf-16be' // not supported when ICU is disabled
  | (string & {}) // everything else (depends on browser, or full ICU data)
```

### `Enter`

Enter a node (`type`).

```ts
type Enter = (
  this: CompileContext,
  node: Node,
  token: Token,
  onError?: OnEnterError | null | undefined
) => undefined
```

#### Parameters

- **`this`** ([`CompileContext`][types-compile-context])
  — the event compilation context
- `node` ([`Node`][types-node])
  — the node to enter
- `token` ([`Token`][types-token])
  — the token associated with `node`
- `onError` ([`OnEnterError`][types-on-enter-error] | `null` | `undefined`, optional)
  — handle the case where another token is open, but closed by something else

#### Returns

(`undefined`) Nothing

### `Event`

The start or end of a [token][types-token] amongst other events (`type`).

See [`micromark-util-types`][micromark-util-types] for more info.

```ts
type Event = ['enter' | 'exit', Token, TokenizeContext]
```

### `Exit`

Exit a node (`type`).

```ts
type Exit = (
  this: CompileContext,
  token: Token,
  onError?: OnExitError | null | undefined
) => undefined
```

#### Parameters

- **`this`** ([`CompileContext`][types-compile-context])
  — the event compilation context
- `token` ([`Token`][types-token])
  — the token associated with the node
- `onError` ([`OnExitError`][types-on-exit-error] | `null` | `undefined`, optional)
  — handle the case where another token is open

#### Returns

(`undefined`) Nothing

### `Extension`

A compiler extension (`interface`).

Compiler extensions can be used to change how tokens are turned into nodes,
as well as apply transformations to the final syntax tree.

#### Properties

- `afterEnter` ([`Handle`][types-handle] | [`Handle[]`][types-handle] | `null` | `undefined`, optional)
  — the listener, or listeners, to call after a token is `enter`ed
- `afterExit` ([`Handle`][types-handle] | [`Handle[]`][types-handle] | `null` | `undefined`, optional)
  — the listener, or listeners, to call after a token is `exited`ed
- `beforeEnter` ([`Handle`][types-handle] | [`Handle[]`][types-handle] | `null` | `undefined`, optional)
  — the listener, or listeners, to call before a token is `enter`ed
- `beforeExit` ([`Handle`][types-handle] | [`Handle[]`][types-handle] | `null` | `undefined`, optional)
  — the listener, or listeners, to call before a token is `exited`ed
- `canContainEols` (`string[]` | `null` | `undefined`, optional)
  — the list of token types where line endings are used
- `enter` ([`Handles`][types-handles] | `null` | `undefined`, optional)
  — record, where each key is a [`TokenType`][types-token-type]
  and each value is the handler to call when entering a token
- `exit` ([`Handles`][types-handles] | `null` | `undefined`, optional)
  — record, where each key is a [`TokenType`][types-token-type]
  and each value is the handler to call when exiting a token
- `transforms` ([`Transform[]`][types-transform] | `null` | `undefined`, optional)
  — the list of tree transforms to apply

### `Fragment`

A temporary node (`interface`).

#### Properties

- `children` ([`mdast.PhrasingContent[]`][phrasing-content])
  — the list of children
- `type` (`'fragment'`)
  — the node type

### `Handle`

Handle a [token][types-token] (`type`).

```ts
type Handle = (this: CompileContext, token: Token) => undefined | void
```

#### Parameters

- **`this`** ([`CompileContext`][types-compile-context])
  — the event compilation context
- `token` ([`Token`][types-token])
  — the token to handle

#### Returns

(`undefined` | `void`) Nothing

### `Handles`

Record, where each key is a [`TokenType`][types-token-type] and each value is an event handler (`type`).

```ts
type Handles = Partial<Record<TokenType, Handle>>
```

### `Node`

Union of nodes that can be created during event compilation (`type`).

> 👉 **Note**: Also exported as `StackedNode`.

```ts
type Node = Fragment | Root | RootContent
```

### `OnEnterError`

Handle the case where the `right` token is open,
but is closed by the `left` token, or because end of content was reached (`type`).

```ts
type OnEnterError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token | undefined,
  right: Token
) => undefined
```

#### Parameters

- **`this`** ([`Omit<CompileContext, 'sliceSerialize'>`][types-compile-context])
  — the event compilation context
- `left` ([`Token`][types-token] | `undefined`)
  — the exiting token
- `right` ([`Token`][types-token])
  — the open token

#### Returns

(`undefined`) Nothing

### `OnExitError`

Handle the case where the `right` token is open, but is closed by exiting the `left` token (`type`).

```ts
type OnExitError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token,
  right: Token
) => undefined
```

#### Parameters

- **`this`** ([`Omit<CompileContext, 'sliceSerialize'>`][types-compile-context])
  — the event compilation context
- `left` ([`Token`][types-token])
  — the exiting token
- `right` ([`Token`][types-token])
  — the open token

#### Returns

(`undefined`) Nothing

### `Options`

Configuration options (`interface`).

#### Extends

- [`ParseOptions`][types-parse-options]

#### Properties

- `extensions` ([`micromark.Extension[]`][micromark-extension] | `null` | `undefined`, optional)
  — extensions for [`micromark`][micromark] to change how tokens are produced
- `from` ([`StartPoint`][types-start-point] | `null` | `undefined`, optional)
  — the point before the first character in the content.\
  node positions will be relative to this point
  - **default**: `{ column: 1, line: 1, offset: 0 }`
- `mdastExtensions` ([`(Extension | Extension[])[]`][types-extension] | `null` | `undefined`, optional)
  — extensions for this utility to change how tokens are turned into nodes

### `ParseOptions`

Options for parsing markdown (`interface`).

See [`micromark-util-types`][micromark-util-types] for more info.

### `Point`

A location in the source document and chunk (`interface`).

See [`micromark-util-types`][micromark-util-types] for more info.

### `Resume`

Stop capturing output and serialize the captured node (`type`).

```ts
type Resume = (this: CompileContext) => string
```

#### Parameters

- **`this`** ([`CompileContext`][types-compile-context])
  — the event compilation context

#### Returns

(`string`) The serialized node

### `Root`

A document fragment or a whole document (`interface`).

See [`mdast`][mdast] for more info.

### `StackedToken`

List containing an open token on the stack,
and an optional error handler to use if the token isn't closed properly (`type`).

> 👉 **Note**: Also exported as `TokenTuple`.

```ts
type StackedToken = [token: Token, handler: OnEnterError | undefined]
```

### `StartPoint`

The point before the first character in the content (`type`).

```ts
type StartPoint = Omit<Point, '_bufferIndex' | '_index'>
```

### `Token`

A span of chunks (`interface`).

See [`micromark-util-types`][micromark-util-types] for more info.

### `TokenizeContext`

A context object that helps with tokenizing markdown constructs (`interface`).

See [`micromark-util-types`][micromark-util-types] for more info.

### `TokenType`

Union of registered token types (`type`).

See [`micromark-util-types`][micromark-util-types] for more info.

### `Transform`

Transform the syntax `tree` (`type`).

> 👉 **Note**: Returning `null`, `undefined`, or `void` will preserve `tree`.

```ts
type Transform = (this: void, tree: Root) => Root | null | undefined | void
```

#### Parameters

- `Root` ([`Root`][types-root])
  — the tree to transform

#### Returns

([`Root`][types-root] | `null` | `undefined` | `void`) The serialized node

### `Value`

The contents of a file.

See [`micromark-util-types`][micromark-util-types] for more info.

```ts
type Value = Uint8Array | string
```

## List of extensions

- [`mdast-util-directive`][mdast-util-directive]
  — directives
- [`mdast-util-frontmatter`][mdast-util-frontmatter]
  — frontmatter (YAML, TOML, more)
- [`mdast-util-gfm`][mdast-util-gfm]
  — GFM
- [`mdast-util-gfm-autolink-literal`][mdast-util-gfm-autolink-literal]
  — GFM autolink literals
- [`mdast-util-gfm-footnote`][mdast-util-gfm-footnote]
  — GFM footnotes
- [`mdast-util-gfm-strikethrough`][mdast-util-gfm-strikethrough]
  — GFM strikethrough
- [`mdast-util-gfm-table`][mdast-util-gfm-table]
  — GFM tables
- [`mdast-util-gfm-task-list-item`][mdast-util-gfm-task-list-item]
  — GFM task list items
- [`syntax-tree/mdast-util-math`][mdast-util-math]
  — math
- [`syntax-tree/mdast-util-mdx`][mdast-util-mdx]
  — MDX
- [`syntax-tree/mdast-util-mdx-expression`][mdast-util-mdx-expression]
  — MDX expressions
- [`syntax-tree/mdast-util-mdx-jsx`][mdast-util-mdx-jsx]
  — MDX JSX
- [`syntax-tree/mdast-util-mdxjs-esm`][mdast-util-mdxjs-esm]
  — MDX ESM

## Syntax

Markdown is parsed according to CommonMark. Extensions can add support for other syntax. If you’re interested in
extending markdown, [more information is available in micromark’s readme][micromark-extension].

## Syntax tree

The syntax tree is [mdast][].

## Security

As markdown is sometimes used for HTML, and improper use of HTML can open you up to a [cross-site scripting (XSS)][xss]
attack, use of `mdast-util-from-markdown` can also be unsafe.

When going to HTML, use this utility in combination with [`hast-util-sanitize`][hast-util-sanitize]
to make the tree safe.

## Related

- [`mdast-util-to-markdown`][mdast-util-to-markdown] — serialize mdast as markdown
- [`micromark`][micromark] — parse markdown
- [`remark`][remark] — process markdown

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[api-compiler]: #compileroptions

[api-creators]: #creators

[api-from-markdown]: #frommarkdownvalue-encoding-options

[api-handles]: #handles

[api-preprocess]: #preprocessevents

[api-take-extension]: #takeextensioncombined-extension-field

[encoding]: https://nodejs.org/api/util.html#whatwg-supported-encodings

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh/

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[mdast-util-directive]: https://github.com/syntax-tree/mdast-util-directive

[mdast-util-frontmatter]: https://github.com/syntax-tree/mdast-util-frontmatter

[mdast-util-gfm-autolink-literal]: https://github.com/syntax-tree/mdast-util-gfm-autolink-literal

[mdast-util-gfm-footnote]: https://github.com/syntax-tree/mdast-util-gfm-footnote

[mdast-util-gfm-strikethrough]: https://github.com/syntax-tree/mdast-util-gfm-strikethrough

[mdast-util-gfm-table]: https://github.com/syntax-tree/mdast-util-gfm-table

[mdast-util-gfm-task-list-item]: https://github.com/syntax-tree/mdast-util-gfm-task-list-item

[mdast-util-gfm]: https://github.com/syntax-tree/mdast-util-gfm

[mdast-util-math]: https://github.com/syntax-tree/mdast-util-math

[mdast-util-mdx-expression]: https://github.com/syntax-tree/mdast-util-mdx-expression

[mdast-util-mdx-jsx]: https://github.com/syntax-tree/mdast-util-mdx-jsx

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx

[mdast-util-mdxjs-esm]: https://github.com/syntax-tree/mdast-util-mdxjs-esm

[mdast-util-to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown

[mdast]: https://github.com/syntax-tree/mdast

[mark-ast-config]: https://github.com/flex-development/mark/blob/main/src/ast/interfaces/config.mts

[mark-ast-context]: https://github.com/flex-development/mark/blob/main/src/ast/types/context.mts

[mark-ast-extension]: https://github.com/flex-development/mark/blob/main/src/ast/interfaces/extension.mts

[mark-parse-event]: https://github.com/flex-development/mark/blob/main/src/parse/types/event.mts

[micromark-extension]: https://github.com/micromark/micromark#extensions

[micromark-util-types]: https://github.com/micromark/micromark/tree/main/packages/micromark-util-types

[micromark]: https://github.com/micromark/micromark

[phrasing-content]: https://github.com/syntax-tree/mdast#phrasingcontent

[remark]: https://github.com/remarkjs/remark

[root]: https://github.com/syntax-tree/mdast#root

[types-buffer]: #buffer

[types-character-reference-type]: #characterreferencetype

[types-compile-context]: #compilecontext

[types-compile-data]: #compiledata

[types-compiler]: #compiler

[types-config]: #config

[types-encoding]: #encoding

[types-enter]: #enter

[types-event]: #event

[types-exit]: #exit

[types-extension]: #extension

[types-fragment]: #fragment

[types-handle]: #handle

[types-handles]: #handles-1

[types-node]: #node

[types-on-enter-error]: #onentererror

[types-on-exit-error]: #onexiterror

[types-options]: #options

[types-parse-options]: #parseoptions

[types-point]: #point

[types-resume]: #resume

[types-root]: #root

[types-stacked-token]: #stackedtoken

[types-start-point]: #startpoint

[types-token]: #token

[types-token-type]: #tokentype

[types-tokenize-context]: #tokenizecontext

[types-transform]: #transform

[types-value]: #value

[typescript]: https://www.typescriptlang.org

[uint8-array]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[yarn]: https://yarnpkg.com
