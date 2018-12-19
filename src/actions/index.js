import { UPDATE_PLAYER_CLOCK } from './types';
import { UPDATE_PLAYER_SOURCE, UPDATE_PLAYER_ISPLAYING, UPDATE_PLAYER_PLAYRATE, UPDATE_PLAYER_JOGSTEP } from './types';
import { UPDATE_RECORDER_CLOCK } from './types';
import VideoAdapter from '../apis/VideoAdapter'

// PLAYER ACTIONS
export function updatePlayerClock( time ){
  return {
    type: UPDATE_PLAYER_CLOCK,
    payload: time
  }
}

export function updatePlayerSource( source ) {
  return {
    type: UPDATE_PLAYER_SOURCE,
    payload: source
  }
}

export function updatePlayerIsPlaying( playing ) {
  return {
    type: UPDATE_PLAYER_ISPLAYING,
    payload: playing
  }
}

export function updatePlayerPlayRate( rate ) {
  return {
    type: UPDATE_PLAYER_PLAYRATE,
    payload: rate
  }
}

export function updatePlayerJogStep( step ) {
  return {
    type: UPDATE_PLAYER_JOGSTEP,
    payload: step
  }
}

export function postVideo(url) { // May Need to rename this
  return (dispatch) => {
    console.log('postVideo')

    dispatch({ type: 'POSTING_VIDEO' })
    VideoAdapter.postVideo(url)
      .then(video => {
        console.log('Video: ', video);
        dispatch(updatePlayerSource(video.stream_url));
        dispatch({ type: 'POSTED_VIDEO' })
      })
  }
}

export function assembleVideo() {
  
}
/// RECORDER ACTIONS
export function updateRecorderClock( time ){
  return {
    type: UPDATE_RECORDER_CLOCK,
    payload: time
  }
}
