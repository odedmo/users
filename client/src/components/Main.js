import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Search from './Search'; 
import AddButton from './AddButton';
import Table from './Table';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addClicked: false
    };
    this.getUsers = this.getUsers.bind(this);
    this.addClicked = this.addClicked.bind(this);
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

  addClicked() {
    this.setState({ ...this.state, addClicked: true });
  }

  render() {
    const addClicked = this.state.addClicked;
    if (addClicked) {
      return <Redirect to="/add" />
    }
    return (
      <div id="main">
        <div id="head">
          <Search />
          <AddButton addCliked={this.addClicked}/>
        </div>
        <Table getUsers={this.getUsers} users={this.state.users}/>
      </div>
    )
  }
}