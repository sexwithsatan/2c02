/* globals Array */

export default
function* scanlines({FV}) {
  yield* Array.from(
    {length: 8},
    (_, i) => ({FV: (FV + i) % 8})
  )
}
