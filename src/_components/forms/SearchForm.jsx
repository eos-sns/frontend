import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer,
} from '@/_components/parameter';
import { CheckboxContainer } from '@/_components/checkbox';

// todo validationSchema
class SearchForm extends React.Component {
  handleChange = (key, val) => {
    this.state[key] = val;
  };

  handleCheckboxChange = (data) => {
    this.state.files = data;
  };

  constructor(props) {
    super(props);

    const { onSubmit, isSubmitting } = props;

    this.state = {
      alphaEsc: [200, 300],
      alphaStar: [500],
      fEsc10: [500],
      fStar10: [200, 300],
      lX: [200, 300],
      mTurn: [200, 300],
      tStar: [200, 300],
      sigma8: [200, 300],
      xRaySpecIndex: [200, 300],
      files: [false, false, false],
      isSubmitting,
      onSubmit,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        <h3>{title}</h3>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={alphaEsc}
            label={'\\alpha \\, Esc'}
            onChange={(x) => {
              this.handleChange('alphaEsc', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={alphaStar}
            label={'\\alpha \\, Star'}
            onChange={(x) => {
              this.handleChange('alphaStar', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={fEsc10}
            label="fEsc10"
            onChange={(x) => {
              this.handleChange('fEsc10', x);
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={fStar10}
            label="fStar10"
            onChange={(x) => {
              this.handleChange('fStar10', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={lX}
            label="lX"
            onChange={(x) => {
              this.handleChange('lX', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={mTurn}
            label="mTurn"
            onChange={(x) => {
              this.handleChange('mTurn', x);
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={tStar}
            label="tStar"
            onChange={(x) => {
              this.handleChange('tStar', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={sigma8}
            label="sigma8"
            onChange={(x) => {
              this.handleChange('sigma8', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={xRaySpecIndex}
            label="xRaySpecIndex"
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
