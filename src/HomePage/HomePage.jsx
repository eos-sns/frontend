import React from 'react';

import {userModel, userService} from '@/_services';
import Link from "react-router-dom/es/Link";

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
    return (
      <div>
        <h1>Home</h1>
        <p>Todo description of usage</p>
        <div>
          Go to the <Link to="/download">download form</Link> or to your <Link
          to="/jupyter">interactive JupyterNotebook</Link>
        </div>
      </div>
    );
  }
}

export {HomePage};