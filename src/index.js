export default function of(...values) {
  return (start, sink) => {
    if (start !== 0) return

    let copy = values.slice()
    let disposed = false

    sink(0, type => {
      if (type !== 2) return
      disposed = true
      copy.length = 0
    })

    while (copy.length !== 0) {
      sink(1, copy.shift())
    }

    if (disposed) return

    sink(2)
  }
}
