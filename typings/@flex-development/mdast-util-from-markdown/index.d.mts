import type * as mark from '@flex-development/mark/ast'
import type { Compiler } from '@flex-development/mdast-util-from-markdown'

declare module '@flex-development/mdast-util-from-markdown' {
  interface CompileContext extends mark.CompileContext {
    /**
     * Turn parser events into a syntax tree.
     *
     * @see {@linkcode Compiler}
     *
     * @internal
     */
    compile: Compiler
  }
}
