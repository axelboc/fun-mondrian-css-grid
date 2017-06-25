import React, { Component } from 'react'

import { YELLOW, RED, BLUE } from './utils/colors'
import { generateGrid } from './utils/generator'

import Grid from './Grid'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      grid: {
        columns: 8,
        rows: 10,
        cells: [
          {
            tracks: [1, 7, 1, 5],
            color: RED,
          },
          {
            tracks: [1, 3, 5, 6],
            color: YELLOW,
          },
          {
            tracks: [3, 7, 5, 6],
          },
          {
            tracks: [1, 5, 6, 8],
          },
          {
            tracks: [5, 6, 6, 8],
            color: BLUE,
          },
          {
            tracks: [1, 3, 8, 9],
            color: RED,
          },
          {
            tracks: [3, 6, 8, 9],
          },
          {
            tracks: [7, 11, 1, 5],
          },
          {
            tracks: [7, 11, 5, 6],
            color: BLUE,
          },
          {
            tracks: [6, 11, 6, 9],
            color: YELLOW,
          },
        ],
      },
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <Grid {...grid} />
    )
  }
}

export default App
