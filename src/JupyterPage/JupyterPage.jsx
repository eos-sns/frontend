import React from 'react';

import {userModel, userService} from '@/_services';

class JupyterPage extends React.Component {
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
    return (
      <div>
        <h1>JupyterNotebook</h1>
        <p>Todo description of usage</p>
        <div>
          todo iframe
        </div>
      </div>
    );
  }
}

export {JupyterPage};