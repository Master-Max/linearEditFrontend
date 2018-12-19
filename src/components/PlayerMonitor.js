import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerClock } from '../actions';

class PlayerMonitor extends Component {

  draw = () => {
    if(this.v.paused || this.v.ended || this.props.playRate < 0 ) {
      console.log("Stopping Draw")
      return false;
    }
    this.props.updatePlayerClock(this.v.currentTime)
    setTimeout(this.draw,20);
  }

  forward = () => {
    this.v.play()
    this.draw(this.v,this.ctx,640,360);
  }

  reverse = () => {
    const nextTime = this.v.currentTime - (0.017 * Math.abs(this.props.playRate));
    if(this.v.currentTime - nextTime <= 0 || this.v.currentTime === 0 || !this.props.isPlaying || this.props.playRate > 0){
      console.log("Stopping Reverse");
      return false;
    } else {
      this.v.currentTime = nextTime;
      this.props.updatePlayerClock(this.v.currentTime);
      setTimeout(this.reverse,20);
    }
  }

  step = (s) => {
    const nextFrame = this.v.currentTime + s;
    if(nextFrame > 0 || this.v.ended){
      // console.log('Stepping to, ', nextFrame);
      this.v.currentTime = nextFrame;
      this.props.updatePlayerClock(this.v.currentTime);
    }
  }

  componentDidMount() {
    this.v = this.refs.video
  }

  componentDidUpdate() {
    this.updateMonitor();
  }

  updateMonitor() {
    console.log("updoot")
    if(this.props.isPlaying) {
      if(this.props.playRate === 1) {
        this.v.playbackRate = this.props.playRate;
        this.forward()
      } else
      if(this.props.playRate > 1) {
        this.v.playbackRate = this.props.playRate;
        this.forward()
      } else
      if(this.props.playRate < 0) {
        this.v.playbackRate = 0;
        this.reverse()
      }
    }
    else {
      this.v.pause()
      if(this.props.stepRate != 0) {
        this.step(this.props.stepRate);
      }
    }

  }

  render() {
    return (
      <>
        <video ref="video" className="" src={this.props.source} width={640} height={360} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.player.time,
    source: state.player.source,
    isPlaying: state.player.isPlaying,
    playRate: state.player.playRate,
    stepCount: state.player.stepCount,
    stepRate: state.player.stepRate,
  }
}

export default connect(mapStateToProps, { updatePlayerClock })(PlayerMonitor);
