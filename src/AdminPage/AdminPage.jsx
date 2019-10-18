import React from 'react';

import Switch from 'react-switch';
import ReactTable from 'react-table';
import Checkbox from 'react-simple-checkbox';
import { userService } from '@/_services';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      submitting: false,
    };

    this.tableColumns = [{
      Header: 'First name',
      accessor: 'firstName',
    }, {
      Header: 'Last name',
      accessor: 'lastName',
    }, {
      Header: 'username',
      accessor: 'username',
    }, {
      Header: 'email',
      accessor: 'email',
    }, {
      Header: 'ID',
      accessor: 'id',
    }, {
      Header: 'Role',
      accessor: 'role',
    }, {
      Header: 'Authorized ?',
      accessor: 'authorized',
      Cell: x => (
        <Switch
          className="centered" // todo
          onChange={this.toggleAuthorizedSwitch.bind(this, x.index)}
          checked={this.state.users[x.index].authorized}
          disabled={this.state.submitting}
        />
      ),
    }];
  }

  updateBackendUser(user) {
    this.setState({
      submitting: true,
    });

    return userService.update(user);
  }

  toggleAuthorizedSwitch(switchUser, newStatus) {
    this.setUserProperty(switchUser, 'authorized', newStatus);
  }

  setUserProperty(userIndex, property, value) {
    const users = [...this.state.users]; // get status
    const user = users[userIndex];
    const oldProperty = user[property];
    user[property] = value; // set

    this.updateBackendUser(user)
      .catch((x) => {
        user[property] = oldProperty; // undo-set
        alert(x);
      })
      .finally(() => {
        this.setState({
          users,
          submitting: false,
        });
      });
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <ReactTable
          data={users}
          columns={this.tableColumns}
        />
      </div>
    );
  }
}

export { AdminPage };
