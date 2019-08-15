import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer,
} from '@/_components/parameter';
import { CheckboxContainer } from '@/_components/checkbox';

// todo validationSchema
class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    const { onSubmit, isSubmitting } = props;

    this.state = {
      alphaEsc: [-1.0, 0.5],
      alphaStar: [-0.4],
      fEsc10: [0.1],
      fStar10: [0.0, 0.2],
      lX: [38, 42],
      mTurn: [8, 10],
      tStar: [0.1, 1],
      sigma8: [200, 300],
      xRaySpecIndex: [0.1, 1.5],
      files: [false, false],
      isSubmitting,
      onSubmit,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (key, val) => {
    this.state[key] = val;
  };

  handleCheckboxChange = (data) => {
    this.state.files = data;
  };

  handleSubmit(event) {
    const {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8,
      xRaySpecIndex, files, onSubmit,
    } = this.state; // get data
    const params = {
      alphaEsc,
      alphaStar,
      fEsc10,
      fStar10,
      lX,
      mTurn,
      tStar,
      sigma8,
      xRaySpecIndex,
    };
    const dataToSubmit = {
      params, files,
    }; // format data
    event.preventDefault(); // DO NOT RELOAD page
    onSubmit(dataToSubmit); // submit data
  }

  render() {
    const { title, isSubmitting } = this.props;
    const {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8,
      xRaySpecIndex, files,
    } = this.state;

    const ParameterInputs = () => (
      <div>
        <h3>
          {title}
        </h3>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[-1.0, 0.5]}
            sliderValues={alphaEsc}
            label={'\\alpha \\, Esc'}
            description={'a<br>b'}
            onChange={(x) => {
              this.handleChange('alphaEsc', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[-0.5, 1.0]}
            sliderValues={alphaStar}
            label={'\\alpha \\, Star'}
            description="..."
            onChange={(x) => {
              this.handleChange('alphaStar', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[0.0, 0.5]}
            sliderValues={fEsc10}
            label="fEsc10"
            description="..."
            onChange={(x) => {
              this.handleChange('fEsc10', x);
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[0.0, 0.2]}
            sliderValues={fStar10}
            label="fStar10"
            description="..."
            onChange={(x) => {
              this.handleChange('fStar10', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[38, 42]}
            sliderValues={lX}
            label="lX"
            description="..."
            onChange={(x) => {
              this.handleChange('lX', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[8, 10]}
            sliderValues={mTurn}
            label="mTurn"
            description="..."
            onChange={(x) => {
              this.handleChange('mTurn', x);
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[0.1, 1]}
            sliderValues={tStar}
            label="tStar"
            description="..."
            onChange={(x) => {
              this.handleChange('tStar', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[200, 300]}
            sliderValues={sigma8}
            label="sigma8"
            description="..."
            onChange={(x) => {
              this.handleChange('sigma8', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[0.1, 1.5]}
            sliderValues={xRaySpecIndex}
            label="xRaySpecIndex"
            description="..."
            onChange={(x) => {
              this.handleChange('xRaySpecIndex', x);
            }}
          />
        </div>
      </div>
    );

    // todo labels
    const FilesCheckboxes = () => (
      <CheckboxContainer
        title="Download files"
        labels={[
          'coeval_kZ', 'coeval_PS_z',
        ]}
        checks={files}
        onChange={this.handleCheckboxChange}
      />
    );

    const SubmitButton = () => (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        Download
      </button>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <ParameterInputs />
        <FilesCheckboxes />
        {<br />}
        <SubmitButton />
      </form>
    );
  }
}

export { SearchForm };
