import React from 'react';
import {Handles, Rail, Slider, Tracks} from "react-compound-slider";
import {Handle, SliderRail, Track} from "@/_components/Sliders";
import NumericInput from 'react-numeric-input';

const SLIDER_STYLE = {
  position: 'relative',
  width: '100%',
  touchAction: 'none',
};
const DIV_STYLE = {
  height: 120, width: '100%'
};

class NumericSlider extends React.Component {
  onSliderUpdate = update => {
    this.setState({update})
  };
  onSliderChange = values => {
    this.setState({values})
  };
  onNumericInputChange = (valueAsNumber, valueAsString, inputElement) => {
    // todo try parse `valueAsString`
    const newValue = [valueAsNumber];
    this.setState({
      values: newValue,  // to save value
      update: newValue  // to update slider
    });
  };

  constructor(props) {
    super(props);

    // const { domain, defaultValues } = { props };
    const domain = [100, 500];  // todo get from props
    const defaultValues = [150];

    this.state = {
      values: defaultValues.slice(),
      update: defaultValues.slice(),
      domain: domain  // todo this is const
    }
  }

  render() {
    const {values, update, domain} = this.state;

    const NumberInput = () => (
      <NumericInput
        min={domain[0]}
        max={domain[1]}
        value={update[0]}
        onChange={this.onNumericInputChange}
        className="form-control"
      />
    );

    return (
      <div style={DIV_STYLE}>
        <NumberInput/>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={SLIDER_STYLE}
          onUpdate={this.onSliderUpdate}
          onChange={this.onSliderChange}
          values={values}
        >
          <Rail>
            {({getRailProps}) => <SliderRail getRailProps={getRailProps}/>}
          </Rail>
          <Handles>
            {({handles, getHandleProps}) => (
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
            {({tracks, getTrackProps}) => (
              <div className="slider-tracks">
                {tracks.map(({id, source, target}) => (
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
    )
  }
}

export {NumericSlider};
