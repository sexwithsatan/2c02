/* globals Array */

export default
function* columns({H, HT}) {

  // [HT, (HT+1) ... 30, 31]
  yield* Array.from(
    {length: 32 - HT},
    (_, i) => ({H, HT: i + HT})
  )

  // [0, 1 ... (HT-2), (HT-1), HT, (HT+1)]
  yield* Array.from(
    {length: HT + 2},
    (_, i) => ({H: ~H, HT: i})
  )
}
