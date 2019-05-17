/* globals Array */

export default
function* rows({V, VT}) {
  const T = (VT < 30) ? VT : VT - 2

  // [VT, (VT+1) ... 28, 29]
  yield* Array.from(
    {length: 30 - T},
    (_, i) => ({V, VT: i + VT})
  )

  // [0, 1 ... (VT-2), (VT-1)]
  yield* Array.from(
    {length: T},
    (_, i) => ({V: (VT < 30) ? ~V : V, VT: i})
  )
}
