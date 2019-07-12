import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer
} from "@/_components/parameter";
import {CheckboxContainer} from "@/_components/checkbox";

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

    const {onSubmit, isSubmitting} = props;

    this.state = {
      alphaEsc: '',
      alphaStar: '',
      fEsc10: '',
      fStar10: '',
      lX: '',
      mTurn: '',
      tStar: '',
      sigma8: '',
      xRaySpecIndex: '',
      files: {},
      isSubmitting,
      onSubmit
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8,
      xRaySpecIndex, files, onSubmit
    } = this.state;  // get data
    const dataToSubmit = {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn,
      tStar, sigma8, xRaySpecIndex, files
    };
    onSubmit(dataToSubmit);  // submit data
    event.preventDefault();  // DO NOT RELOAD page
  }

  render() {
    const {title, isSubmitting} = this.props;

    const ParameterInputs = () => (
      <div>
        <h3>{title}</h3>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"alphaEsc"}
            onChange={(x) => {
              this.handleChange('alphaEsc', x)
            }}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={[500]}
            label={"alphaStar"}
            onChange={(x) => {
              this.handleChange('alphaStar', x)
            }}
          />
          <ParameterInputContainer
            sliderDomain={[300, 900]}
            sliderValues={[500]}
            label={"fEsc10"}
            onChange={(x) => {
              this.handleChange('fEsc10', x)
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"fStar10"}
            onChange={(x) => {
              this.handleChange('fStar10', x)
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"lX"}
            onChange={(x) => {
              this.handleChange('lX', x)
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"mTurn"}
            onChange={(x) => {
              this.handleChange('mTurn', x)
            }}
          />
        </div>
        <div className="sameRow">
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"tStar"}
            onChange={(x) => {
              this.handleChange('tStar', x)
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"sigma8"}
            onChange={(x) => {
              this.handleChange('sigma8', x)
            }}
          />
          <RangeParameterInputContainer
            sliderDomain={[100, 600]}
            sliderValues={[200, 300]}
            label={"xRaySpecIndex"}
            onChange={(x) => {
              this.handleChange('xRaySpecIndex', x)
            }}
          />
        </div>
      </div>
    );

    const FilesCheckboxes = () => (
      <CheckboxContainer
        title={'Download files'}
        labels={[
          'a', 'b', 'c'
        ]}
        onChange={this.handleCheckboxChange}
      />
    );

    const SubmitButton = () => (
      <button type="submit" className="btn btn-primary"
              disabled={isSubmitting}>Download
      </button>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <ParameterInputs/>
        <FilesCheckboxes/>
        {<br/>}
        <SubmitButton/>
      </form>
    );
  }
}

export {SearchForm};
