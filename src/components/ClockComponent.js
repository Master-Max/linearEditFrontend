import React from 'react';
import { connect } from 'react-redux';

function formatTime( time = 0 ){
  // '00:00:00.000' <-- Format I'm going for
  let r = {
    h: '00',
    m: '00',
    s: '00',
    ms: '000',
  }

  r.ms = (time % 1).toFixed(3).substring(2);

  let t = Math.round(time)

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

const ClockComponent = ({ time }) => {
  return (
    <div className="clock">
      {formatTime(time)}
    </div>
  )
}

function mapStateToProps(state) {

  // DID NOT WORK
  /*
  if(this.props.monitor == "player") {
    return {time: state.clock.playerTime}
  } else
  if(this.props.monitor == "recorder") {
    return {time: state.clock.recorderTime}
  }
  */

  // OLD RETURN
  // /*
  return {
    time: state.clock.time
  }
  // */
}

export default connect(mapStateToProps)(ClockComponent);
