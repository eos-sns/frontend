import React from 'react';

import {userModel, userService} from '@/_services';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: userModel.currentUserValue,
      userFromApi: null
    };
  }

  componentDidMount() {
    const currentUser = userModel.currentUserValue;

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
          Current user:
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