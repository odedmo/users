import React from 'react';
import { Table } from 'react-bootstrap';

const UsersTable = ({users, onDoubleClick, columns}) => {
  const formatUser = (user) => {
    const copy = { ...user };
    for (let [key, value] of Object.entries(copy)) {
      if (Array.isArray(value)) {
        copy[key] = value.join(', ');
      }
    }
    return copy;
  }

  const restoreUserFormat = (user) => {
    const copy = { ...user };
    copy.kids = copy.kids.split(', ');
    return copy;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((col, i) => <th key={i}>{col.displayName}</th>)}
        </tr>
      </thead>
      <tbody>
        {users && users.map(formatUser).map((user, i) => {
          return (<tr key={user.id}>
            {columns.map((col, i) => <td key={user.id + i} onDoubleClick={() => { onDoubleClick(restoreUserFormat(user))} }>{user[col.prop]}</td>)}
          </tr>)
        })}
      </tbody>
    </Table>
  )
}

export default UsersTable;
