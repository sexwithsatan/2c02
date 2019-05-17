export default
function* buffers(data, [
  [...A] = [],
  [...B] = []
] = []) {
  const g = data[Symbol.iterator]()
  const {
    done,
    value
  } = g.next()

  if (!done) {
    yield [A, B]
    yield* buffers(g, [B, getPaletteAttribute(value)])
  }
}

function getPaletteAttribute([
/*PAR*/,
  AR,   // attribute register
  BL,   // tile pattern, lower bitplane
  BH    // tile pattern, upper bitplane
]) {

  // A 2-bit palette attribute supplies the colors for 8 consecutive
  // pixels. Hence each bit of the palette attribute is repeated 8 times
  // in a row:
  return [
  /* D0  D1  D2          D3 */
    [BL, BH, 0b00000000, 0b00000000],
    [BL, BH, 0b11111111, 0b00000000],
    [BL, BH, 0b00000000, 0b11111111],
    [BL, BH, 0b11111111, 0b11111111]
  ][AR & 0b11]
}
