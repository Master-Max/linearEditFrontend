import React from 'react';
import EditorComponent from './EditorComponent';
import PlayerMonitor from './PlayerMonitor';
import RecorderMonitor from './RecorderMonitor';

const EditPage = () => {
  return (
    <div className='Editor'>
      <div id="monitors">
        <PlayerMonitor />
        <RecorderMonitor />
      </div>
      <div id="controls">
        <div className="flexy">
          <EditorComponent />
        </div>
      </div>
    </div>
  )
}

export default EditPage;
