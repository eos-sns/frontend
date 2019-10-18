import React from 'react';
import ReactTooltip from 'react-tooltip';
import { TeX } from '@/_components/labels';

class ParameterTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, description } = this.props;

    return (
      <div>
        <h4 data-tip={description} data-multiline>
          <TeX label={label} />
        </h4>
        <ReactTooltip place="top" type="dark" effect="float" multiline={true} />
      </div>
    );
  }
}

export { ParameterTitle };
