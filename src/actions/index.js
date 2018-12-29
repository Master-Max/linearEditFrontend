import { UPDATE_PLAYER_CLOCK } from './types';
import { UPDATE_PLAYER_SOURCE, UPDATE_PLAYER_STREAM, UPDATE_PLAYER_ISPLAYING, UPDATE_PLAYER_PLAYRATE, UPDATE_PLAYER_JOGSTEP } from './types';
import { UPDATE_RECORDER_CLOCK } from './types';
import { ADD_RECORDER_SOURCE, UPDATE_RECORDER_SOURCE, UPDATE_RECORDER_ISLOADED, UPDATE_RECORDER_ISPLAYING, UPDATE_RECORDER_PLAYRATE, UPDATE_RECORDER_JOGSTEP, UPDATE_PREVIEW_CLIP } from './types';
// import * from './types';
import VideoAdapter from '../apis/VideoAdapter';

// PLAYER ACTIONS
export function updatePlayerClock( time ){
  return {
    type: UPDATE_PLAYER_CLOCK,
    payload: time
  }
}
export function updatePlayerSource( source ){
  return {
    type: UPDATE_PLAYER_SOURCE,
    payload: source
  }
}
export function updatePlayerStream( stream ){
  return {
    type: UPDATE_PLAYER_STREAM,
    payload: stream
  }
}
export function updatePlayerIsPlaying( playing ){
  return {
    type: UPDATE_PLAYER_ISPLAYING,
    payload: playing
  }
}
export function updatePlayerPlayRate( rate ){
  return {
    type: UPDATE_PLAYER_PLAYRATE,
    payload: rate
  }
}
export function updatePlayerJogStep( step ){
  return {
    type: UPDATE_PLAYER_JOGSTEP,
    payload: step
  }
}
/// RECORDER ACTIONS
export function updateRecorderClock( time ){
  return {
    type: UPDATE_RECORDER_CLOCK,
    payload: time
  }
}
export function addRecorderSource( source ){
  return {
    type: ADD_RECORDER_SOURCE,
    payload: source
  }
}
export function updateRecorderSource( source ) {
  return {
    type: UPDATE_RECORDER_SOURCE,
    payload: source
  }
}
export function updateRecorderIsLoaded( loaded ){
  return {
    type: UPDATE_RECORDER_ISLOADED,
    payload: loaded
  }
}
export function updateRecorderIsPlaying( playing ){
  return {
    type: UPDATE_RECORDER_ISPLAYING,
    payload: playing
  }
}
export function updateRecorderPlayRate( rate ){
  return {
    type: UPDATE_RECORDER_PLAYRATE,
    payload: rate
  }
}
export function updateRecorderJogStep( step ){
  return {
    type: UPDATE_RECORDER_JOGSTEP,
    payload: step
  }
}
export function updatePreviewClip( clip ){
  return {
    type: UPDATE_PREVIEW_CLIP,
    payload: clip
  }
}

/// API actions
export function postVideo(url){ // May Need to rename this
  return (dispatch) => {
    console.log('postVideo')
    dispatch(updatePlayerSource(url))
    dispatch({ type: 'POSTING_VIDEO' })
    if (url.includes('local')){
      dispatch(updatePlayerStream(url))
      dispatch({ type: 'POSTED_VIDEO' })
    }
    else {
      console.log(url, url.includes('local'))
      VideoAdapter.postVideo(url)
      .then(video => {
        console.log('Video: ', video);
        dispatch(updatePlayerStream(video.stream_url));
        dispatch({ type: 'POSTED_VIDEO' })
      })
    }
  }
}
export function assembleVideo(){

}

// TODO:

/*

So like i think i need to move the controlls i have set up for the edit controller
into there instead of using document.getElementById

Id just need functions in the player monitor compoenent that can be called.
Like how I set up the VideoAdapter on line 47

*/
