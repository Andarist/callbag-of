# callbag-of

Callbag source factory that emits values specified as arguments. It's similar to [`fromIter`](https://github.com/staltz/callbag-from-iter/), but this one creates a listenable source and does not rely on iteration protol.

## Example

```js
import observe from 'callbag-observe'
import of from 'callbag-of'
import pipe from 'callbag-pipe'

pipe(
  of(1, 2, 3, 4, 5),
  observe(value => {
    // will log 1, 2, 3, 4, 5
    console.log(value)
  }),
)
```
