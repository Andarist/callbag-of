export default function of(...values) {
  return (start, sink) => {
    if (start !== 0) return

    let disposed = false

    sink(0, type => {
      if (type !== 2) return
      disposed = true
      values.length = 0
    })

    while (values.length !== 0) {
      sink(1, values.shift())
    }

    if (disposed) return

    sink(2)
  }
}
