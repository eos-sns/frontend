import React from 'react';
import Redirect from 'react-router-dom';
import queryString from 'query-string';

import { userService } from '@/_services';

class AuthorizeUserPage extends React.Component {
  constructor(props) {
    super(props);

    const parsed = queryString.parse(this.props.location.search);
    const userId = parsed.id;

    this.state = {
      userId,
      userFromApi: null,
    };

    this.authorizeUser = this.authorizeUser.bind(this);
  }

  componentDidMount() {
    const { userId } = this.state;

    userService.getById(userId)
      .then(userFromApi => this.setState({
        userFromApi,
      }));
  }

  authorizeUser() {
    const { userId } = this.state;

    userService.authorizeUser(userId).then(
      () => window.location.href = '/',
    ).catch(
      () => window.location.reload(),
    );
  }

  render() {
    const { userFromApi } = this.state;
    const SubmitButton = () => (
      <button
        type="submit"
        className="btn btn-primary"
        onClick={this.authorizeUser}
      >
        Authorize
      </button>
    );
    const AuthorizationForm = () => (
      <div>
        <h1>Authorize new user</h1>
        <ul>
          <li>
            <strong>First name: </strong>
            {userFromApi.firstName}
          </li>
          <li>
            <strong>Last name: </strong>
            {userFromApi.lastName}
          </li>
          <li>
            <strong>Username: </strong>
            {userFromApi.username}
          </li>
          <li>
            <strong>Email: </strong>
            {userFromApi.email}
          </li>
        </ul>
        <SubmitButton />
      </div>
    );
    const ErrorForm = () => (
      <div>
        <h2>User already authorized</h2>
      </div>
    );

    return (
      userFromApi && !userFromApi.authorized
        ? (
          <AuthorizationForm />
        ) : (
          <ErrorForm />
        )
    );
  }
}

export { AuthorizeUserPage };
