import { MSG_SOMETHING_WENT_WRONG } from '../../constants';
import { MSG_INCORRECT_LOGIN } from '../../features/login/constants';
import {
  NOTIF_LOADING,
  NOTIF_LOADING_LONGER,
  NOTIF_TYPE_ERROR,
  NOTIF_TYPE_INFO,
  NOTIF_TYPE_LOADING,
  NOTIF_TYPE_LONG,
  NOTIF_TYPE_SUCCESS,
} from './constants';

export type LoadingMsg = typeof NOTIF_LOADING | typeof NOTIF_LOADING_LONGER;

export type ErrorMsg = typeof MSG_SOMETHING_WENT_WRONG | typeof MSG_INCORRECT_LOGIN | string;

export type NotifMessage = LoadingMsg | ErrorMsg | null;

export type NotifType =
  | typeof NOTIF_TYPE_SUCCESS
  | typeof NOTIF_TYPE_ERROR
  | typeof NOTIF_TYPE_LOADING
  | typeof NOTIF_TYPE_INFO
  | typeof NOTIF_TYPE_LONG;
