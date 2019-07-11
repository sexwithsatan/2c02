export default
function* buffers(data, [
  [...A] = [],
  [...B] = []
] = []) {
  const iterable = data[Symbol.iterator]()
  const {
    done,
    value: tile
  } = iterable.next()

  if (!done) {
    yield [A, B]
    yield* buffers(data, [B, getPaletteAttribute(tile)])
  }
}

function getPaletteAttribute([
  ,     // picture address register
  AR,   // attribute register
  BL,   // tile pattern, lower bitplane
  BH    // tile pattern, upper bitplane
]) {

  // A 2-bit palette attribute supplies the colors for 8 consecutive
  // pixels. Hence each bit of the palette attribute is repeated 8 times
  // in a row:
  switch (AR & 0b11) {
                  /* D0  D1  D2          D3 */
  case 0b00: return [BL, BH, 0b00000000, 0b00000000]
  case 0b01: return [BL, BH, 0b11111111, 0b00000000]
  case 0b10: return [BL, BH, 0b00000000, 0b11111111]
  case 0b11: return [BL, BH, 0b11111111, 0b11111111]
  }
}
