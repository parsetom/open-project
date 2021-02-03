// Set up your root reducer here...
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import projects from './projectReducer';
import data from './dataReducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    projects,
    data,
  });

export default rootReducer;
