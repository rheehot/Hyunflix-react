import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { Music } from 'models';

export const musicListAsync = createAsyncAction(
  'MUSIC_LIST_REQUEST',
  'MUSIC_LIST_SUCCESS',
  'MUSIC_LIST_FAILURE'
)<undefined, Music[], string>();

export const musicPlaylistAdd = createStandardAction('MUSIC_PLAYLIST_ADD')<Music[]>();

export const musicNowPlayingChange = createStandardAction('MUSIC_NOW_PLAYING_CHANGE')<Music | null>();

export const musicRandomPlayToggle = createStandardAction('MUSIC_RANDOM_PLAY_TOGGLE')<undefined>();
export const musicLoopPlayToggle = createStandardAction('MUSIC_LOOP_PLAY_TOGGLE')<undefined>();