import { handleResponse, handleError } from './apiUtils';
const baseAPIUrl = process.env.API_URL + '/projects/';

export function getProjects() {
  return fetch(baseAPIUrl).then(handleResponse).catch(handleError);
}

export function saveProject(project) {
  return fetch(baseAPIUrl + (project.id || ''), {
    method: project.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(project),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProject(projectId) {
  return fetch(baseAPIUrl + projectId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
