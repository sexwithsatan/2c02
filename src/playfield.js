/* globals Object */
import name from './data/name.js'
import attribute from './data/attribute.js'
import pattern from './data/pattern.js'
import metatile from './data/metatile.js'

export default
function* playfield(tiles, {
  FV,   // fine vertical scroll
  V,    // vertical name table
  VT,   // vertical tile index
  S     // playfield pattern table
}, [read]) {
  const g = tiles[Symbol.iterator]()

  for (const {H, HT} of g) {
    const PAR = read(name({V, H, VT}) | HT)
    const AR = read(attribute({V, H, VT, HT}))

    yield Object.freeze([
      PAR,
      AR >>> metatile({VT, HT}),
      read(pattern({S, PAR}) | 0b0000 | FV),
      read(pattern({S, PAR}) | 0b1000 | FV)
    ])
  }
}
