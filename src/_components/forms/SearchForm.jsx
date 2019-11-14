import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer,
} from '@/_components/parameter';
import { CheckboxContainer } from '@/_components/checkbox';

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onSubmit, onChange, isSubmitting } = props;
    this.state = {
      alphaEsc: [-0.65, -0.35],
      alphaStar: [0.35, 0.65],
      fEsc10: [0.05, 0.15],
      fStar10: [0.05, 0.1],
      lX: [39, 41],
      mTurn: [4, 6], // * 10 ^ 8
      tStar: [0.35, 0.65],
      sigma8: [0.79, 0.81],
      xRaySpecIndex: [0.5, 1.0],
      files: [false, false, false, false, false, false, false],
      isSubmitting,
      onChange,
      onSubmit,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (key, val) => {
    this.state[key] = val;

    const { onChange } = this.state;
    onChange(this.getDataToSubmit());
  };

  handleCheckboxChange = (data) => {
    this.state.files = data;
  };

  getDataToSubmit = () => {
    const {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8,
      xRaySpecIndex, files,
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
    return {
      params, files,
    }; // format data
  };

  handleSubmit(event) {
    const { onSubmit } = this.state;

    event.preventDefault(); // DO NOT RELOAD page
    onSubmit(this.getDataToSubmit()); // submit data
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
          <RangeParameterInputContainer
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
          <RangeParameterInputContainer
            sliderDomain={[-0.5, 1.0]}
            sliderValues={alphaStar}
            label={'\\alpha_{*}'}
            description="The power-law scaling of f* with halo mass.<br />
            When making a mock 21-cm observation, we take a fiducial value 0.5"
            onChange={(x) => {
              this.handleChange('alphaStar', x);
            }}
          />
          <RangeParameterInputContainer
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
          <RangeParameterInputContainer
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
          <RangeParameterInputContainer
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
          <RangeParameterInputContainer
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
            sliderDomain={[0, 1.5]}
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

    const FilesCheckboxes = () => (
      <div>
        <CheckboxContainer
          title="Download files"
          labels={[
            '\\text{lightcone}', '\\text{density lightcone}', '\\text{luminosity function}', '\\text{global signal}', '\\text{neutral function}', '\\text{co-eval}_{PS}', '\\text{lightcone}_{PS}',
          ]}
          descriptions={[
            'rectangular cuboid of the 21cm brightness temperature offset from the CMB,<br />'
            + 'as a function of transverse comoving scales x and y, and comoving line-of-sight distance, z',
            'rectangular cuboid of the matter density contrast,<br />'
            + 'as a function of transverse comoving scales x and y, and comoving line-of-sight distance, z',
            'number density of galaxies as a function of UV magnitude, at various redshifts',
            'volume average of the 21cm brightness temperature offset from the CMB, as a function of redshift',
            'volume average of the hydrogen neutral fraction, as a function of redshift',
            '3D averaged 21cm power spectra, evaluated from outputs at a fixed redshift',
            '3D averaged 21cm power spectra, evaluated from lightcone segments',
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
        <FilesCheckboxes />
        {<br />}
        <SubmitButton />
      </form>
    );
  }
}

export { SearchForm };
