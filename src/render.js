import compose from './compose.js'
import buffers from './buffers.js'
import playfield from './playfield.js'
import columns from './raster/columns.js'
import scanlines from './raster/scanlines.js'

export default
function* render(registers, [read]) {
  for (const {V, VT, FV} of scanlines(registers)) {
    const tiles = columns(registers)
    const counters = {FV, V, H, VT, HT}
    const data = playfield(tiles, {...registers, ...counters}, [read])
    const shifters = buffers(data)

    shifters.next()  // Wait until the pipeline is full (i.e., when we have fetched
    shifters.next()  // the first 2 tiles in the scanline) before we start rendering

    for (const [A, B] of shifters) {
      yield* compose(registers, [
        (B[0] << 8) | A[0],   // lower bitplane
        (B[1] << 8) | A[1],   // upper bitplane
        (B[2] << 8) | A[2],   // palette attribute low
        (B[3] << 8) | A[3]    // palette attribute high
      ])
    }
  }
}
