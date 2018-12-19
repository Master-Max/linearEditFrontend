import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerClock } from '../actions';

class PlayerMonitor extends Component {

  draw = (v,c,w,h) => {
    if(v.paused || v.ended) return false;

    c.drawImage(v,0,0,w,h);

    this.props.updatePlayerClock(v.currentTime)
    setTimeout(this.draw,20,v,c,w,h);
  }

  forward = () => {
    this.v.play()
    this.draw(this.v,this.ctx,640,360);
  }

  reverse = () => {
    const nextTime = this.v.currentTime - (0.017 * Math.abs(this.props.playRate));
    if(this.v.currentTime - nextTime <= 0 || this.v.paused || this.v.ended){
      return false;
    } else {
      this.v.currentTime = nextTime
      // this.ctx.drawImage(this.v,0,0,640,360)
      this.props.updatePlayerClock(this.v.currentTime)
      setTimeout(this.reverse,20);
    }
  }

  setUp() {
    console.log('setting up')

    var v = this.v;
    var context = this.ctx;

    v.addEventListener('play', () => {
      console.log('playing');
      this.draw(v,context,640,360);
    },false);
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.v = this.refs.video
    // this.setUp();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    console.log("updoot")
    if(this.props.isPlaying) {
      if(this.props.playRate === 1) {
        this.v.playbackRate = this.props.playRate;
        this.v.play()
        this.forward()
      } else
      if(this.props.playRate > 1) {
        this.v.playbackRate = this.props.playRate;
        this.v.play()
        this.forward()
      } else
      if(this.props.playRate < 0) {
        this.v.playbackRate = 0.1;
        this.v.play()
        this.reverse()
      }
    }
    else {
      this.v.pause()
    }

  }

  render() {
    return (
      <>
        <video ref="video" className="" src={this.props.source} width={640} height={360} />
        <canvas ref="canvas" width={640} height={360}/>
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
  }
}

export default connect(mapStateToProps, { updatePlayerClock })(PlayerMonitor);
