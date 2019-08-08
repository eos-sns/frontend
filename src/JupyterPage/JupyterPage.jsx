import React from 'react';

import config from 'config';
import { userModel, userService } from '@/_services';
import { ReactRedirect } from '@/_components';

class JupyterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: userModel.currentUserValue,
      userFromApi: null,
    };
  }

  componentDidMount() {
    const currentUser = userModel.currentUserValue;

    this.setState({
      currentUser,
    });

    userService.getById(currentUser._id).then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const { userFromApi } = this.state;
    const JupyterFrame = () => (
      <ReactRedirect src={config.jupyterUrl} />
    );

    const NotGrantedComponent = () => (
      <h2>
Sorry, you've NOT been granted
      JupyterHub access
      </h2>
    );

    return (
      <div>
        <h1>JupyterNotebook</h1>
        <div>
          {userFromApi && userFromApi.granted
            ? (<JupyterFrame />) : (<NotGrantedComponent />)
          }
        </div>
      </div>
    );
  }
}

export { JupyterPage };
