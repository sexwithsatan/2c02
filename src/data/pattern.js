export default
function pattern({S, PAR}) {
  return [
    0b1000000000000 & (S << 12),    // S: Half of sprite table (0: "left"; 1: "right")
    0b0111111110000 & (PAR << 4)
  ].reduce((address, d) => address | d)
}
