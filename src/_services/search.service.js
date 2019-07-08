import config from 'config';
import {handleResponse} from '../_helpers';
import {headers} from './headers';

export const searchService = {
  postSearch,
};

function postSearch(searchParams) {
  const requestOptions = {
    method: 'POST',
    headers: headers._getDefaultHeaders(),
    body: JSON.stringify(searchParams)
  };

  return fetch(`${config.searchApiUrl}`, requestOptions).then(handleResponse);
}
