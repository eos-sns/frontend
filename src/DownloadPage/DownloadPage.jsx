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
  onAfterSubmit = (msg, isErr) => {
    this.setSubmitting(false);
    if (isErr) {
      this.setStatus({'err': msg});
    } else {
      this.setStatus({'msg': msg});
    }
  };
  onSubmit = (data) => {
    this.setSubmitting(true);

    searchService.postSearch(data).then(
      (res) => {
        this.onAfterSubmit(res.toString(), false);
      },
      (err) => {
        this.onAfterSubmit(err.toString(), true);
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
    const StatusMessage = () => (
      <div>
        {status && status.err &&
        <div className={'alert alert-danger'}>{status.err}</div>
        }
        {status && status.msg &&
        <div className={'alert alert-success'}>{status.msg}</div>
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