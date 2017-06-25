import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

function Grid(props) {
  const { rows, columns, cells } = props;

  const styles = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridGap: '.5rem',
  }

  return (
    <div className="grid" style={styles}>
      {cells.map((cell, i) => <Cell key={i} {...cell} />)}
    </div>
  )
}

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Grid
