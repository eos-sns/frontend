import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer,
} from '@/_components/parameter';
import { CheckboxContainer } from '@/_components/checkbox';
import {NumbersLabel} from "@/_components/labels";

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
      lX: [39, 41],
      mTurn: [5], // * 10 ^ 8
      tStar: [0.5],
      sigma8: [0.80, 0.81],
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

    const Link2Paper = () => (
      <h6>
        For more information please take a look at
        {' '}
        <a href="https://arxiv.org/pdf/1809.08995.pdf">Park et al. 2019</a>
      </h6>
    );

    const ParameterInputs = () => (
      <div>
        <h3>
          {title}
        </h3>
        <Link2Paper />
        <div className="sameRow">
          <ParameterInputContainer
            sliderDomain={[-1.0, 0.5]}
            sliderValues={alphaEsc}
            label={'\\alpha_{esc}'}
            description="The power law scaling with halo mass.<br />
            We take a fiducial value of −0.5.<br />
            We expect it to be negative as SNe can more easily evacuate<br />
            low column density channels from shallower potential wells"
            onChange={(x) => {
              this.handleChange('alphaEsc', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[-0.5, 1.0]}
            sliderValues={alphaStar}
            label={'\\alpha_{*}'}
            description="The power-law scaling of f* with halo mass.<br />
            When making a mock 21-cm observation, we take a fiducial value 0.5"
            onChange={(x) => {
              this.handleChange('alphaStar', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[0.001, 1]}
            sliderValues={fEsc10}
            label={'f_{esc,10}'}
            description="The normalization of the ionizing UV escape fraction of high-z galaxies"
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
            description="The normalization  of  the  fraction of galactic gas in stars at high-z"
            onChange={(x) => {
              this.handleChange('fStar10', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[38, 42]}
            sliderValues={lX}
            label="lX"
            description="The normalization of the soft-band X-ray luminosity per unit star formation,<br />
            computed over the band E0 – 2 keV"
            onChange={(x) => {
              this.handleChange('lX', x);
            }}
          />
          <ParameterInputContainer
            sliderDomain={[1, 100]}
            sliderValues={mTurn}
            label={'M_{turn}'}
            description="The turnover halo mass below which the abundance of active star forming galaxies is exponentially suppressed"
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
            description="The star formation time-scale taken as a fraction of the Hubble time"
            onChange={(x) => {
              this.handleChange('tStar', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[0.78, 0.84]}
            sliderValues={sigma8}
            label={'\\sigma_{8}'}
            description="Standard deviation of the z = 0 linear matter field averaged over spheres of radius 8Mpc/h"
            onChange={(x) => {
              this.handleChange('sigma8', x);
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[0.1, 1.5]} // todo
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

    const EstimationLabels = () => (
        <div>
            <NumbersLabel
                label="Estimated number of simulations"
                number={45}
            />
            <NumbersLabel
                label="Estimated download size (Mb)"
                number={4.9}
            />
        </div>
    );

    const FilesCheckboxes = () => (
      <div>
          <CheckboxContainer
          title="Download files"
          labels={[
            'coeval_kZ', 'coeval_PS_z',
          ]}
          checks={files}
          onChange={this.handleCheckboxChange}
        />
      </div>
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
          {<br />}
          <EstimationLabels/>
          {<br />}
        <FilesCheckboxes />
        {<br />}
        <SubmitButton />
      </form>
    );
  }
}

export { SearchForm };
