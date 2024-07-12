# mdast-util-from-markdown

[![github release](https://img.shields.io/github/v/release/flex-development/mdast-util-from-markdown.svg?include_prereleases&sort=semver)](https://github.com/flex-development/mdast-util-from-markdown/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/mdast-util-from-markdown.svg)](https://npmjs.com/package/@flex-development/mdast-util-from-markdown)
[![codecov](https://codecov.io/gh/flex-development/mdast-util-from-markdown/graph/badge.svg?token=U7cQgKu7HU)](https://codecov.io/gh/flex-development/mdast-util-from-markdown)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/mdast-util-from-markdown.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

**[mdast][mdast]** utility that turns markdown into a syntax tree

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`fromMarkdown(value[, encoding][, options])`](#frommarkdownvalue-encoding-options)
  - [`compiler([options])`](#compileroptions)
  - [`handles`](#handles)
  - [`CompileContext`](#compilecontext)
  - [`CompileData`](#compiledata)
  - [`Compiler`](#compiler)
  - [`Config`](#config)
  - [`Encoding`](#encoding)
  - [`Event`](#event)
  - [`Extension`](#extension)
  - [`Fragment`](#fragment)
  - [`Handle`](#handle)
  - [`Handles`](#handles-1)
  - [`OnEnterError`](#onentererror)
  - [`OnExitError`](#onexiterror)
  - [`Options`](#options)
  - [`Point`](#point)
  - [`StackedNode`](#stackednode)
  - [`StartPoint`](#startpoint)
  - [`TokenTuple`](#tokentuple)
  - [`Token`](#token)
  - [`TokenizeContext`](#tokenizecontext)
  - [`Transform`](#transform)
  - [`Value`](#value)
- [List of extensions](#list-of-extensions)
- [Syntax](#syntax)
- [Syntax tree](#syntax-tree)
- [Security](#security)
- [Related](#related)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a utility that takes markdown input and turns it into a [markdown abstract syntax tree][mdast].

This utility uses [`micromark`][micromark], which turns markdown into tokens, and then turns those tokens into nodes.

## When should I use this?

If you want to handle syntax trees manually, use this.
When you *just* want to turn markdown into HTML, use [`micromark`][micromark] instead.
For an easier time processing content, use the **[remark][remark]** ecosystem instead.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][yarn]:

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

### `fromMarkdown(value[, encoding][, options])`

Turn markdown into a syntax tree.

#### Overloads

- `(value: Value | null | undefined, encoding?: Encoding | null | undefined, options?: Options) => Root`
- `(value: Value | null | undefined, options?: Options | null | undefined) => Root`

#### Parameters

- `value` ([`Value`](#value) | `null` | `undefined`)
  — markdown to parse
- `encoding` ([`Encoding`](#encoding) | `null` | `undefined`, optional)
  — [character encoding][encoding] for when `value` is [`Uint8Array`][uint8-array]
  - default: `'utf8'`
- `options` ([`Options`](#options) | `null` | `undefined`, optional)
  — configuration

#### Returns

([`Root`][root]) mdast.

### `compiler([options])`

Create an mdast compiler.

> 👉 The compiler only understands complete buffering, not streaming.

#### Parameters

- `options` ([`Options`](#options) | `null` | `undefined`, optional)
  — configuration

#### Returns

([`Compiler`](#compiler)) mdast compiler.

### `handles`

([`Handles`](#handles-1)) Token types mapped to default token handlers.

> 👉 Default handlers are also exported by name. See [`src/handles.ts`](src/handles.ts) for more info.

### `CompileContext`

mdast compiler context (TypeScript type).

#### Properties

- `buffer` (`(this: CompileContext) => undefined`)
  — capture some of the output data
- `config` ([`Config`](#config))
  — configuration
- `data` ([`CompileData`](#compiledata))
  — info passed around; key/value store
- `enter` (`(this: CompileContext, node: Nodes, token: Token, onError?: OnEnterError) => undefined`)
  — enter a node
- `exit` (`(this: CompileContext, token: Token, onError?: OnExitError) => undefined`)
  — exit a node
- `resume` (`(this: CompileContext) => string`)
  — stop capturing and access the output data
- `sliceSerialize` ([`TokenizeContext['sliceSerialize']`](#tokenizecontext))
  — get the string value of a token
- `stack` ([`StackedNode[]`](#stackednode))
  — stack of nodes
- `tokenStack` ([`TokenTuple[]`](#tokentuple))
  — stack of tokens

### `CompileData`

Interface of tracked data (TypeScript interface).

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

### `Compiler`

Turn micromark events into a syntax tree (TypeScript type).

#### Parameters

- `events` ([`Event[]`](#event))
  — list of events

#### Returns

([`Root`][root]) mdast.

### `Config`

Configuration (TypeScript type).

#### Properties

- `canContainEols` (`string[]`)
  — token types where line endings are used
- `enter` ([`Handles`](#handles))
  — opening handles
- `exit` ([`Handles`](#handles))
  — closing handles
- `transforms` ([`Transform[]`](#transform))
  — tree transforms

### `Encoding`

Encodings supported by `TextEncoder` (TypeScript type).

See [`micromark-util-types`][micromark-util-types] for more info.

```ts
type Encoding =
  | 'utf-8' // always supported in node
  | 'utf-16le' // always supported in node
  | 'utf-16be' // not supported when ICU is disabled
  | (string & {}) // everything else (depends on browser, or full ICU data)
```

### `Event`

The start or end of a [token](#token) amongst other events (TypeScript type).

See [`micromark-util-types`][micromark-util-types] for more info.

```ts
type Event = ['enter' | 'exit', Token, TokenizeContext]
```

### `Extension`

Change how [tokens](#token) are turned into nodes (TypeScript type).

See [`Config`](#config) for more info.

```ts
type Extension = Partial<Config>
```

### `Fragment`

Temporary node (TypeScript type).

```ts
type Fragment = Omit<mdast.Parent, 'children' | 'type'> & {
  children: mdast.PhrasingContent[]
  type: 'fragment'
}
```

#### Properties

- `children` ([`mdast.PhrasingContent[]`][phrasing-content])
  — list of children
- `type` (`'fragment'`)
  — node type

### `Handle`

Handle a [token](#token) (TypeScript type).

#### Parameters

- `this` ([`CompileContext`](#compilecontext))
  — compiler context
- `token` ([`Token`](#token))
  — token to handle

#### Returns

(`undefined | void`) Nothing.

### `Handles`

Token types mapped to handles (TypeScript type).

```ts
type Handles = Record<string, Handle>
```

### `OnEnterError`

Handle the case where the `right` token is open, but is closed by the `left` token, or because end of file was reached
(TypeScript type).

#### Parameters

- `this` ([`Omit<CompileContext, 'sliceSerialize'>`](#compilecontext))
  — compiler context
- `left` ([`Token`](#token) | `undefined`)
  — left token
- `right` ([`Token`](#token))
  — open token

#### Returns

(`undefined`) Nothing.

### `OnExitError`

Handle the case where the `right` token is open, but is closed by exiting the `left` token (TypeScript type).

#### Parameters

- `this` ([`Omit<CompileContext, 'sliceSerialize'>`](#compilecontext))
  — compiler context
- `left` ([`Token`](#token))
  — left token
- `right` ([`Token`](#token))
  — open token

#### Returns

(`undefined`) Nothing.

### `Options`

Configuration options (TypeScript type).

#### Properties

- `extensions?` ([`micromark.Extension[]`][micromark-extension] | `null` | `undefined`)
  — extensions for this utility to change how tokens are turned into nodes
- `from?` ([`StartPoint`](#startpoint) | `null` | `undefined`)
  — point before first character in markdown value. node positions will be relative to this point
- `mdastExtensions?` ([`(Extension | Extension[])[]`](#extension) | `null` | `undefined`)
  — extensions for this utility to change how tokens are turned into nodes

### `Point`

A location in the source document and chunk (TypeScript type).

See [`micromark-util-types`][micromark-util-types] for more info.

### `StackedNode`

A node on the compiler context stack (TypeScript type).

```ts
type StackedNode = Fragment | mdast.Nodes
```

### `StartPoint`

Point before first character in a markdown value (TypeScript type).

```ts
type StartPoint = Omit<Point, '_bufferIndex' | '_index'>
```

### `TokenTuple`

List containing an open token on the stack, and an optional error handler to use if the token isn't closed properly
(TypeScript type).

```ts
type TokenTuple = [token: Token, handler: OnEnterError | undefined]
```

### `Token`

A span of chunks (TypeScript interface).

See [`micromark-util-types`][micromark-util-types] for more info.

### `TokenizeContext`

A context object that helps with tokenizing markdown constructs (TypeScript interface).

See [`micromark-util-types`][micromark-util-types] for more info.

### `Transform`

Extra transform, to change the AST afterwards (TypeScript type).

#### Parameters

- `tree` ([`Root`][root])
  — tree to transform

#### Returns

([`Root`][root] | `null` | `undefined` | `void`) New tree or nothing (in which case the current tree is used).

### `Value`

Contents of a file.

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

The syntax tree is [mdast][mdast].

## Types

This package is fully typed with [TypeScript][typescript].

## Security

As markdown is sometimes used for HTML, and improper use of HTML can open you up to a [cross-site scripting (XSS)][xss]
attack, use of `mdast-util-from-markdown` can also be unsafe.

When going to HTML, use this utility in combination with [`hast-util-sanitize`][hast-util-sanitize] to make the tree safe.

## Related

- [`mdast-util-to-markdown`][mdast-util-to-markdown] &mdash; serialize mdast as markdown
- [`micromark`][micromark] &mdash; parse markdown
- [`remark`][remark] &mdash; process markdown

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

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
[micromark-extension]: https://github.com/micromark/micromark#extensions
[micromark-util-types]: https://github.com/micromark/micromark/tree/main/packages/micromark-util-types
[micromark]: https://github.com/micromark/micromark
[phrasing-content]: https://github.com/syntax-tree/mdast#phrasingcontent
[remark]: https://github.com/remarkjs/remark
[root]: https://github.com/syntax-tree/mdast#root
[typescript]: https://www.typescriptlang.org
[uint8-array]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
[yarn]: https://yarnpkg.com
