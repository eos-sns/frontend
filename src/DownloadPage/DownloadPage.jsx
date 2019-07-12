import React from 'react';

import {SearchForm} from "@/_components";

class DownloadPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (x) => {
    console.log(x);
  };

  render() {
    return (
      <SearchForm
        onSubmit={this.onSubmit}
      />
    );
  }
}

export {DownloadPage};