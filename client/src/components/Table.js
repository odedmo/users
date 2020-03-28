import React from 'react';
// import { Link } from 'react-router-dom';

export default class Table extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  renderTableData() {
    return this.props.users.map((user, index) => {
      const { id, firstName, lastName, age, gender, maritalStatus, kids } = user;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{age}</td>
          <td>{gender}</td>
          <td>{maritalStatus}</td>
          <td>{kids}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Marital Status</th>
            <th>Kids</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </table>
    )
  }
}