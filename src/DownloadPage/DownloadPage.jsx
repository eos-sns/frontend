import React from 'react';

import {SearchForm} from "@/_components";
import {searchService} from "@/_services/search.service";

class DownloadPage extends React.Component {
  setSubmitting = (isSubmitting) => {
    this.setState({
      isSubmitting
    });
  };
  setStatus = (status) => {
    this.setState({
      'status': status
    })
  };
  onAfterSubmit = (res, isErr) => {
    this.setSubmitting(false);
    if (isErr) {
      this.setStatus({
        'err': res.toString(),
        'email': null
      });
    } else {
      this.setStatus({
        'msg': res.status.toString(),
        'email': res.email.toString()
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
      });
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      status: {}
    }
  }

  render() {
    const {status, isSubmitting} = this.state;
    console.log(status);

    const StatusMessage = () => (
      <div>
        {status && status.err &&
        <div className={'alert alert-danger'}>{status.err}</div>
        }
        {status && status.msg && status.email &&
        <div className={'alert alert-success'}>
          <p>{status.msg}. An email with the download data will be sent
            to <strong>{status.email}</strong></p>
        </div>
        }
      </div>
    );

    return (
      <div>
        <SearchForm
          title={'Parameters'}
          onSubmit={this.onSubmit}
          isSubmitting={isSubmitting}
        />
        {<br/>}
        <StatusMessage/>
      </div>
    );
  }
}

export {DownloadPage};