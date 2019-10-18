import React from 'react';

import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { userModel, userService } from '@/_services';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userFromApi: null,
      currentUser: userModel.currentUserValue,
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
    const { currentUser, userFromApi } = this.state;
    const EditDetailsForm = () => (
      <div className="col-md-6 col-md-offset-3">
        <h2>Edit your data</h2>
        <Formik
          initialValues={{
            firstName: userFromApi.firstName,
            lastName: userFromApi.lastName,
            username: userFromApi.username,
            email: userFromApi.email,
            password: ''
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required'),
          })}
          onSubmit={({
            firstName, lastName, username, email, password,
          }, { setStatus, setSubmitting }) => {
            setStatus();
            const newUser = {
              firstName,
              lastName,
              username,
              email,
              password,
            };
            userService.update(currentUser._id, newUser).then(
              () => {
                setSubmitting(false);
                window.location.reload();
              },
              (error) => {
                setSubmitting(false);
                setStatus(error);
              },
            );
          }}
          render={({
            errors, status, touched, isSubmitting,
          }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <Field
                  name="firstName"
                  type="text"
                  className={`form-control${errors.firstName && touched.firstName ? ' is-invalid' : ''}`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <Field
                  name="lastName"
                  type="text"
                  className={`form-control${errors.lastName && touched.lastName ? ' is-invalid' : ''}`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Type for new password"
                  className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Edit
                </button>
                {isSubmitting
                && (
                  <img
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                )
                }
              </div>
              {status
              && <div className="alert alert-danger">{status}</div>
              }
            </Form>
          )}
        />
      </div>
    );

    const NotGrantedComponent = () => (
      <h2>
        Sorry, you've NOT been granted editing access
      </h2>
    );

    return (
      <div>
        {userFromApi ? (
          <EditDetailsForm />
        ) : (
          <NotGrantedComponent />
        ) }
      </div>
    );
  }
}

export { UserPage };
