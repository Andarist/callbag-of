export default function of(...values) {
  return (start, sink) => {
    if (start !== 0) return

    let disposed = false

    sink(0, type => {
      if (type !== 2) return
      disposed = true
    })

    while (values.length !== 0) {
      if (disposed) return
      sink(1, values.shift())
    }

    sink(2)
  }
}
