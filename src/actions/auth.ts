import { createAsyncAction, createAction } from 'typesafe-actions';

import { LoginParam, RegisterParam, LoginResult } from 'src/models';

export const loginAsync = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<LoginParam, LoginResult, string>();

export const registerAsync = createAsyncAction(
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
)<RegisterParam, LoginResult, string>();

export const logoutAction = createAction('LOGOUT')<undefined>();

export const reissueAccessTokenAction = createAsyncAction(
  'ACCESS_TOKEN_EXPIRE_REQUEST',
  'ACCESS_TOKEN_EXPIRE_SUCCESS',
  'ACCESS_TOKEN_EXPIRE_FAILURE',
)<string, string, string>();

export const refreshTokenExpireAction = createAction('REFRESH_TOKEN_EXPIRE')<undefined>();
