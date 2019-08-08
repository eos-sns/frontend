import React from 'react';
import { ErrorMessage, Field } from 'formik';

// todo show error
// todo show defaultValue
const ParameterInput = ({ _id, label, defaultValue }) => (
  <div className="form-group">
    <label htmlFor={_id}>{label}</label>
    <Field name={_id} type="text" className="form-control" />
    <ErrorMessage name="alphaEsc" component="div" className="invalid-feedback" />
  </div>
);

/* todo what are these ???
ParameterInput.propTypes = {
  type: PropTypes.string,
  _id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}; */

export { ParameterInput };
