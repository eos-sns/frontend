import React from 'react';
import NumericInput from 'react-numeric-input';

class NumberInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const {
      label, minValue, maxValue, value, onChange,
    } = props;

    this.state = {
      label, minValue, maxValue, value, onChange,
    };
  }

  render() {
    const {
      label, minValue, maxValue, value, onChange,
    } = this.state;

    // todo inline
    return (
      <React.Fragment>
        <div className="sameRow">
          <p style={{ marginRight: '5%' }}>{label}</p>
          <NumericInput
            min={minValue}
            max={maxValue}
            value={value}
            onChange={onChange}
            className="form-control"
          />
        </div>
      </React.Fragment>
    );
  }
}

export { NumberInputContainer };
