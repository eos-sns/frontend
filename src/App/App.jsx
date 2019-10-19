import React from 'react';
import {
  Link, Route, Router, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { history, Role } from '@/_helpers';
import { userModel, userService } from '@/_services';
import { alertActions } from '@/_actions';
import { PrivateRoute } from '@/_components';

import { HomePage } from '@/HomePage';
import { DownloadPage } from '@/DownloadPage';
import { JupyterPage } from '@/JupyterPage';

import { AdminPage } from '@/AdminPage';
import { AuthorizeUserPage } from '@/AuthorizeUserPage';

import { LoginPage } from '@/LoginPage';
import { RegisterPage } from '@/RegisterPage';
import { UserPage } from '@/UserPage';
import { ForgotPasswordPage } from '@/ForgotPasswordPage';

class App extends React.Component {
  static logout() {
    userService.logout();
    history.push('/login');
  }

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      dispatch(alertActions.clear()); // clear alert on location change
    });

    this.state = {
      currentUser: null,
      isAdmin: false,
    };
  }

  componentDidMount() {
    userModel.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin,
    }));
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    const { alert } = this.props;
    const Footer = () => (
      <div className="footerContainer">
        ©&nbsp;
        <a href="mailto:eos.cosmosns@gmail.com">Cosmology Group at SNS</a>
.
        All Rights Reserved.
        Developed by&nbsp;
        <a href="https://github.com/sirfoga">Stefano Fogarollo</a>
.
        For any questions send email to
        <span>&nbsp;</span>
        <a href="mailto:eos.cosmosns[at]gmail.com">eos.cosmosns[at]gmail.com</a>
      </div>
    );

    return (
      <Router history={history}>
        <div>
          {currentUser
          && (
          <nav className="navbar navbar-expand navbar-dark bg-banner">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link nav-highlight">Home</Link>
              <Link to="/search" className="nav-item nav-link nav-highlight">Download</Link>
              <Link to="/jupyter" className="nav-item nav-link nav-highlight">Jupyter</Link>
              <Link to="/me" className="nav-item nav-link nav-highlight">Me</Link>
              {isAdmin
              && <Link to="/admin" className="nav-item nav-link nav-highlight">Admin</Link>}
              <a
                onClick={App.logout}
                className="nav-item nav-link nav-highlight"
              >
                Logout
              </a>
            </div>
          </nav>
          )
          }
          <div className="jumbotron">
            <div className="container">
              <div>
                {alert.message
                && (
                <div
                  className={`alert ${alert.type}`}
                >
                  {alert.message}
                </div>
                )
                }

                <Switch>
                  <PrivateRoute
                    exact
                    path="/jupyter"
                    roles={[Role.User, Role.Admin]} // has to be logged-in
                    component={JupyterPage}
                  />
                  <PrivateRoute
                    exact
                    path="/search"
                    roles={[Role.User, Role.Admin]} // has to be logged-in
                    component={DownloadPage}
                  />
                  <PrivateRoute
                    exact
                    path="/me"
                    roles={[Role.User, Role.Admin]} // has to be logged-in
                    component={UserPage}
                  />
                  <PrivateRoute
                    path="/admin"
                    roles={[Role.Admin]}
                    component={AdminPage}
                  />
                  <PrivateRoute
                    path="/authorize"
                    component={AuthorizeUserPage}
                    roles={[Role.Admin]}
                  />
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/forgotPassword" component={ForgotPasswordPage} />
                </Switch>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
