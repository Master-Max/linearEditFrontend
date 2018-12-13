import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  monitorRack = () => (
    <div id="monitors">
      <canvas ref="player-monitor" width={640} height={360} />
      <canvas ref="recorder-monitor" width={640} height={360} />
    </div>
  )

  playerControls = () => (
    <div id="player">
      <p>PLAYER</p>
      <div class="row right-justify">
        <b class="light">IN</b>
        <b class="light">OUT</b>
      </div>
      <div class="clock">00:00:00</div>
      <div class="center-div">
        <div class="row">
          <b class="switch blue-button">EJECT</b>
          <b class="switch blue-button">LOAD</b>
        </div>
      </div>
      <br/>
      <div class="center-div">
        <div class="row">
          <b class="switch">PLAY</b>
          <b class="switch">STILL</b>
          <b class="switch">REW</b>
          <b class="switch">FF</b>
        </div>
      </div>
      <br/>
      <div id="jogger" class="center-div">
        <div class="center-div">
          <b class="light">JOG</b>
        </div>
        <div class="row">
          <b class="switch">{'<'}</b>
          <b class="switch">{'>'}</b>
        </div>
      </div>
    </div>
  )

  editControls = () => (
    <div id="editor">
      <div id="main-edit">
        <div class="part-box">
          <div id="trim" class="center-div">
            <div class="row"><div>
              <div class="row">
                <b class="switch">+</b>
                <b class="switch">-</b>
              </div>
              <p>TRIM</p>
            </div></div>
          </div>
        </div>
        <div id="timecode" class="part-box">
          <div class="row">
            <div>
              <div class="row">
                <b class="switch">IN</b>
                <b class="switch">OUT</b>
              </div>
              <p>PLAYER</p>
            </div>
            <b class="switch grey-button">GO TO</b>
              <div>
                <div class="row">
                  <b class="switch">IN</b>
                  <b class="switch">OUT</b>
                </div>
                <p>RECORDER</p>
              </div>
          </div>
        <div class="row">
          <b class="switch switch-big grey-button">ENTRY</b>
        </div>
      </div>
      </div>
      <div id="render">
        <div class="row">
          <b class="switch switch-med">PREVIEW</b>
          <b class="switch switch-med red-button">AUTO EDIT</b>
        </div>
      </div>
    </div>
  )

  recorderControls = () => (
    <div id="recorder">
      <p>RECORDER</p>
      <div class="row right-justify">
        <b class="light">IN</b>
        <b class="light">OUT</b>
      </div>
      <div class="clock">00:00:00</div>
      <div class="center-div">
        <div class="row">
          <b class="switch blue-button">EJECT</b>
          <b class="switch red-button">REC</b>
        </div>
      </div>
      <br/>
      <div class="center-div">
        <div class="row">
          <b class="switch">PLAY</b>
          <b class="switch">STILL</b>
          <b class="switch">REW</b>
          <b class="switch">FF</b>
        </div>
      </div>
      <br/>
      <div id="jogger" class="center-div">
        <div class="center-div">
          <b class="light">JOG</b>
        </div>
        <div class="row">
          <b class="switch">{'<'}</b>
          <b class="switch">{'>'}</b>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div className="App">

        {this.monitorRack()}
        <div id="controls">
          <div class="flexy">
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
