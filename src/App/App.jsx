import React from 'react';
import {Link, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {history, Role} from '../_helpers';
import {userModel, userService} from '@/_services';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {AdminPage} from '@/AdminPage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen(() => {
      dispatch(alertActions.clear()); // clear alert on location change
    });

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  static logout() {
    userService.logout();
    history.push('/login');
  }

  componentDidMount() {
    userModel.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin
    }));
  }

  render() {
    const {currentUser, isAdmin} = this.state;
    const {alert} = this.props;
    return (
      <Router history={history}>
        <div>
          {currentUser &&
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">Home</Link>
              {isAdmin &&
              <Link to="/admin" className="nav-item nav-link">Admin</Link>}
              <a onClick={App.logout}
                 className="nav-item nav-link">Logout</a>
            </div>
          </nav>
          }
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                {alert.message &&
                <div
                  className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute path="/admin" roles={[Role.Admin]}
                              component={AdminPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};