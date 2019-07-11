export default
function metatile({VT, HT}) {
  return [
    0b100 & (VT << 1),
    0b010 & (HT)
  ].reduce((quadrant, d) => quadrant | d)
}
