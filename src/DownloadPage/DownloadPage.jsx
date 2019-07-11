import React from 'react';

import {searchService} from '@/_services';
import {Field, Form, Formik} from "formik";
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
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"alphaEsc"}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={[500]}
            label={"alphaStar"}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={[500]}
            label={"fEsc10"}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"fStar10"}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"lX"}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"mTurn"}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"tStar"}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"sigma8"}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"xRaySpecIndex"}
          />
        </div>

        <Formik
          initialValues={{
            alphaEsc: ''
          }}
          onSubmit={
            (values, {setStatus, setSubmitting}) => {
              console.log(values);
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
                <Field
                  sliderDomain={[300, 900]}
                  sliderValues={[500]}
                  label={"alphaStar"}
                  name="alphaEsc"
                  component={ParameterInputContainer}
                />
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