import type { Point } from '@flex-development/mark/parse'
import type { Compiler } from '@flex-development/mdast-util-from-markdown'

declare module '@flex-development/mdast-util-from-markdown' {
  interface CompileContext {
    /**
     * Turn parser events into a syntax tree.
     *
     * @see {@linkcode Compiler}
     *
     * @internal
     */
    compile: Compiler

    /**
     * The point before the first character in the content.
     *
     * @see {@linkcode Point}
     *
     * @internal
     */
    from: Point
  }
}
