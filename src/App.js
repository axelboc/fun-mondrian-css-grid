import React, { Component } from 'react'
import { generateGrid } from './utils/generator'
import Grid from './Grid'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { grid: null }
  }

  componentDidMount() {
    const w = document.body.clientWidth
    const h = document.body.clientHeight

    this.setState({
      grid: generateGrid(w, h)
    })
  }

  render() {
    const { grid } = this.state;
    return grid && <Grid {...grid} />
  }
}

export default App
