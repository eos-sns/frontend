import React from 'react';
import {Route} from 'react-router-dom'

class ReactRedirect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nextUrl = this.props.src;
    return (
      <Route path='/jupyter' component={() => {
        window.location.href = nextUrl;
        return null;
      }}/>
    );
  }
}

export {ReactRedirect};
