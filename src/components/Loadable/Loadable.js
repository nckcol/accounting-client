import React, { Component } from 'react'
import ReactLoading from 'react-loading'

class Loadable extends Component {
  render () {
    return (
      this.props.loaded
        ? this.props.render()
        : (
          <div style={{textAlign: 'center'}}>
            <ReactLoading
              style={{
                display: 'inline-block',
                width: '64px',
                height: '64px'
              }}
              type={'bubbles'}
              color={'#000'} />
          </div>
        )
    )
  }
}

export {
  Loadable
}