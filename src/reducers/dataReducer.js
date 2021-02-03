import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.data, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      var projectsData = { ...state.projectsData };
      projectsData.hasLoaded = true;
      return { ...state, projectsData: projectsData };
    default:
      return state;
  }
}
