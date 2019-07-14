import React from 'react';

import {userModel, userService} from '@/_services';
import {ReactRedirect} from '@/_components';
import config from 'config';

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
    const {userFromApi} = this.state;
    console.log(config);
    const JupyterFrame = () => (
      <ReactRedirect src={config.jupyterUrl}/>
    );

    const NotGrantedComponent = () => {
      return <h2>Sorry, you've NOT been granted JupyterHub access</h2>
    };

    return (
      <div>
        <h1>JupyterNotebook</h1>
        <div>
          {userFromApi && userFromApi.granted
            ? (<JupyterFrame/>) : (<NotGrantedComponent/>)
          }
        </div>
      </div>
    );
  }
}

export {JupyterPage};