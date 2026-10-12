import type {} from '@flex-development/mark/ast'
import type {} from '@flex-development/mark/ast/compile'
import type {
  CompileContext,
  Fragment
} from '@flex-development/mdast-util-from-markdown'
import type { PhrasingContent, Root, RootContentMap } from 'mdast'

declare module '@flex-development/mark/ast' {
  interface ContextMap {
    mdast: CompileContext
  }

  interface Extension {
    canContainEols?: string[] | undefined
  }

  interface FragmentChildMap {
    mdast: PhrasingContent
  }

  interface NodeMap extends RootContentMap {
    fragment: Fragment
    root: Root
  }
}
