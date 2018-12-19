import React, { Component } from 'react';
import '../assets/css/App.css';
import EditorComponent from './EditorComponent';
// import MonitorComponent from './MonitorComponent';
// import ClockComponent from './ClockComponent';

import PlayerMonitor from './PlayerMonitor';
import PlayerClock from './PlayerClock';

// import TestComponent from './TestComponent';

class App extends Component {

  // NEW RENDER
  render(){
    return(
      <div className='Editor'>
        <PlayerMonitor />
        <PlayerClock />
        <EditorComponent />
      </div>
    )
  }

  // TEST RENDER
  /*
  render(){
    return(
      <>
        <ClockComponent />
        <TestComponent />
      </>
    )
  }
  */

  // OLD RENDER
  /*
  render(){
    return(
      <div className='Editor'>
        <div id="monitors">
          <MonitorComponent />
          <MonitorComponent />
        </div>
        <div id="controls">
          <div className="flexy">
            <EditorComponent />
          </div>
        </div>
      </div>
    )
  }
  */
}

export default App;
