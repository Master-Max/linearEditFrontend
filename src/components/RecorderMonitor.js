import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRecorderClock, updateRecorderSource, updateClipsJson } from '../actions';
import Clip from '../clip.js'

class RecorderMonitor extends Component {

  /* CLIP FORMAT
    {
      sourceURL: "",
      streamURL: "",
      playerIN: 0,
      playerOUT: 300,
      recorderIN: 0,
      recorderOUT: 300
    }
  */

  state = {
    stream: null,
    clips: [],
    currentClip: null,
    currentClipIndex: null, // Will be a index
    previewClip: null,

    clipCount: 0, // Total added clips from player
    stepCount: 0,
  }

  // To get the clock to display right
  // I'm subtracting the currentSource's playerIN time from this.v's currentTime
  // I probably want to do all the clock stuff in one place one day...



  getCurrentTime = () => {
    let cTime = this.v.currentTime - this.state.currentClip.playerIN
    if(this.state.currentClipIndex > 0){
      this.state.clips.forEach((clip, i) => {
        if(i < this.state.currentClipIndex){
          cTime += clip.playTime;
        }
      })
    }
    return cTime
  }

  draw = () => {
    if(this.v.paused || this.v.ended || this.props.playRate < 0) {
      this.v.pause();
      this.clog("Stopping Draw 1");
      return false;
    }
    else if (this.state.currentClip !== null){
      if ((this.state.currentClipIndex + 1) === this.state.clips.length && this.v.currentTime >= this.state.currentClip.playerOUT){
        this.v.pause();
        this.clog("Stopping Draw 2")
        return false;
      }
      else if (this.v.currentTime < this.state.currentClip.playerIN){
        this.v.currentTime = this.state.currentClip.playerIN;
      }
      else if (this.v.currentTime >= this.state.currentClip.playerOUT){
        if (this.state.currentClipIndex + 1 < this.state.clips.length){
          this.clog('switching to next clip')
          this.setState({
            stream: this.state.clips[this.state.currentClipIndex + 1].streamURL,
            currentClip: this.state.clips[this.state.currentClipIndex + 1],
            currentClipIndex: this.state.currentClipIndex + 1,
          }, () => {
            this.v.currentTime = this.state.currentClip.playerIN;
          })
        }
      }
    }
    // this.switcher();
    // this.props.updateRecorderClock(this.getCurrentTime())
    setTimeout(this.draw,20);
  }

  forward = () => {
    if(this.v.currentTime + 0.0001 >= this.state.currentClip.playerOUT && (this.state.currentClipIndex + 1) === this.state.clips.length){
      this.clog('At End Of Video')
      this.v.pause();
    } else {
      this.v.play();
      this.draw();
    }
  }

  reverse = () => {
    // this.clog('got to reverse');
    const nextTime = this.v.currentTime - (0.017 * Math.abs(this.props.playRate));
    if(this.state.currentClipIndex === 0){
      if(!this.props.isPlaying || this.props.playRate > 0){
        this.clog("Stopping Reverse, CCI: 0");
        return false;
      } else if(nextTime <= this.state.currentClip.playerIN){
        this.v.currentTime = this.state.currentClip.playerIN;
        this.clog("Stopping Reverse, CCI: 0");
        return false;
      } else {
        this.v.currentTime = nextTime;
        setTimeout(this.reverse,20);
      }
    }
    else {
      // this.clog('Here 01')
      if(!this.props.isPlaying || this.props.playRate > 0){
        this.clog(`Stopping Reverse, CCI: ${this.state.currentClipIndex}`)
        return false;
      }
      else if(nextTime <= this.state.currentClip.playerIN){
        this.clog(`Switching to Previous Clip, CCI: ${this.state.currentClipIndex}`)
        this.setState({
          stream: this.state.clips[this.state.currentClipIndex - 1].streamURL,
          currentClip: this.state.clips[this.state.currentClipIndex - 1],
          currentClipIndex: this.state.currentClipIndex - 1,
        }, () => {
          this.v.currentTime = this.state.currentClip.playerOUT;
          setTimeout(this.reverse,20);
        })
      }
      else {
        this.v.currentTime = nextTime;
        setTimeout(this.reverse,20);
      }
    }
  }

  nextClip = () => {
    this.setState({
      stream: this.state.clips[this.state.currentClipIndex + 1].streamURL,
      currentClip: this.state.clips[this.state.currentClipIndex + 1],
      currentClipIndex: this.state.currentClipIndex + 1,
    }, () => {this.v.currentTime = this.state.currentClip.playerIN})
  }

  prevClip = () => {
    this.setState({
      stream: this.state.clips[this.state.currentClipIndex - 1].streamURL,
      currentClip: this.state.clips[this.state.currentClipIndex - 1],
      currentClipIndex: this.state.currentClipIndex - 1,
    }, () => {this.v.currentTime = this.state.currentClip.playerOUT})
  }

  step = (s) => {
    let nextFrame = this.v.currentTime + s;
    if (nextFrame < this.state.currentClip.playerIN){
      this.clog('out of bounds left');
      if(this.state.currentClipIndex === 0){
        this.clog('stepping to start');
        this.v.currentTime = this.state.currentClip.playerIN;
      }
      else{
        this.clog('stepping to prev clip');
        this.prevClip()
      }
    }
    else if(nextFrame > this.state.currentClip.playerOUT){
      this.clog('out of bounds right');
      if(this.state.currentClipIndex + 1 === this.state.clips.length){
        this.clog('stepping to end');
        this.v.currentTime = this.state.currentClip.playerOUT;
      }
      else{
        this.clog('stepping to next clip');
        this.nextClip()
      }
    }
    else {
      this.clog('in bounds');
      this.v.currentTime = nextFrame;
    }

    /*
    if(nextFrame < this.state.currentClip.playerOUT || nextFrame > this.state.currentClip.playerIN){
      this.clog('here 1')
      this.v.currentTime = nextFrame;
    } else {
      this.clog('here 2')
      if(nextFrame < this.state.currentClip.playerIN){
        if(this.state.currentClipIndex === 0){
          this.v.currentTime = this.state.currentClip.playerIN;
        } else {
          this.clog(`Stepping to Previous Clip, CCI: ${this.state.currentClipIndex}`)
          this.setState({
            stream: this.state.clips[this.state.currentClipIndex - 1].streamURL,
            currentClip: this.state.clips[this.state.currentClipIndex - 1],
            currentClipIndex: this.state.currentClipIndex - 1,
          }, () => {this.v.currentTime = this.state.currentClip.playerOUT;})
        }
      }else
      if(nextFrame > this.state.currentClip.playerOUT){
        if((this.state.currentClipIndex + 1) === this.state.clips.length){
          this.v.currentTime = this.state.currentClip.playerOUT;
        } else {
          this.clog(`Stepping to Next Clip, CCI: ${this.state.currentClipIndex}`)
          this.setState({
            stream: this.state.clips[this.state.currentClipIndex + 1].streamURL,
            currentClip: this.state.clips[this.state.currentClipIndex + 1],
            currentClipIndex: this.state.currentClipIndex + 1,
          }, () => {this.v.currentTime = this.state.currentClip.playerIN;})
        }
      }
    }
    */
  }

  switcher = () => {
    if (this.state.currentClip !== null){
      if (this.v.currentTime < this.state.currentClip.playerIN){
        this.v.currentTime = this.state.currentClip.playerIN
        this.setState({stream: this.state.currentClip.streamURL})
      }
      else if (this.v.currentTime >= this.state.currentClip.playerOUT){
        if (this.state.currentClipIndex + 1 < this.state.clips.length){
          this.clog('switching to next clip')
          this.setState({
            stream: this.state.clips[this.state.currentClipIndex + 1].streamURL,
            currentClip: this.state.clips[this.state.currentClipIndex + 1],
            currentClipIndex: this.state.currentClipIndex + 1,
          })
        } else {
          this.clog('end of video')
          this.v.pause();
        }
      }
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
        if(this.props.stepCount > this.state.stepCount){
          this.step(this.props.stepRate);
        }
      }
    }
  }

  clog = (text) => {
    console.log(`%c${text}`, 'color: red')
  }

  lookHereLater = () => {
    this.v.removeEventListener('timeupdate', this.switcher)
  }

  componentDidMount() {
    this.v = this.refs.video;
    this.v.addEventListener('timeupdate', () => {this.props.updateRecorderClock(this.getCurrentTime())})
    // this.v.addEventListener('timeupdate', this.switcher);
  }

  componentDidUpdate() {
    this.updateMonitor();
  }

  formatTime = ( time ) => {
    // '00:00:00.000' <-- Format I'm going for
    let r = {
      h: '00',
      m: '00',
      s: '00',
      ms: '000',
    }

    r.ms = (time % 1).toFixed(3).substring(2);

    let t = Math.trunc(time);

    if (t < 60) {
      r.s = `${t < 10 ? `0${t}` : `${t}`}`;
    } else
    if (t < 3600) {
      const min = Math.floor(t / 60);
      const sec = t - (min * 60);
      r.m = `${min < 10 ? `0${min}` : `${min}`}`;
      r.s = `${sec < 10 ? `0${sec}` : `${sec}`}`;
    }
    else {
      const hour = Math.floor(t / 3600);
      const min = Math.floor((t - (hour * 3600)) / 60);
      const sec = t - (hour * 3600) - (min * 60);
      r.h = `${hour < 10 ? `0${hour}` : `${hour}`}`
      r.m = `${min < 10 ? `0${min}` : `${min}`}`;
      r.s = `${sec < 10 ? `0${sec}` : `${sec}`}`;
    }

    return `${r.h}:${r.m}:${r.s}.${r.ms}`;
  }

  formatClips = ( clips ) => (
    clips.map((clip) => ({
      sourceURL: clip.sourceURL,
      streamURL: clip.streamURL,
      playerIN: this.formatTime(clip.playerIN),
      playerOUT: this.formatTime(clip.playerOUT),
      recorderIN: this.formatTime(clip.recorderIN),
      recorderOUT: this.formatTime(clip.recorderOUT),
    }))
  )

  doesClipConflict = (newClip) => {
    let result = false
    if (this.state.clips.length === 0){
      result = false;
    } else {
      this.state.clips.forEach((clip) => {
        if(newClip.recorderIN < clip.recorderOUT && newClip.recorderOUT > clip.recorderIN){
          result = true;
        }
      })
    }
    return result;
  }

  updateMonitor() {
    this.clog('updoot')

    if(this.props.clipCount > this.state.clipCount){ // New Clip was added
      this.clog('new clip added');
      const newClips = [];
      if (this.doesClipConflict(this.props.lastAddedClip)){
        const preClips = [];
        const postClips = [];
        const newClip = this.props.lastAddedClip;

        this.state.clips.forEach((clip) => {
          if (clip.recorderOUT <= newClip.recorderIN){
            preClips.push(clip);
          }
          else if (clip.recorderIN >= newClip.recorderOUT){
            postClips.push(clip);
          }
          else {
            if (clip.recorderIN > newClip.recorderIN && clip.recorderOUT < newClip.recorderOUT){ // complete overwrite
              this.clog('A Clip Was Completely Overwritten');
            }
            else if (clip.recorderIN < newClip.recorderIN && clip.recorderOUT > newClip.recorderOUT){ // overwrite middle of clip
              const preClip = {
                sourceURL: clip.sourceURL,
                streamURL: clip.streamURL,
                playerIN: clip.playerIN,
                playerOUT: (clip.playerIN + (newClip.recorderIN - clip.recorderIN)),
                recorderIN: clip.recorderIN,
                recorderOUT: newClip.recorderIN,
              }
              const postClip = {
                sourceURL: clip.sourceURL,
                streamURL: clip.streamURL,
                playerIN: (clip.playerOUT - (clip.recorderOUT - newClip.recorderOUT)),
                playerOUT: clip.playerOUT,
                recorderIN: newClip.recorderOUT,
                recorderOUT: clip.recorderOUT,
              }
              preClips.push(new Clip(preClip))
              postClips.push(new Clip(postClip))
            }
            else if (clip.recorderIN < newClip.recorderIN && clip.recorderOUT < newClip.recorderOUT){ // overwrite end of the clip
              const preClip = {
                sourceURL: clip.sourceURL,
                streamURL: clip.streamURL,
                playerIN: clip.playerIN,
                playerOUT: (clip.playerIN + (newClip.recorderIN - clip.recorderIN)),
                recorderIN: clip.recorderIN,
                recorderOUT: newClip.recorderIN,
              }
              preClips.push(new Clip(preClip))
            }
            else if (clip.recorderIN > newClip.recorderIN && clip.recorderOUT > newClip.recorderOUT){ // overwrite start of the clip
              const postClip = {
                sourceURL: clip.sourceURL,
                streamURL: clip.streamURL,
                playerIN: (clip.playerOUT - (clip.recorderOUT - newClip.recorderOUT)),
                playerOUT: clip.playerOUT,
                recorderIN: newClip.recorderOUT,
                recorderOUT: clip.recorderOUT,
              }
              postClips.push(new Clip(postClip))
            }
          }
        })
        newClips.push(...preClips, newClip, ...postClips)
      }
      else {
        newClips.push(...this.state.clips, this.props.lastAddedClip)
        newClips.sort((a,b) => (a.recorderIN - b.recorderIN))
      }


      this.props.updateClipsJson(JSON.stringify(this.formatClips(newClips)))

      this.setState({
        stream: newClips[0].streamURL,
        clips: newClips,
        clipCount: this.state.clipCount + 1,
        currentClip: newClips[0],
        currentClipIndex: 0,
      })
    }

    if(this.props.stepCount > this.state.stepCount){
      this.setState({
        stepCount: this.props.stepCount
      })
    }

    if(this.props.previewClip !== null){
      /*
      If there is a previewClip check constantly
      on where is gets inserted and then insert it there.
      */
    }

    if(this.state.currentClip !== null){
      this.controlLogic()
    } else { this.clog('ERR: no video(s) loaded')}
  }

  render() {
    return (
      <>
        <video ref="video" data-clip={this.state.currentClip} src={this.state.stream} width={640} height={360} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.recorder.time,
    sources: state.recorder.sources,
    currentSource: state.recorder.currentSource,
    lastAddedClip: state.recorder.lastAddedClip,
    previewClip: state.recorder.previewClip,
    clipCount: state.recorder.clipCount,
    isLoaded: state.recorder.isLoaded,
    isPlaying: state.recorder.isPlaying,
    playRate: state.recorder.playRate,
    stepCount: state.recorder.stepCount,
    stepRate: state.recorder.stepRate,
  }
}

export default connect(mapStateToProps, { updateRecorderClock, updateClipsJson })(RecorderMonitor);
