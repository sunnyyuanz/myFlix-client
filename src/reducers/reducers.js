import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/action';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached')
      return action.value;
    default:
      return state;
  }
}

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//   };
// }

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;
