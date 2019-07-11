import React from 'react';
import {RangeNumericSlider} from "../slider";

class RangeParameterInputContainer extends React.Component {
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
        <div>
          <div>{label}</div>
          <RangeNumericSlider
            domain={sliderDomain}
            defaultValues={sliderValues}
          />
        </div>
      </React.Fragment>
    );
  }
}

export {RangeParameterInputContainer};