export default
function attribute({V, H, VT, HT}) {
  return [
    0b100000000000 & (V << 11),
    0b010000000000 & (H << 10),
    0b000000111000 & (VT << 1),
    0b000000000111 & (HT >>> 2)
  ].reduce((address, d) => address | d, 0x23c0)
}
