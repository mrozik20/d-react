export const USER_UPDATING = 'USER_UPDATING';

export function changeUserStatus(status) {
  return (dispatch, getState, { api }) => {
    // Dispatch update user status
    dispatch({
      type: USER_UPDATING,
    });

    api.postUserStatus(status).then(dispatch(updatedUserAction(status)));
  };
}