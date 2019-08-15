import React from 'react';
import {
  Handles, Rail, Slider, Tracks,
} from 'react-compound-slider';
import { Handle, SliderRail, Track } from '.';
import { NumberInputContainer } from '@/_components/inputs';

const SLIDER_STYLE = {
  position: 'relative',
  width: '95%',
  touchAction: 'none',
};
const DIV_STYLE = {
  height: 120,
  width: '100%',
};

class NumericSlider extends React.Component {
  sendDataToParent = () => {
    const { onChange, values } = this.state;
    onChange(values);
  };

  onNewValue = (newValue) => {
    this.setState({
      values: newValue, // to save value
      update: newValue, // to update slider
    });
  };

  onSliderUpdate = (update) => {
    this.setState({ update });
  };

  onSliderChange = (values) => {
    this.setState({ values });
  };

  onNumericInputChange = (valueAsNumber, valueAsString, inputElement) => {
    // todo try parse `valueAsString`
    const newValue = [valueAsNumber];
    this.onNewValue(newValue);
  };

  constructor(props) {
    super(props);

    const { domain, defaultValues, onChange } = props;

    this.state = {
      values: defaultValues.slice(),
      update: defaultValues.slice(),
      domain, // todo this is const
      onChange,
    };
  }

  render() {
    const { values, update, domain } = this.state;
    this.sendDataToParent(); // update parent

    const NumberInput = () => (
      <NumberInputContainer
        label="value:"
        minValue={domain[0]}
        maxValue={domain[1]}
        value={update[0]}
        onChange={this.onNumericInputChange}
        className="form-control"
      />
    );

    return (
      <div style={DIV_STYLE}>
        <NumberInput />
        {<br />}
        <Slider
          mode={1}
          step={0.1}
          domain={domain}
          rootStyle={SLIDER_STYLE}
          onUpdate={this.onSliderUpdate}
          onChange={this.onSliderChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    );
  }
}

export { NumericSlider };
