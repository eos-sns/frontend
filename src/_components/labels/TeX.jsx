import React from 'react';
import {InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';

class TeX extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {label} = this.props;

    return (
      <React.Fragment>
        <InlineMath>{label}</InlineMath>
      </React.Fragment>
    );
  }
}

export {TeX};