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
      alphaEsc: [-0.5],
      alphaStar: [0.5],
      fEsc10: [0.1],
      fStar10: [0.05],
      lX: [39, 41], // todo
      mTurn: [5], // * 10 ^ 8
      tStar: [0.5],
      sigma8: [200, 300], // todo
      xRaySpecIndex: [0.1, 1.5], // todo
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
          <ParameterInputContainer
            sliderDomain={[-1.0, 0.5]}
            sliderValues={alphaEsc}
            label={'\\alpha_{esc}'}
            description={'a<br>b'}
            onChange={(x) => {
              this.handleChange('alphaEsc', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[-0.5, 1.0]}
            sliderValues={alphaStar}
            label={'\\alpha_{*}'}
            description="..."
            onChange={(x) => {
              this.handleChange('alphaStar', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[0.001, 1]}
            sliderValues={fEsc10}
            label={'f_{esc,10}'}
            description="..."
            onChange={(x) => {
              this.handleChange('fEsc10', x);
            }}
          />
        </div>
        <div className="sameRow">
          <ParameterInputContainer
            sliderDomain={[0.001, 1]}
            sliderValues={fStar10}
            label={'f_{*,10}'}
            description="..."
            onChange={(x) => {
              this.handleChange('fStar10', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[38, 42]} // todo
            sliderValues={lX}
            label={'lX'}
            description="..."
            onChange={(x) => {
              this.handleChange('lX', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[1, 100]}
            sliderValues={mTurn}
            label={'M_{turn}'}
            description="..."
            onChange={(x) => {
              this.handleChange('mTurn', x);
            }}
          />
        </div>
        <div className="sameRow">
          <ParameterInputContainer
            sliderDomain={[0, 1]}
            sliderValues={tStar}
            label={'t_{*}'}
            description="..."
            onChange={(x) => {
              this.handleChange('tStar', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[200, 300]} // todo
            sliderValues={sigma8}
            label={'\\sigma_{8}'}
            description="..."
            onChange={(x) => {
              this.handleChange('sigma8', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[0.1, 1.5]} // todo
            sliderValues={xRaySpecIndex}
            label={'xRaySpecIndex'}
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
