import observe from 'callbag-observe'
import pipe from 'callbag-pipe'
import take from 'callbag-take'
import tap from 'callbag-tap'
import tapUp from 'callbag-tap-up'

import of from '../src'

const noop = () => {}

test('works', () => {
  const actual = []

  pipe(
    of(10, 20, 30, 40, 50),
    tap(noop, noop, () => {
      actual.push('completion')
    }),
    observe(value => {
      actual.push(value)
    }),
  )

  expect(actual).toEqual([10, 20, 30, 40, 50, 'completion'])
})

test('should stop emitting values (& completion) after being unsubscribed', done => {
  const actual = []

  let disposed = false

  const failAfterDisposal = () => {
    if (!disposed) return
    done.fail(
      'Nothing should be emitted down to the sink after the source gets unsubscribed.',
    )
  }

  pipe(
    of(10, 20, 30, 40, 50),
    tapUp(noop, noop, () => {
      disposed = true
    }),
    tap(failAfterDisposal, failAfterDisposal, failAfterDisposal),
    take(3),
    observe(value => {
      actual.push(value)
    }),
  )

  expect(actual).toEqual([10, 20, 30])
  done()
})

test('should not emit completion if unsubscribed between emitting last value & completion', done => {
  const actual = []

  let disposed = false

  const failAfterDisposal = () => {
    if (!disposed) return
    done.fail(
      'Nothing should be emitted down to the sink after the source gets unsubscribed.',
    )
  }

  pipe(
    of(10, 20, 30),
    tapUp(noop, noop, () => {
      disposed = true
    }),
    tap(failAfterDisposal, failAfterDisposal, failAfterDisposal),
    take(3),
    observe(noop),
  )

  done()
})

test('should emit to multiple subscribers.', done => {
  const received = []

  const src = of(7, 42)

  pipe(
    src,
    observe(v => received.push(v)),
  )
  pipe(
    src,
    observe(v => received.push(v)),
  )

  expect(received).toEqual([7, 42, 7, 42])

  done()
})
