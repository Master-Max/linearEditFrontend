import React, { Component } from 'react';
import '../assets/css/Editor.css';
import { connect } from 'react-redux';
import { updatePlayerSource, updatePlayerIsPlaying, updatePlayerPlayRate, updatePlayerJogStep } from '../actions'
import PlayerClock from './PlayerClock';
import RecorderClock from './RecorderClock';
import * as actions from '../actions'

class EditorComponent extends Component {

  postVideo = (url) => {
    this.props.postVideo(url);
  }

  handleClick = (button) => {
    console.log(button)
    switch (button) {
      case 'PC-PLAY':
        this.props.updatePlayerIsPlaying(true);
        this.props.updatePlayerPlayRate(1);
        this.props.updatePlayerJogStep(0);
        break;
      case 'PC-STILL':
        this.props.updatePlayerIsPlaying(false);
        this.props.updatePlayerJogStep(0);
        break;
      case 'PC-REWIND':
        this.props.updatePlayerIsPlaying(true);
        this.props.updatePlayerPlayRate(-4);
        break;
      case 'PC-FASTFORWARD':
        this.props.updatePlayerIsPlaying(true);
        this.props.updatePlayerPlayRate(4);
        break;
      case 'PC-LOAD':
        this.props.updatePlayerIsPlaying(false);
        const source = window.prompt("Enter New URL")
        if (!!source){
          console.log('New URL: ', source)
          this.postVideo(source);
        } else {
          window.alert("Invalid URL")
        }
        break;
      case 'PC-EJECT':
        this.props.updatePlayerIsPlaying(false);
        this.props.updatePlayerSource(null);
        break;
      case 'PC-DIAL-BACK':
        this.props.updatePlayerJogStep(-0.1);
        break;
      case 'PC-DIAL-FORWARD':
        this.props.updatePlayerJogStep(0.1);
        break;
      default:
        console.log('Uh Oh...');
    }
  }

  playerControls = () => (
    <div id="player">
      <p>PLAYER</p>
      <div className="row right-justify">
        <b className="light">IN</b>
        <b className="light">OUT</b>
      </div>
      <PlayerClock />
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
      <RecorderClock />
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
      <>
        {this.playerControls()}
        {this.editControls()}
        {this.recorderControls()}
      </>
    );
  }
}

export default connect(null, actions)(EditorComponent);


/********************************************************

NOTES:

I may want to move the clock into its own component
after all the other parts of the control board are just
buttons basically, the clock is the only part that's
being constantly updated.

If I don't I think that the entire EditorComponent will
be updated every time the clock is updated...

Which might not be a bad thing but it doesn't really
sound like a good thing so... yeah...


********************************************************/
