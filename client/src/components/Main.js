import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Search from './Search';
import Table from './Table';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addingUser: false
    };
    this.getUsers = this.getUsers.bind(this);
    this.addingUser = this.addingUser.bind(this);
  }

  getUsers() {
    axios.get('http://localhost:8080/v1/users')
      .then(response => {
        // immutability?
        this.setState({ users: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addingUser() {
    this.setState({ ...this.state, addingUser: true });
  }

  render() {
    const { addingUser } = this.state;
    if (addingUser) {
      return <Redirect to="/add" />
    }
    return (
      <div>
        <div id="head">
          <Search />
          <button onClick={this.addingUser}>Add User</button>
        </div>
        <Table getUsers={this.getUsers} users={this.state.users}/>
      </div>
    )
  }
}