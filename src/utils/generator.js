import { YELLOW, RED, BLUE } from './colors'

const BASE_FONT_SIZE = 16
const GAP = 0.5 // in proportion to base font size
const TRACK_TO_GAP_RATIO = 5

export function generateGrid(w, h) {
  return Object.assign(
    {
      gap: GAP,
    },
    computeTrackCounts(w, h),
    {
      cells: [
        {
          bounds: [1, 7, 1, 5],
          color: RED,
        },
        {
          bounds: [1, 3, 5, 6],
          color: YELLOW,
        },
        {
          bounds: [3, 7, 5, 6],
        },
        {
          bounds: [1, 5, 6, 8],
        },
        {
          bounds: [5, 6, 6, 8],
          color: BLUE,
        },
        {
          bounds: [1, 3, 8, 9],
          color: RED,
        },
        {
          bounds: [3, 6, 8, 9],
        },
        {
          bounds: [7, 11, 1, 5],
        },
        {
          bounds: [7, 11, 5, 6],
          color: BLUE,
        },
        {
          bounds: [6, 11, 6, 9],
          color: YELLOW,
        },
      ],
    }
  )
}

function computeTrackCounts() {
  return {
    columns: 8,
    rows: 10,
  }
}
