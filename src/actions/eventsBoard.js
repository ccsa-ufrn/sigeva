import fetch from 'isomorphic-fetch';
import * as Action from './constants';
import { application } from '../../config';

export function setEventsBoardContent(data) {
  return ({
    type: Action.SET_EVENTS_BOARD_CONTENT,
    data,
  });
}

export function didLoadEventsBoardWithError() {
  return ({
    type: Action.DID_LOAD_EVENTS_BOARD_WITH_ERROR,
  });
}

function loadEventsBoard() {
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${application.url}/api/event`, config)
    .then((response) => {
      return response.json();
    });
}

export function loadEventsBoardIfNeed() {
  return (dispatch, getState) => {
    if (getState().eventsBoard.loading === true) {
      loadEventsBoard()
        .then((json) => {
          if (!json.error) {
            dispatch(setEventsBoardContent(json.data));
          } else {
            dispatch(didLoadEventsBoardWithError());
          }
        }).catch(() => {
          dispatch(didLoadEventsBoardWithError());
        });
    }
  };
}
