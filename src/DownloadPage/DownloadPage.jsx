import React from 'react';

import { userModel, userService } from '@/_services';
import { SearchForm } from '@/_components';
import { searchService } from '@/_services/search.service';
import { NumbersLabel } from '@/_components/labels';

class DownloadPage extends React.Component {
  setSubmitting = (isSubmitting) => {
    this.setState({
      isSubmitting,
    });
  };

  setStatus = (status) => {
    this.setState({
      status,
    });
  };

  onAfterSubmit = (res, isErr) => {
    this.setSubmitting(false);
    let msg = res.status;
    if (msg === undefined) {
      msg = 'Server error';
    }
    else {
      msg = msg.toString();
    }

    let resCode = res.code;
    if (resCode === undefined) {
      resCode = -1;
    }
    else {
      resCode = parseInt(resCode.toString());
    }

    isErr = (isErr || resCode !== 200);
    if (isErr) {
      this.setStatus({
        err: `Error. ${msg}`,
        email: null,
      });
    }
    else {
      this.setStatus({
        msg,
        email: res.email.toString(),
      });
    }
  };

  onSubmit = (data) => {
    this.setSubmitting(true);

    searchService.postSearch(data).then(
      (res) => {
        this.onAfterSubmit(res, false);
      },
      (err) => {
        this.onAfterSubmit(err, true);
      },
    );
  };

  estimateDownloadSize = (dataToSubmit) => {
    searchService.getEstimate(dataToSubmit).then(
      (downloadSize) => {
        this.setState({
          downloadSize,
        })
      },
      (err) => {
        this.setStatus({
          err: `Error: cannot get estimate of download size. ${err}`,
          email: null,
        });
      },
    );
  };

  constructor(props) {
    super(props);

    const downloadSize = {
      nSimulations: 0,
      mbSize: 0,
    };

    this.state = {
      isSubmitting: false,
      status: {},
      currentUser: userModel.currentUserValue,
      userFromApi: null,
      downloadSize,
    };
  }

  componentDidMount() {
    const currentUser = userModel.currentUserValue;

    this.setState({
      currentUser,
    });

    userService.getById(currentUser._id).then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const {
      status, isSubmitting, userFromApi, downloadSize,
    } = this.state;
    const EstimationLabels = () => (
      <div>
        <NumbersLabel
          label="Estimated number of simulations"
          number={downloadSize.nSimulations}
        />
        <NumbersLabel
          label="Estimated download size (Mb)"
          number={downloadSize.mbSize}
        />
      </div>
    );
    const StatusMessage = () => (
      <div>
        {status && status.err
        && <div className="alert alert-danger">{status.err}</div>
        }
        {status && status.msg && status.email
        && (
          <div className="alert alert-success">
            <p>
              {status.msg}
              An email has been sent
              to
              {' '}
              <strong>{status.email}</strong>
              {' '}
              with further instructions
            </p>
          </div>
        )
        }
      </div>
    );

    const NotGrantedComponent = () => (
      <h2>
              Sorry, you've NOT been granted
              downloads access
      </h2>
    );

    return (
      <div>
        {userFromApi && userFromApi.authorized
          ? (
            <div>
              <SearchForm
                title="Parameters"
                onChange={this.estimateDownloadSize}
                onSubmit={this.onSubmit}
                isSubmitting={isSubmitting}
              />
              {<br />}
              <EstimationLabels />
            </div>
          ) : (<NotGrantedComponent />)
          }
        {<br />}
        <StatusMessage />
      </div>
    );
  }
}

export { DownloadPage };
