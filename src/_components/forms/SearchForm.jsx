import React from 'react';
import {
  ParameterInputContainer,
  RangeParameterInputContainer
} from "@/_components/parameter";

// todo validationSchema
class SearchForm extends React.Component {
  handleChange = (key, val) => {
    this.state[key] = val;
  };

  constructor(props) {
    super(props);

    const {onSubmit} = props;

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
      onSubmit
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn, tStar, sigma8,
      xRaySpecIndex, onSubmit
    } = this.state;  // get data
    const dataToSubmit = {
      alphaEsc, alphaStar, fEsc10, fStar10, lX, mTurn,
      tStar, sigma8, xRaySpecIndex
    };
    onSubmit(dataToSubmit);  // submit data
    event.preventDefault();  // DO NOT RELOAD page
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Search"/>
      </form>
    );
  }
}

export {SearchForm};
