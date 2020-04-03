import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import UsersTable from './components/UsersTable/UsersTable';
import UserFormModal from './components/Modals/UserForm/UserFormModal';
import UsersService from './Services/UsersService';

import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalState, setModalState] = useState({show: false, user: {}});

  const columns = [
    { displayName: 'ID', prop: 'id' },
    { displayName: 'First Name', prop: 'firstName' },
    { displayName: 'Last Name', prop: 'lastName' },
    { displayName: 'Gender', prop: 'gender' },
    { displayName: 'Age', prop: 'age' },
    { displayName: 'Marital Status', prop: 'maritalStatus' },
    { displayName: 'Kids', prop: 'kids' },
  ];

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await UsersService.getAll());
    }
    getUsers();
  }, []);

  const onSearchClick = async (searchTerm) => {
    const allUsers = await UsersService.getAll({ useCache: true });
    if (searchTerm === '') {
      setUsers(allUsers);
    } else {
      setUsers(allUsers.filter( user => user.firstName.indexOf(searchTerm) > -1));
    }
  }

  const handleClose = () => {
    setModalState({show: false, user: {}});
  }

  const onDoubleClick = (user) => {
    setModalState({ show: true, user });
  }

  const onSave = async (user) => {
    try {
      if (!modalState.user.id) {
        await UsersService.addNewUser(user);
        setUsers([...users, user]);
      } else {
        await UsersService.updateUser(user);
        const usersClone = users.map(u => {
          return u._id === user._id ? user : u;
        } );
        setUsers(usersClone);
      }
      setModalState({show: false, user: {}});
    } catch (error) {
      // todo - handle error
      console.log(error);
    }
  }

  const createNewMemeber = () => {
    setModalState({show: true, user: {}});
  }

  return (
    <Container>
      <Header onSearch={onSearchClick} createNewMemeber={createNewMemeber} />
      <UsersTable users={users} onDoubleClick={onDoubleClick} columns={columns} />
      <UserFormModal show={modalState.show} user={modalState.user} handleClose={handleClose} onSave={onSave} />
    </Container>
  );
}

export default App;
