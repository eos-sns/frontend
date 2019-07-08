import React from 'react';
import Loader from 'react-loader-spinner'

class ReactIFrame extends React.Component {
  hideSpinner = () => {
    this.setState({
      loading: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="container rsvp-wrapper">
        {this.state.loading ? (
          <Loader
            type="Grid"
            color="#F56C00"
            height="100"
            width="100"
          />
        ) : null}
        <iframe
          src={this.props.src}
          width={this.props.width || "100"}
          height={this.props.height || "100"}
          onLoad={this.hideSpinner}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
    );
  }
}

export {ReactIFrame};
