/**
 * @file Type Tests - CompileContext
 * @module mdast-util-from-markdown/types/tests/unit-d/CompileContext
 */

import type { Nodes } from 'mdast'
import type { CompileData } from 'mdast-util-from-markdown'
import type { Token, TokenizeContext } from 'micromark-util-types'
import type TestSubject from '../compile-context'
import type Config from '../config'
import type OnEnterError from '../on-enter-error'
import type OnExitError from '../on-exit-error'
import type StackedNode from '../stacked-node'
import type TokenTuple from '../token-tuple'

describe('unit-d:types/CompileContext', () => {
  it('should match [config: Config]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('config').toEqualTypeOf<Config>()
  })

  it('should match [data: CompileData]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('data')
      .toEqualTypeOf<CompileData>()
  })

  it('should match [sliceSerialize: TokenizeContext["sliceSerialize"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceSerialize')
      .toEqualTypeOf<TokenizeContext['sliceSerialize']>()
  })

  it('should match [stack: StackedNode[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('stack')
      .toEqualTypeOf<StackedNode[]>()
  })

  it('should match [tokenStack: TokenTuple[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tokenStack')
      .toEqualTypeOf<TokenTuple[]>()
  })

  describe('buffer', () => {
    type Subject = TestSubject['buffer']

    it('should match [this: CompileContext]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<TestSubject>()
    })

    describe('return', () => {
      it('should return undefined', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<undefined>()
      })
    })
  })

  describe('enter', () => {
    type Subject = TestSubject['enter']

    it('should match [this: CompileContext]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<TestSubject>()
    })

    describe('parameters', () => {
      it('should be callable with [Nodes, Token, (OnEnterError | undefined)?]', () => {
        // Arrange
        type Expect = [Nodes, Token, (OnEnterError | undefined)?]

        // Expect
        expectTypeOf<Subject>().parameters.toEqualTypeOf<Expect>()
      })
    })

    describe('return', () => {
      it('should return undefined', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<undefined>()
      })
    })
  })

  describe('exit', () => {
    type Subject = TestSubject['exit']

    it('should match [this: CompileContext]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<TestSubject>()
    })

    describe('parameters', () => {
      it('should be callable with [Token, (OnExitError | undefined)?]', () => {
        // Arrange
        type Expect = [Token, (OnExitError | undefined)?]

        // Expect
        expectTypeOf<Subject>().parameters.toEqualTypeOf<Expect>()
      })
    })

    describe('return', () => {
      it('should return undefined', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<undefined>()
      })
    })
  })

  describe('resume', () => {
    type Subject = TestSubject['resume']

    it('should match [this: CompileContext]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<TestSubject>()
    })

    describe('return', () => {
      it('should return string', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string>()
      })
    })
  })
})
