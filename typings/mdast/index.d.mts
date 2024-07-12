import type {} from 'mdast'

declare module 'mdast' {
  interface BreakData {
    blank?: boolean | undefined
  }
}
