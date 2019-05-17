/* globals Object */

export default
function* compose({FH}, [D0, D1, D2, D3]) {
  for (const X of [
    FH,
    FH + 1,
    FH + 2,
    FH + 3,
    FH + 4,
    FH + 5,
    FH + 6,
    FH + 7
  ]) {
    yield [
      0b0001 &  (D0 >>> X),
      0b0010 & ((D1 >>> X) << 1),
      0b0100 & ((D2 >>> X) << 2),
      0b1000 & ((D3 >>> X) << 3),
    ].reduce((color, d) => color | d, 0x10)
  }
}
