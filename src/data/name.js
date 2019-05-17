export default
function name({V, H, VT}) {
  return [
    0b100000000000 & (V << 11),
    0b010000000000 & (H << 10),
    0b001111100000 & (VT << 5)
  ].reduce((address, d) => address | d, 0x2000)
}
