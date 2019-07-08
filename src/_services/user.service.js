import config from 'config';
import {authHeader, handleResponse} from '../_helpers';
import {userModel} from './user.model';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  /* todo delete: _delete, */
};

function _getDefaultHeaders() {
  return {'Content-Type': 'application/json'}
}

function _getAuthHeaders() {
  return {...authHeader(), ..._getDefaultHeaders()}
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  };

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
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
    headers: _getAuthHeaders(),
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {method: 'GET', headers: _getAuthHeaders()};
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {method: 'GET', headers: _getAuthHeaders()};
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: _getAuthHeaders(),
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

/*function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: _getAuthHeaders()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}*/
