import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setNews(data) {
  return ({
    type: Action.SET_SET_OF_NEWS,
    data,
  });
}

export function loadNews() {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventId}/module/news/news/act/get_news`, config)
      .then(response => response.json())
      .then((data) => {
        if (!data.error) {
          dispatch(setNews(data.data));
        }
      });
  };
}

export function createNew(title, text) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/news/news/act/create_new`, config)
      .then(response => response.json())
      .then((json) => {
        if (!json.error) {
          dispatch(loadNews());
        }
      });
  };
}

export function updateNew(newId, title, text) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newId, title, text }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/news/news/act/update_new`, config)
      .then(response => response.json())
      .then((json) => {
        if (!json.error) {
          dispatch(loadNews());
        }
      });
  };
}
