import React, { Component } from 'react';
import '../assets/css/Editor.css';
import { connect } from 'react-redux';
import PlayerClock from './PlayerClock';
import RecorderClock from './RecorderClock';
import * as actions from '../actions'
import Clip from '../clip.js'

class EditorComponent extends Component {

  state = {
    entry: 'none',
    pi: null,
    po: null,
    ri: null,
    ro: null,
  }

  postVideo = (url) => {
    this.props.postVideo(url);
  }

  handleClick = (button) => {
    console.log(button)
    // console.log(this.state)
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
      case 'EC-TRIM-MINUS':
        switch (this.state.entry) {
          case 'pi':
            this.setState({pi: this.state.pi - 0.017})
            break;
          case 'po':
            this.setState({po: this.state.po - 0.017})
            break;
          case 'ri':

            break;
          case 'po':

            break;
          default:

        }
        break;
      case 'EC-TRIM-PLUS':
        switch (this.state.entry) {
          case 'pi':
            this.setState({pi: this.state.pi + 0.017})
            break;
          case 'po':
            this.setState({po: this.state.po + 0.017})
            break;
          case 'ri':

            break;
          case 'po':

            break;
          default:

        }
        break;
      case 'EC-PLAYER-IN':
        if (this.state.entry === 'pi'){
          this.setState({entry: 'none'})
        } else {
          this.setState({entry: 'pi'})
        }
        break;
      case 'EC-PLAYER-OUT':
        if (this.state.entry === 'po'){
          this.setState({entry: 'none'})
        } else {
          this.setState({entry: 'po'})
        }
        break;
      case 'EC-GOTO':
        this.setState({entry: 'none'})
        switch (this.state.entry) {
          case 'pi':
            document.getElementById('pm').currentTime = this.state.pi
            break;
          case 'po':
            document.getElementById('pm').currentTime = this.state.po
            break;
          case 'ri':

            break;
          case 'po':

            break;
          default:

        }
        break;
      case 'EC-RECORDER-IN':
        break;
      case 'EC-RECORDER-OUT':
        break;
      case 'EC-ENTRY':
        this.setState({entry: 'none'})
        switch (this.state.entry){
          case 'pi':
            this.setState({pi: this.props.ptime})
            break;
          case 'po':
            this.setState({po: this.props.ptime})
            break;
          case 'ri':
            break;
          case 'ro':
            break;
        }
        break;
      case 'EC-PREVIEW':
        if (this.state.pi !== null, this.state.po !== null){
          if (this.props.rSources.length === 0){
            const dTime = this.state.po - this.state.pi;
            // console.log('pS: ', this.props.pSource);
            let clip = {
              sourceURL: this.props.pSource,
              streamURL: this.props.pStream,
              playerIN: this.state.pi,
              playerOUT: this.state.po,
              recorderIN: 0,
              recorderOUT: dTime,
            }
            const c = new Clip(clip);
            // this.props.addRecorderSource(c);
            this.props.updatePreviewClip(c);
          }
        }
        break;
      case 'EC-AUTO-EDIT':
        break;
      case 'RC-PLAY':
        this.props.updateRecorderIsPlaying(true);
        this.props.updateRecorderPlayRate(1);
        this.props.updateRecorderJogStep(0);
        break;
      case 'RC-STILL':
        this.props.updateRecorderIsPlaying(false);
        this.props.updateRecorderJogStep(0);
        break;
      case 'RC-REWIND':
        this.props.updateRecorderIsPlaying(true);
        this.props.updateRecorderPlayRate(-4);
        break;
      case 'RC-FASTFORWARD':
        this.props.updateRecorderIsPlaying(true);
        this.props.updateRecorderPlayRate(4);
        break;
      case 'RC-RECORD':
        console.log('RC RECORD NOT BUILD');
        break;
      case 'RC-EXPORT':
        console.log('RC EXPORT NOT BUILD');
        break;
      case 'RC-DIAL-BACK':
        this.props.updateRecorderJogStep(-0.1);
        break;
      case 'RC-DIAL-FORWARD':
        this.props.updateRecorderJogStep(0.1);
        break;
      default:
        console.log('Uh Oh...');
    }
  }

  playerControls = () => (
    <div id="player">
      <p>PLAYER</p>
      <div className="row right-justify">
        {this.state.entry === 'pi' ? <b className="light on">IN</b> : <b className={this.state.pi != null ? "light lock" : "light"}>IN</b>}
        {this.state.entry === 'po' ? <b className="light on">OUT</b> : <b className={this.state.po != null ? "light lock" : "light"}>OUT</b>}
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

function mapStateToProps(state) {
  return {
    ptime: state.playerClock.time,
    pSource: state.player.source,
    pStream: state.player.stream,
    rtime: state.recorderClock.time,
    rSources: state.recorder.sources,
  }
}

export default connect(mapStateToProps, actions)(EditorComponent);


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
