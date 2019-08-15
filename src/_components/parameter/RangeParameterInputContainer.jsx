import React from 'react';
import { RangeNumericSlider } from '../slider';
import {ParameterTitle} from "./ParameterTitle";

class RangeParameterInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const {
      sliderDomain, sliderValues, label, onChange,
    } = props;

    this.state = {
      sliderDomain,
      sliderValues,
      label,
      onChange,
    };
  }

  render() {
    const {
      sliderDomain, sliderValues, onChange,
    } = this.state;
    const { label, description } = this.props;

    return (
      <React.Fragment>
        <div>
          <ParameterTitle label={label} description={description} />
          <RangeNumericSlider
            domain={sliderDomain}
            defaultValues={sliderValues}
            onChange={onChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export { RangeParameterInputContainer };
