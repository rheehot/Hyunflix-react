import { combineReducers } from 'redux';
import { createReducer, StateType } from 'typesafe-actions';

import { windowResize } from 'src/actions';
import { MOBILE_BREAKPOINT } from 'src/config';

export const isMobile = createReducer(window.innerWidth <= MOBILE_BREAKPOINT as boolean)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth <= MOBILE_BREAKPOINT);

export const width = createReducer(window.innerWidth as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth);

export const height = createReducer(window.innerHeight as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerHeight);

const reducer = combineReducers({
  isMobile,
  width,
  height,
});

export default reducer;

export type AuthState = StateType<typeof reducer>;
