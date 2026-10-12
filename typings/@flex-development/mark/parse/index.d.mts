import type {} from '@flex-development/mark/parse'
import type * as micromark from 'micromark-util-types'

declare module '@flex-development/mark/parse' {
  interface ContextMap {
    micromark: micromark.TokenizeContext
  }

  interface Token extends micromark.Token {}

  interface TokenTypeMap extends micromark.TokenTypeMap {}
}
