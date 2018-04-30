import observe from 'callbag-observe'
import pipe from 'callbag-pipe'

import of from '../src'

test('works', () => {
  const actual = []

  pipe(
    of(10, 20, 30, 40, 50),
    observe(value => {
      actual.push(value)
    }),
  )

  return expect(actual).toEqual([10, 20, 30, 40, 50])
})
