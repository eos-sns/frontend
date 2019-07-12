import React from 'react';
import {NumericSlider} from "../slider";

class ParameterInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const {sliderDomain, sliderValues, label, onChange} = props;

    this.state = {
      sliderDomain,
      sliderValues,
      label,
      onChange
    };
  }

  render() {
    const {sliderDomain, sliderValues, label, onChange} = this.state;

    return (
      <React.Fragment>
        <div>
          <h4>{label}</h4>
          <NumericSlider
            domain={sliderDomain}
            defaultValues={sliderValues}
            onChange={onChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export {ParameterInputContainer};