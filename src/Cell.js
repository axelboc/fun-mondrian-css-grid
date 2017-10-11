import React from 'react'
import PropTypes from 'prop-types'

function Cell(props) {
  const { area, colour } = props;
  const [rowStart, rowEnd, colStart, colEnd] = area;

  const styles = {
    gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
    ...(colour && { backgroundColor: colour }),
  }

  return (
    <div className="cell" style={styles} />
  )
}

Cell.propTypes = {
  area: PropTypes.arrayOf(PropTypes.number).isRequired,
  colour: PropTypes.string,
}

export default Cell
