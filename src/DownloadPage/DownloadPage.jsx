import React from 'react';

import {searchService} from '@/_services';
import {ErrorMessage, Field, Form, Formik} from "formik";

class DownloadPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // todo validationSchema
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            alphaEsc: '',
            alphaStar: '',
            fEsc10: '',
            fStar10: '',
            lX: '',
            mTurn: '',
            tStar: '',
            sigma8: '',
            xRaySpecIndex: ''
          }}
          onSubmit={
            ({alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8, xRaySpecIndex},
             {setStatus, setSubmitting}) => {
            setStatus();
              const searchParams = {
                alphaEsc,
                alphaStar,
                fEsc10,
                fStar10,
                lX,
                mTurn,
                tStar,
                sigma8,
                xRaySpecIndex
              };
              searchService.postSearch(...searchParams).then(
              () => {
                console.log('success');
                // todo show success
              },
              error => {
                console.log('error');
                // todo show error
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({errors, status, touched, isSubmitting}) => (
            <Form>
              <div className="form-group">
                <label htmlFor="alphaEsc">alphaEsc</label>
                <Field name="alphaEsc" type="text"
                       className={'form-control' + (errors.alphaEsc && touched.alphaEsc ? ' is-invalid' : '')}/>
                <ErrorMessage name="alphaEsc" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="alphaStar">alphaStar</label>
                <Field name="alphaStar" type="text"
                       className={'form-control' + (errors.alphaStar && touched.alphaStar ? ' is-invalid' : '')}/>
                <ErrorMessage name="alphaStar" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="fEsc10">fEsc10</label>
                <Field name="fEsc10" type="text"
                       className={'form-control' + (errors.fEsc10 && touched.fEsc10 ? ' is-invalid' : '')}/>
                <ErrorMessage name="fEsc10" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="fStar10">fStar10</label>
                <Field name="fStar10" type="text"
                       className={'form-control' + (errors.fStar10 && touched.fStar10 ? ' is-invalid' : '')}/>
                <ErrorMessage name="fStar10" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="lX">lX</label>
                <Field name="lX" type="text"
                       className={'form-control' + (errors.lX && touched.lX ? ' is-invalid' : '')}/>
                <ErrorMessage name="lX" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="mTurn">mTurn</label>
                <Field name="mTurn" type="text"
                       className={'form-control' + (errors.mTurn && touched.mTurn ? ' is-invalid' : '')}/>
                <ErrorMessage name="mTurn" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="tStar">tStar</label>
                <Field name="tStar" type="text"
                       className={'form-control' + (errors.tStar && touched.tStar ? ' is-invalid' : '')}/>
                <ErrorMessage name="tStar" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="sigma8">sigma8</label>
                <Field name="sigma8" type="text"
                       className={'form-control' + (errors.sigma8 && touched.sigma8 ? ' is-invalid' : '')}/>
                <ErrorMessage name="sigma8" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <label htmlFor="xRaySpecIndex">xRaySpecIndex</label>
                <Field name="xRaySpecIndex" type="text"
                       className={'form-control' + (errors.xRaySpecIndex && touched.xRaySpecIndex ? ' is-invalid' : '')}/>
                <ErrorMessage name="xRaySpecIndex" component="div"
                              className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary"
                        disabled={isSubmitting}>Search
                </button>
                {isSubmitting &&
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

export {DownloadPage};