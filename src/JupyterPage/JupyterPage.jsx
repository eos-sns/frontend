import React from 'react';

import {userModel, userService} from '@/_services';
import {ReactIFrame} from '@/_components';

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
    const JupyterFrame = () => (
      <ReactIFrame src={"//localhost:8811"}/>
    );

    return (
      <div>
        <h1>JupyterNotebook</h1>
        <div>
          {userFromApi && userFromApi.granted
            ? (
              <JupyterFrame/>
            )
            : (<h2>Sorry, you've NOT been granted JupyterHub access</h2>)
          }
        </div>
      </div>
    );
  }
}

export {JupyterPage};