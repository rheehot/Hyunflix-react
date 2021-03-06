import { all } from 'redux-saga/effects';

import auth from './auth';
import video from './video';
import music from './music';

export default function* rootSaga() {
  yield all([
    ...auth,
    ...video,
    ...music,
  ]);
}
