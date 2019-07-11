import React from 'react';

import {searchService} from '@/_services';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
  ParameterInputContainer,
  RangeParameterInputContainer
} from "@/_components";

class DownloadPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // todo validationSchema
  render() {
    return (
      <div>
        <RangeParameterInputContainer
          sliderDomain={[100, 600]}
          sliderValues={[200, 300]}
          label={"wow"}
        />

        <ParameterInputContainer
          sliderDomain={[300, 900]}
          sliderValues={[500]}
          label={"wow 1"}
        />

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
            (values, {setStatus, setSubmitting}) => {
              searchService.postSearch(values).then(
                (res) => {
                  setSubmitting(false);
                  console.log(res);
                  // todo show success
              },
              error => {
                setSubmitting(false);
                setStatus({msg: error.toString()});
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
                        disabled={isSubmitting}>Download
                </button>
                {isSubmitting &&
                <img
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                }
              </div>
              {status && status.msg &&
              <div className={'alert alert-danger'}>{status.msg}</div>
              }
            </Form>
          )}
        />
      </div>
    );
  }
}

export {DownloadPage};