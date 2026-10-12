import type {} from '@flex-development/mark/ast'
import type {} from '@flex-development/mark/ast/compile'
import type {
  CompileContext,
  Node
} from '@flex-development/mdast-util-from-markdown'
import type { PhrasingContent } from 'mdast'

declare module '@flex-development/mark/ast' {
  type Nodes = { [T in Node['type']]: Extract<Node, { type: T }> }

  interface ContextMap {
    mdast: CompileContext
  }

  interface Extension {
    /**
     * The list of token types where line endings are allowed.
     */
    canContainEols?: string[] | undefined
  }

  interface FragmentChildMap {
    mdast: PhrasingContent
  }

  interface NodeMap extends Nodes {}
}
