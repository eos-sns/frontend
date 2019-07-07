import React from 'react';
import {userService} from '@/_services';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <h2>Login</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            /* todo firstName: '',
            lastName: '',*/
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
          })}
          onSubmit={({firstName, lastName, username, password}, {setStatus, setSubmitting}) => {
            setStatus();
            const newUser = {
              firstName,
              lastName,
              username,
              password
            };
            userService.register(newUser).then(
              () => {
                const {from} = this.props.location.state || {from: {pathname: "/"}};
                this.props.history.push(from);
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({errors, status, touched, registering}) => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">firstName</label>
                <Field name="firstName" type="text"
                       className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                <ErrorMessage name="firstName" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <Field name="lastName" type="text"
                       className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}/>
                <ErrorMessage name="lastName" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text"
                       className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                <ErrorMessage name="username" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password"
                       className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                <ErrorMessage name="password" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary"
                        disabled={registering}>Login
                </button>
                {registering &&
                <img
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                }
              </div>
              {status &&
              <div className={'alert alert-danger'}>{status}</div>
              }
            </Form>
          )}
        />
      </div>
    );
  }
}

export {RegisterPage};