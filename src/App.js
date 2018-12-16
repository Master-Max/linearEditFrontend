import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasComponent from './CanvasComponent.js'
class App extends Component {
  state = {
    playerVideoSrc: "http://localhost:4001/video",
    ready: false,
    videoPlaying: false,
    pcmTime: null
  }

  handleClick = (button) => {
    console.log(button)
    switch (button) {
      case 'PC-PLAY':
        this.setState({videoPlaying: true})
        break;
      case 'PC-STILL':
        this.setState({videoPlaying: false})
        break;
      case 'PC-LOAD':
        const newPlayerSource = prompt('Enter Video URL: ');
        if (!!newPlayerSource && newPlayerSource != "") {
          this.setState({playerVideoSrc: newPlayerSource})
        }
        break;
      case 'PC-REWIND':
        const pcm = document.getElementById("pc-monitor");

        break;
      case 'PC-FASTFORWARD':
        break;
      default:
        console.log('Uh Oh...');
    }
  }

  setPCMTime = (pcmTime) => {
    this.setState({pcmTime})
  }

  formatTime = (time) => {
    let fTime = new Date(null)
    fTime.setSeconds(time)
    return (fTime.toISOString().substr(11, 8))
  }

  monitorRack = () => (
    <div id="monitors">
      <CanvasComponent width={640} height={360} src={this.state.playerVideoSrc} play={this.state.videoPlaying} setTime={this.setPCMTime}/>
      <canvas ref="recorder-monitor" width={640} height={360} />
    </div>
  )
  //<video ref="video" src={this.state.playerVideoSrc} controls/>
  //<video id="player-video" className="" src={this.state.playerVideoSrc} controls={true} />
  //<canvas id="player-monitor" ref="player-monitor" width={640} height={360} />

  playerControls = () => (
    <div id="player">
      <p>PLAYER</p>
      <div className="row right-justify">
        <b className="light">IN</b>
        <b className="light">OUT</b>
      </div>
      <div className="clock">{this.formatTime(this.state.pcmTime)}</div>
      <div className="center-div">
        <div className="row">
          <b onClick={() => this.handleClick('PC-LOAD')} className="switch blue-button">LOAD</b>
          <b onClick={() => this.handleClick('PC-EJECT')} className="switch blue-button">EJECT</b>
        </div>
      </div>
      <br/>
      <div className="center-div">
        <div className="row">
          <b onClick={() => this.handleClick('PC-PLAY')} className="switch">PLAY</b>
          <b onClick={() => this.handleClick('PC-STILL')} className="switch">STILL</b>
          <b onClick={() => this.handleClick('PC-REWIND')} className="switch">REW</b>
          <b onClick={() => this.handleClick('PC-FASTFORWARD')} className="switch">FF</b>
        </div>
      </div>
      <br/>
      <div id="jogger" className="center-div">
        <div className="center-div">
          <b className="light">JOG</b>
        </div>
        <div className="row">
          <b onClick={() => this.handleClick('PC-DIAL-BACK')} className="switch">{'<'}</b>
          <b onClick={() => this.handleClick('PC-DIAL-FORWARD')} className="switch">{'>'}</b>
        </div>
      </div>
    </div>
  )

  editControls = () => (
    <div id="editor">
      <div id="main-edit">
        <div className="part-box">
          <div id="trim" className="center-div">
            <div className="row"><div>
              <div className="row">
                <b onClick={() => this.handleClick('EC-TRIM-MINUS')} className="switch">-</b>
                <b onClick={() => this.handleClick('EC-TRIM-PLUS')} className="switch">+</b>
              </div>
              <p>TRIM</p>
            </div></div>
          </div>
        </div>
        <div id="timecode" className="part-box">
          <div className="row">
            <div>
              <div className="row">
                <b onClick={() => this.handleClick('EC-PLAYER-IN')} className="switch">IN</b>
                <b onClick={() => this.handleClick('EC-PLAYER-OUT')} className="switch">OUT</b>
              </div>
              <p>PLAYER</p>
            </div>
            <b onClick={() => this.handleClick('EC-GOTO')} className="switch grey-button">GO TO</b>
              <div>
                <div className="row">
                  <b onClick={() => this.handleClick('EC-RECORDER-IN')} className="switch">IN</b>
                  <b onClick={() => this.handleClick('EC-RECORDER-OUT')} className="switch">OUT</b>
                </div>
                <p>RECORDER</p>
              </div>
          </div>
        <div className="row">
          <b onClick={() => this.handleClick('EC-ENTRY')} className="switch switch-big grey-button">ENTRY</b>
        </div>
      </div>
      </div>
      <div id="render">
        <div className="row">
          <b onClick={() => this.handleClick('EC-PREVIEW')} className="switch switch-med">PREVIEW</b>
          <b onClick={() => this.handleClick('EC-AUTO-EDIT')} className="switch switch-med red-button">AUTO EDIT</b>
        </div>
      </div>
    </div>
  )

  recorderControls = () => (
    <div id="recorder">
      <p>RECORDER</p>
      <div className="row right-justify">
        <b className="light">IN</b>
        <b className="light">OUT</b>
      </div>
      <div className="clock">00:00:00</div>
      <div className="center-div">
        <div className="row">
          <b onClick={() => this.handleClick('RC-RECORD')} className="switch red-button">REC</b>
          <b onClick={() => this.handleClick('RC-EXPORT')} className="switch blue-button">EXP</b>
        </div>
      </div>
      <br/>
      <div className="center-div">
        <div className="row">
          <b onClick={() => this.handleClick('RC-PLAY')} className="switch">PLAY</b>
          <b onClick={() => this.handleClick('RC-STILL')} className="switch">STILL</b>
          <b onClick={() => this.handleClick('RC-REWIND')} className="switch">REW</b>
          <b onClick={() => this.handleClick('RC-FASTFORWARD')} className="switch">FF</b>
        </div>
      </div>
      <br/>
      <div id="jogger" className="center-div">
        <div className="center-div">
          <b className="light">JOG</b>
        </div>
        <div className="row">
          <b onClick={() => this.handleClick('RC-DIAL-BACK')} className="switch">{'<'}</b>
          <b onClick={() => this.handleClick('RC-DIAL-FORWARD')} className="switch">{'>'}</b>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div className="App">

        {this.monitorRack()}
        <div id="controls">
          <div className="flexy">
            {this.playerControls()}
            {this.editControls()}
            {this.recorderControls()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
