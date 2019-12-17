export const CHANGE_ACTIVE_VIEW = 'views:change'

export const changeActiveView = view => {
  return {
    type: CHANGE_ACTIVE_VIEW,
    payload: {
      view,
    },
  }
};