import * as types from './actionTypes';
import * as projectApi from '../api/projectApi';

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function createProjectSuccess(project) {
  return { type: types.CREATE_PROJECT_SUCCESS, project };
}

export function updateProjectSuccess(project) {
  return { type: types.UPDATE_PROJECT_SUCCESS, project };
}

export function loadProjects() {
  return function (dispatch) {
    return projectApi
      .getProjects()
      .then((projects) => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveProject(project) {
  return function (dispatch) {
    return projectApi
      .saveProject(project)
      .then((savedproject) => {
        project.id
          ? dispatch(updateProjectSuccess(savedproject))
          : dispatch(createProjectSuccess(savedproject));
      })
      .catch((error) => {
        throw error;
      });
  };
}
