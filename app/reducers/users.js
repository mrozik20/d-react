/*
  eslint-disable
    import/no-extraneous-dependencies,
    import/no-unresolved,
    import/extensions,
*/
import { fromJS } from 'immutable';
import config from 'app-config';
import {
  USERS_LOADED,
  USER_LOADED,
  USER_UPDATED,
  USER_PREFERENCE_SET,
} from '../actions/user_actions';

const initialUsersState = fromJS({
  auth: config.auth,
  authed_user: config.user,
});

export default (state = initialUsersState, action) => {
  switch (action.type) {
    case USERS_LOADED: {
      const myUserId = state.getIn(['auth', 'token', 'user_id']);
      let newState = action.payload.users.reduce(
        (memo, user) => memo.mergeDeepIn([user.id], user),
        state).set('loading', false);
      if (newState.get(myUserId)) {
        newState = newState.set('authed_user', newState.get(myUserId));
      }
      return newState;
    }
    case USER_LOADED:
      return state.mergeDeepIn([action.payload.user.id], action.payload.user);
    case USER_UPDATED: {
      let authUser = state.getIn(['authed_user']);
      authUser = authUser.set('is_online', action.payload.status).set('is_status_changed_automatic', action.payload.isAutomatic);
      const newState = state.set('authed_user', authUser).set(authUser.get('id'), authUser);
      return newState;
    }
    case USER_PREFERENCE_SET:
      return state.mergeDeepIn(['authed_user', 'preferences'], action.payload);
    default:
      return state;
  }
};
