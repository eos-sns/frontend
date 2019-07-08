import React from 'react';

import {userService} from '@/_services';
import Switch from "react-switch";
import ReactTable from 'react-table';
import Checkbox from 'react-simple-checkbox';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      submitting: false
    };

    this.tableColumns = [{
      Header: 'First name',
      accessor: 'firstName'
    }, {
      Header: 'Last name',
      accessor: 'lastName'
    }, {
      Header: 'username',
      accessor: 'username'
    }, {
      Header: 'ID',
      accessor: 'id'
    }, {
      Header: 'Role',
      accessor: 'role'
    }, {
      Header: 'Verified ?',
      accessor: 'verified',
      Cell: x => <Checkbox
        className={"centered"}  // todo
        size={2}
        tickSize={3}
        checked={this.state.users[x.index].verified}
      />
    }, {
      Header: 'Granted ?',
      accessor: 'granted',
      Cell: x => <Switch
        className={"centered"}  // todo
        onChange={this.toggleGrantedSwitch.bind(this, x.index)}
        checked={this.state.users[x.index].granted}
        disabled={this.state.submitting}
      />
    }, {
      Header: 'Blocked ?',
      accessor: 'blocked',
      Cell: x => <Switch
        className={"centered"}  // todo
        onChange={this.toggleBlockedSwitch.bind(this, x.index)}
        checked={this.state.users[x.index].blocked}
        disabled={this.state.submitting}
      />
    }];
  }

  static updateBackendUser(user) {
    this.setState({
      submitting: true
    });

    return userService.update(user);
  }

  toggleGrantedSwitch(switchUser, newStatus) {
    this.setUserProperty(switchUser, 'granted', newStatus);
  }

  toggleBlockedSwitch(switchUser, newStatus) {
    this.setUserProperty(switchUser, 'blocked', newStatus);
  }

  setUserProperty(userIndex, property, value) {
    let users = [...this.state.users];  // get status
    let user = users[userIndex];
    const oldProperty = user[property];
    user[property] = value;  // set

    AdminPage.updateBackendUser(user)
      .catch((x) => {
        user[property] = oldProperty;  // undo-set
        alert(x);
      }).finally(() => {
      this.setState({
        users: users,
        submitting: false
      })
    })
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({users}));
  }

  render() {
    const {users} = this.state;

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

export {AdminPage};