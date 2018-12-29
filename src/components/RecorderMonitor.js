import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRecorderClock, updateRecorderSource } from '../actions';

class RecorderMonitor extends Component {

  state = {
    source: null
  }

  // To get the clock to display right
  // I'm subtracting the currentSource's playerIN time from this.v's currentTime
  // I probably want to do all the clock stuff in one place one day...

  draw = () => {
    if(this.v.paused || this.v.ended || this.props.playRate < 0 ) {
      console.log("Stopping Draw")
      return false;
    }
    this.props.updateRecorderClock(this.v.currentTime - this.props.currentSource.playerIN)
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
      this.props.updateRecorderClock(this.v.currentTime - this.props.currentSource.playerIN);
      setTimeout(this.reverse,20);
    }
  }

  step = (s) => {
    const nextFrame = this.v.currentTime + s;
    if(nextFrame > this.props.currentSource.playerIN || this.v.ended){
      // console.log('Stepping to, ', nextFrame);
      this.v.currentTime = nextFrame;
      this.props.updateRecorderClock(this.v.currentTime - this.props.currentSource.playerIN);
    }
    else if (nextFrame < this.props.currentSource.playerIN){
      this.v.currentTime = this.props.currentSource.playerIN;
      this.props.updateRecorderClock(0);
    }
  }

  switcher = () => {
    if (this.props.currentSource !== null){
      if (this.v.currentTime < this.props.currentSource.playerIN){
        this.v.currentTime = this.props.currentSource.playerIN
      }
      else if (this.v.currentTime > this.props.currentSource.playerOUT){
        console.log('Should try to switch to next source');

        this.v.pause();
      }
    }
  }

  lookHereLater = () => {
    this.v.removeEventListener('timeupdate', this.switcher)
  }

  componentDidMount() {
    this.v = this.refs.video
    this.v.addEventListener('timeupdate', this.switcher)
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
        <video ref="video" className="" src={this.props.isLoaded ? this.props.currentSource.streamURL : null} width={640} height={360} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.recorder.time,
    sources: state.recorder.sources,
    currentSource: state.recorder.currentSource,
    isLoaded: state.recorder.isLoaded,
    isPlaying: state.recorder.isPlaying,
    playRate: state.recorder.playRate,
    stepCount: state.recorder.stepCount,
    stepRate: state.recorder.stepRate,
  }
}

export default connect(mapStateToProps, { updateRecorderClock })(RecorderMonitor);

/*

OK so notes, working on this cool cool.

So I added a dev thing where localhosts urls dont trigger the api so i can work offline

Next thing I need to do is... um yeah.

So I think I can like queue a "next video" with the html5 video tag
Or I can manually switch the video out...

Also I need some automanted system to "sort the videos"
by that i mean look at the recorder ins and outs and then organizes the
array of sources

Also I need to decide if hitting auto edit actually makes the video
or if it just locks it in locally, faking it or whatever.


*/
