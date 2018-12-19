import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerClock, updateRecorderClock } from '../actions'

class TestComponent extends Component {

  handleClick = (event) => {
    event.preventDefault();
    // this.props.updateClock(this.props.time + 0.5);
    console.log(event.target.id)
    switch(event.target.id){
      case 'p':
        this.props.updatePlayerClock(this.props.time1 + 0.5);
        break;
      case 'r':
        this.props.updateRecorderClock(this.props.time2 + 0.5);
        break;
      default:
    }
  }

  render() {
    return (
      <>
        <p id="p" onClick={this.handleClick}>+</p>
        <p id="r" onClick={this.handleClick}>+</p>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    time1: state.player.time,
    time2: state.recorder.time,
  }
}

export default connect(mapStateToProps, { updatePlayerClock, updateRecorderClock })(TestComponent);
