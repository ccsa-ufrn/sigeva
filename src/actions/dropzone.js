import fetch from 'isomorphic-fetch';
import { application } from '../../config';

export function sendFile(formData, fileRequirementId) {
  const config = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  };

  return fetch(`${application.url}/api/filerequirement/upload/${fileRequirementId}`, config)
    .then(resp => resp.json());
}

export function loadRequirement(fileRequirementId) {
  const config = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${application.url}/api/filerequirement/${fileRequirementId}`, config)
    .then(resp => resp.json());
}
