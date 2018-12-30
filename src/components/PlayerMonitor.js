import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerClock } from '../actions';

class PlayerMonitor extends Component {

  draw = () => {
    if(this.v.paused || this.v.ended || this.props.playRate < 0 ) {
      console.log("Stopping Draw")
      return false;
    }
    // this.props.updatePlayerClock(this.v.currentTime);
    setTimeout(this.draw,20);
  }

  forward = () => {
    this.v.play()
    this.draw();
  }

  reverse = () => {
    const nextTime = this.v.currentTime - (0.017 * Math.abs(this.props.playRate));
    if(!this.props.isPlaying || this.props.playRate > 0){
      console.log("Stopping Reverse");
      return false;
    } else if(nextTime <= 0){
      this.v.currentTime = 0;
      console.log("Stopping Reverse");
      return false;
    } else {
      this.v.currentTime = nextTime;
      setTimeout(this.reverse,20);
    }
  }

  step = (s) => {
    const nextFrame = this.v.currentTime + s;
    if(nextFrame > 0 || this.v.ended){
      // console.log('Stepping to, ', nextFrame);
      this.v.currentTime = nextFrame;
      // this.props.updatePlayerClock(this.v.currentTime);
    }
  }

  controlLogic = () => { // Play, Pause, FF, REW, and Jog
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

  clog = (text) => {
    console.log(`%c${text}`, 'color: purple')
  }

  componentDidMount() {
    this.v = this.refs.video

    this.v.addEventListener("timeupdate", () => {this.props.updatePlayerClock(this.v.currentTime)})
    // ^ This works
  }

  componentDidUpdate() {
    // console.log(this.v.src)
    // if(this.v.src == this.props.source){
    //   this.v = this.refs.video
    // }
    this.updateMonitor();
  }

  updateMonitor() {
    this.clog('updoot')

    if(this.props.stream !== null){
      this.controlLogic()
    } else { this.clog('ERR: no video loaded')}

  }

  // renderVideo = () => {
  //   if (!this.props.isLoading) {
  //     return <video ref="video" src={this.props.source} width={640} height={360} />
  //   } else {
  //     return <div className="ph-video" />
  //   }
  // }

  // render() {
  //   return (
  //     <>{this.renderVideo()}</>
  //   );
  // }

  render() {
    return (
      <video id="pm" ref="video" src={this.props.stream} width={640} height={360} />
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.player.time,
    source: state.player.source,
    stream: state.player.stream,
    isPlaying: state.player.isPlaying,
    playRate: state.player.playRate,
    stepCount: state.player.stepCount,
    stepRate: state.player.stepRate,
    isLoading: state.player.isLoading,
  }
}

export default connect(mapStateToProps, { updatePlayerClock })(PlayerMonitor);
