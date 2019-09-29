import * as ActionTypes from './ActionTypes';

export const Feedback = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
        var feed = action.payload;
        return { ...state, feedback: state.feedback.concat(feed)};

    default:
      return state;
  }
};