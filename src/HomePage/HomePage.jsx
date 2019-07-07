import React from 'react';

import {authenticationService, userService} from '@/_services';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      userFromApi: null
    };
  }

  componentDidMount() {
    const currentUser = authenticationService.currentUserValue;

    this.setState({
      currentUser: currentUser
    });

    userService.getById(currentUser._id).then(userFromApi => this.setState({userFromApi}));
  }

  render() {
    const {currentUser, userFromApi} = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>Your role is: <strong>{currentUser.role}</strong>.</p>
        <div>
          Current user from secure api end point:
          {userFromApi &&
          <ul>
            <li>{userFromApi.firstName} {userFromApi.lastName}</li>
          </ul>
          }
        </div>
      </div>
    );
  }
}

export {HomePage};