import weightedPick from 'pick-weight'
import randomInt from 'random-int'
import randomBool from 'random-bool'
import compose from 'fj-compose'

import {
  GAP, TRACK_TO_GAP_RATIO, MAX_ITERATIONS,
  HORIZONTAL, VERTICAL, CUTTING_DIRECTIONS, CUTTING_WEIGHTS,
  PAINTED_CELL_LIKELIHOOD, BLACK, BLUE, RED, YELLOW, COLOURS, COLOUR_WEIGHTS
} from './constants'

/**
 * Generate a grid for the given viewport.
 * @param {number} w - viewport width
 * @param {number} h - viewport height
 * @return {object} - grid
 */
export function generateGrid(w, h) {
  const { rows, columns } = computeTrackCounts(w, h, GAP, TRACK_TO_GAP_RATIO)

  const buildCells = compose(paintCells, removeInvisibleCells, divideArea, getGridArea)
  const cells = buildCells(rows, columns)

  return { gap: GAP, rows, columns, cells }
}

/**
 * Compute the number of rows and columns in the grid based on the dimensions
 * of the viewport and the optimal track size.
 * @param {number} w - viewport width
 * @param {number} h - viewport height
 * @param {number} gap - grid gap size
 * @param {number} trackToGapRatio - grid track size in proportion to gap size
 * @return {object} - number of rows and columns
 */
export function computeTrackCounts(w, h, gap, trackToGapRatio) {
  const trackSize = gap * trackToGapRatio;

  return {
    rows: Math.floor(h / trackSize),
    columns: Math.floor(w / trackSize),
  }
}

/**
 * Determine the grid area based on the number of columns and rows.
 * @param {number} rows
 * @param {number} columns
 * @return {array} - boundaries of the grid
 */
export function getGridArea(rows, columns) {
  return [1, rows + 1, 1, columns + 1]
}

/**
 * Recursively divide the grid into cells.
 * @param {array} area - boundaries of the grid or cell
 * @return {array} - cells
 */
export function divideArea(area, iteration = 0) {
  const [rowStart, rowEnd, colStart, colEnd] = area

  // Base cases
  if (rowEnd - rowStart < 1 || colEnd - colStart < 1) return [];
  if (iteration === MAX_ITERATIONS || rowEnd - rowStart === 1 && colEnd - colStart === 1) return [{ area }]

  // Pick a direction and make a cut
  const dir = weightedPick(CUTTING_DIRECTIONS, CUTTING_WEIGHTS)
  const [subArea1, subArea2] = makeCut(dir, area)

  // Recurse
  const subCells1 = divideArea(subArea1, iteration + 1)
  const subCells2 = divideArea(subArea2, iteration + 1)

  return [...subCells1, ...subCells2]
}

/**
 * Split a area into two in a specified direction but at a random index.
 * @param {string} dir
 * @param {array} area
 * @return {array} - two sub-areas
 */
export function makeCut(dir, area) {
  const rowBounds = area.slice(0, 2)
  const colBounds = area.slice(2, 4)

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

/**
 * Remove any cell with a surface size of zero.
 * @param {array} cells
 * @return {array} - remaining cells
 */
export function removeInvisibleCells(cells) {
  return cells.filter(({ area }) => {
    const [rowStart, rowEnd, colStart, colEnd] = area
    return (rowEnd - rowStart) * (colEnd - colStart) > 0
  })
}

/**
 * Paint the cells at random.
 * @param {array} cells
 * @return {array} - painted cells
 */
export function paintCells(cells) {
  return cells.map(cell => {
    // Decide whether to paint this cell
    if (!randomBool({ likelihood: PAINTED_CELL_LIKELIHOOD })) return cell;

    // Pick a colour and paint the cell
    cell.colour = weightedPick(COLOURS, COLOUR_WEIGHTS)
    return cell;
  })
}
