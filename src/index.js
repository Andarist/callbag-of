export default function of(...values) {
  return (start, sink) => {
    if (start !== 0) return

    let disposed = false

    sink(0, type => {
      if (type !== 2) return
      disposed = true
    })

    for (const value of values) {
      if (disposed) break
      sink(1, value)
    }

    if (!disposed) {
      sink(2)
    }
  }
}
