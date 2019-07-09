import config from 'config';
import {handleResponse} from '../_helpers';
import {userModel} from './user.model';
import {headers} from './headers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: headers._getDefaultHeaders(),
    body: JSON.stringify({username, password})
  };

  return fetch(`${config.usersApiUrl}/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      userModel.currentUserSubject.next(user);
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  userModel.currentUserSubject.next(null);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: headers._getAuthHeaders(),
    body: JSON.stringify(user)
  };

  return fetch(`${config.usersApiUrl}/register`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {method: 'GET', headers: headers._getAuthHeaders()};
  return fetch(`${config.usersApiUrl}`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {method: 'GET', headers: headers._getAuthHeaders()};
  return fetch(`${config.usersApiUrl}/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: headers._getAuthHeaders(),
    body: JSON.stringify(user)
  };

  return fetch(`${config.usersApiUrl}/${user.id}`, requestOptions).then(handleResponse);
}
