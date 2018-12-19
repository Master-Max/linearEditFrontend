import { UPDATE_PLAYER_CLOCK } from './types';
import { UPDATE_PLAYER_SOURCE, UPDATE_PLAYER_ISPLAYING, UPDATE_PLAYER_PLAYRATE, UPDATE_PLAYER_JOGSTEP } from './types';
import { UPDATE_RECORDER_CLOCK } from './types';

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


/// RECORDER ACTIONS
export function updateRecorderClock( time ){
  return {
    type: UPDATE_RECORDER_CLOCK,
    payload: time
  }
}
