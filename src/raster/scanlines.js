/* globals Array */

export default
function* scanlines({V, VT, FV}) {
  const T = (VT < 30) ? VT : VT - 2
  const N = (VT < 30) ? -V + 1 : V

  const row = Array.from({
    length: 8
  }, (_, i) => i)

  const first = row.slice(FV)
  const last = row.slice(0, FV)

  yield* first.map(FV => ({V, VT, FV}))

  for (const i of Array.from({length: 29 - T}, (_, i) => i + 1)) {
    yield* row.map(FV => ({V, VT: VT + i, FV}))
  }

  for (const i of Array.from({length: T}, (_, i) => i)) {
    yield* row.map(FV => ({V: N, VT: i, FV}))
  }

  yield* last.map(FV => ({V: N, VT, FV}))
}
