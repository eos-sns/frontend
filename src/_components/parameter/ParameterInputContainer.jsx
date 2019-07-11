import React from 'react';
import {NumericSlider} from "../slider";

class ParameterInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const {sliderDomain, sliderValues, label} = props;

    this.state = {
      sliderDomain,
      sliderValues,
      label
    };
  }

  render() {
    const {sliderDomain, sliderValues, label} = this.state;

    return (
      <React.Fragment>
        <div>{label}</div>
        <NumericSlider
          domain={sliderDomain}
          defaultValues={sliderValues}
        />
      </React.Fragment>
    );
  }
}

export {ParameterInputContainer};