import weightedPick from 'pick-weight'
import randomInt from 'random-int'

import {
  YELLOW, RED, BLUE,
  GAP, TRACK_TO_GAP_RATIO, MAX_ITERATIONS,
  HORIZONTAL, VERTICAL, CUTTING_DIRECTIONS, CUTTING_WEIGHTS
} from './constants'

export function generateGrid(w, h) {
  const trackCounts = computeTrackCounts(w, h, GAP, TRACK_TO_GAP_RATIO)
  const { rows, columns } = trackCounts

  const gridZone = [1, rows + 1, 1, columns + 1]
  const cells = createCells(gridZone)

  return {
    gap: GAP,
    ...trackCounts,
    cells
  }
}

/**
 * Compute the number of rows and columns in the grid based on the dimensions
 * of the viewport and the optimal track size.
 * @param {number} w - viewport width
 * @param {number} h - viewport height
 * @param {number} gap - grid gap size
 * @param {number} trackToGapRatio - grid track size in proportion to gap size
 */
export function computeTrackCounts(w, h, gap, trackToGapRatio) {
  const trackSize = gap * trackToGapRatio;

  return {
    rows: Math.floor(h / trackSize),
    columns: Math.floor(w / trackSize),
  }
}

/**
 * Recursively divide the grid into cells.
 * @param {array} zone - boundaries of the grid or cell
 */
export function createCells(zone, iteration = 0) {
  const [rowStart, rowEnd, colStart, colEnd] = zone

  // Base cases
  if (rowEnd - rowStart < 1 || colEnd - colStart < 1) return [];
  if (iteration === MAX_ITERATIONS || rowEnd - rowStart === 1 && colEnd - colStart === 1) return [{ zone }]

  // Pick a direction and make a cut
  const dir = weightedPick(CUTTING_DIRECTIONS, CUTTING_WEIGHTS)
  const [subZone1, subZone2] = makeCut(dir, zone)

  // Recurse
  const subCells1 = createCells(subZone1, iteration + 1)
  const subCells2 = createCells(subZone2, iteration + 1)

  return [...subCells1, ...subCells2]
}

/**
 * Split a zone into two in a specified direction but at a random index.
 * @param {string} dir
 * @param {array} zone
 */
export function makeCut(dir, zone) {
  const rowBounds = zone.slice(0, 2)
  const colBounds = zone.slice(2, 4)

  const isHorizDir = dir === HORIZONTAL
  const cutIndex = randomInt(...(isHorizDir ? rowBounds : colBounds))

  return isHorizDir ? [
    [rowBounds[0], cutIndex, ...colBounds],
    [cutIndex, rowBounds[1], ...colBounds]
  ] : [
    [...rowBounds, colBounds[0], cutIndex],
    [...rowBounds, cutIndex, colBounds[1]]
  ]
}
