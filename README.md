# mdast-util-from-markdown

[![github release](https://img.shields.io/github/v/release/flex-development/mdast-util-from-markdown.svg?include_prereleases&sort=semver)](https://github.com/flex-development/mdast-util-from-markdown/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/mdast-util-from-markdown.svg)](https://npmjs.com/package/@flex-development/mdast-util-from-markdown)
[![codecov](https://codecov.io/gh/flex-development/mdast-util-from-markdown/graph/badge.svg?token=um87Ekggjn)](https://codecov.io/gh/flex-development/mdast-util-from-markdown)
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
- [List of extensions](#list-of-extensions)
- [Syntax](#syntax)
- [Syntax tree](#syntax-tree)
- [Security](#security)
- [Related](#related)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

**TODO**: what is this?

## When should I use this?

**TODO**: when should I use this?

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

**TODO**: use

## API

**TODO**: api

## List of extensions

**TODO**: list of extensions

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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize
[mdast-util-to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown
[mdast]: https://github.com/syntax-tree/mdast
[micromark-extension]: https://github.com/micromark/micromark#extensions
[micromark]: https://github.com/micromark/micromark
[remark]: https://github.com/remarkjs/remark
[typescript]: https://www.typescriptlang.org
[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
[yarn]: https://yarnpkg.com
