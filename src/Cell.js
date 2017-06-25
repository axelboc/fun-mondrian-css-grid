import React from 'react'
import PropTypes from 'prop-types'

function Cell(props) {
  const { tracks, color } = props;
  const [rowStart, rowEnd, colStart, colEnd] = tracks;

  const styles = {
    gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
    ...(color && { backgroundColor: color }),
  }

  return (
    <div className="cell" style={styles} />
  )
}

Cell.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
}

export default Cell
