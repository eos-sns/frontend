import React from 'react';
import {NumericSlider} from "../slider";

class ParameterInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const {sliderDomain, sliderValues, label, field} = props;
    const value = sliderValues[0];  // formik

    this.state = {
      sliderDomain,
      sliderValues,
      label,
      value
    };
  }

  render() {
    const {sliderDomain, sliderValues, label} = this.state;

    return (
      <React.Fragment>
        <div>
          <div>{label}</div>
          <NumericSlider
            domain={sliderDomain}
            defaultValues={sliderValues}
          />
        </div>
      </React.Fragment>
    );
  }
}

export {ParameterInputContainer};