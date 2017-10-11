import expect from 'expect'
import { HORIZONTAL, VERTICAL } from 'src/utils/constants'
import {
  computeTrackCounts,
  getGridArea,
  divideArea,
  makeCut
} from 'src/utils/generator'

describe('utils/generator', () => {
  describe('computeTrackCounts', () => {
    it('should compute the optimal number of rows and columns for the grid', () => {
      const counts = computeTrackCounts(100, 50, 8, 5)
      expect(counts).toEqual({
        rows: 1,
        columns: 2
      })
    })
  })

  describe('getGridArea', () => {
    it('should determine the boundaries of the grid', () => {
      const area = getGridArea(2, 3)
      expect(area).toEqual([1, 3, 1, 4])
    })
  })

  describe('divideArea', () => {
    it('should return an array', () => {
      const cells = divideArea([1, 2, 1, 2])
      expect(cells).toBeAn(Array)
    })

    it('should return a single cell when the grid has only one row and one column', () => {
      const cells = divideArea([1, 2, 1, 2])
      expect(cells).toEqual([
        { area: [1, 2, 1, 2] }
      ])
    })

    it('should return a set of cells that fills the entire area of the grid', () => {
      const cells = divideArea([1, 11, 1, 11])

      const totalArea = cells.reduce((acc, { area }) => {
        const [rowStart, rowEnd, colStart, colEnd] = area
        return acc + (rowEnd - rowStart) * (colEnd - colStart)
      }, 0)

      expect(totalArea).toBe(100)
    })
  })

  describe('makeCut', () => {
    it('should return two areas', () => {
      const subAreas = makeCut(HORIZONTAL, [1, 1, 1, 1])
      expect(subAreas).toEqual([
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ])
    })

    it('should not modify column bounds when performing a horizontal cut', () => {
      const [subArea1, subArea2] = makeCut(HORIZONTAL, [1, 5, 2, 6])
      expect(subArea1.slice(2, 4)).toEqual([2, 6])
      expect(subArea2.slice(2, 4)).toEqual([2, 6])
    })

    it('should not modify row bounds when performing a vertical cut', () => {
      const [subArea1, subArea2] = makeCut(VERTICAL, [1, 5, 2, 6])
      expect(subArea1.slice(0, 2)).toEqual([1, 5])
      expect(subArea2.slice(0, 2)).toEqual([1, 5])
    })

    it('should perform horizontal cut', () => {
      const [[a, b], [c, d]] = makeCut(HORIZONTAL, [1, 5, 10, 15])
      expect(a).toBe(1)
      expect(b).toBeGreaterThanOrEqualTo(1)
      expect(b).toBeLessThanOrEqualTo(5)
      expect(b).toBe(c)
      expect(d).toBe(5)
    })

    it('should perform vertical cut', () => {
      const [[, , a, b], [, , c, d]] = makeCut(VERTICAL, [1, 5, 10, 15])
      expect(a).toBe(10)
      expect(b).toBeGreaterThanOrEqualTo(10)
      expect(b).toBeLessThanOrEqualTo(15)
      expect(b).toBe(c)
      expect(d).toBe(15)
    })
  })
})
