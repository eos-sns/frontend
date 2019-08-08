import React from 'react';
import {Handles, Rail, Slider, Tracks,} from 'react-compound-slider';
import Ticks from 'react-compound-slider/Ticks/Ticks';
import {Handle, SliderRail, Tick, Track,} from '.';
import {NumberInputContainer} from '@/_components/inputs';

const SLIDER_STYLE = {
  position: 'relative',
  width: '95%',
  touchAction: 'none',
};
const DIV_STYLE = {
  height: 150, width: '100%',
};

class RangeNumericSlider extends React.Component {
  sendDataToParent = () => {
    const {onChange, values} = this.state;
    onChange(values);
  };

  onSliderUpdate = (update) => {
    this.setState({
      update,
    });
  };

  onSliderChange = (values) => {
    this.setState({
      values,
    });
  };

  // todo index should be an arg
  onNumericInput0Change = (valueAsNumber, valueAsString, inputElement) => {
    // todo try parse `valueAsString`
    const {values} = this.state;
    const newValues = [valueAsNumber, values[1]];
    this.setState({
      values: newValues.slice(),
      update: newValues.slice(),
    });
    this.forceUpdate();
  };

  onNumericInput1Change = (valueAsNumber, valueAsString, inputElement) => {
    // todo try parse `valueAsString`
    const {values} = this.state;
    const newValues = [values[0], valueAsNumber];
    this.setState({
      values: newValues.slice(),
      update: newValues.slice(),
    });
    this.forceUpdate();
    this.sendDataToParent();
  };

  constructor(props) {
    super(props);

    const {
      label, domain, defaultValues, onChange,
    } = props;

    this.state = {
      label,
      values: defaultValues.slice(),
      update: defaultValues.slice(),
      domain, // const
      onChange,
    };
  }

  render() {
    const {
      label, values, update, domain,
    } = this.state;
    this.sendDataToParent(); // update parent

    const NumberInputMin = () => (
      <NumberInputContainer
        label="min:"
        minValue={domain[0]}
        maxValue={domain[1]}
        value={update[0]}
        onChange={this.onNumericInput0Change}
        className="form-control"
      />
    );

    const NumberInputMax = () => (
      <NumberInputContainer
        label="max:"
        minValue={domain[0]}
        maxValue={domain[1]}
        value={update[1]}
        onChange={this.onNumericInput1Change}
        className="form-control"
      />
    );

    return (
      <div style={DIV_STYLE}>
        <p>{label}</p>
        <NumberInputMin/>
        <NumberInputMax/>
        {<br/>}
        <Slider
          mode={1}
          step={1}
          domain={domain}
          reversed={false}
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
          <Tracks left={false} right={false}>
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
          <Ticks count={10}>
            {({ticks}) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length}/>
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export {RangeNumericSlider};
