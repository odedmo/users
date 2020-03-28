import React from 'react';
import './App.css';

import Main from './components/Main';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add">
            <AddUser />
          </Route>
          <Route path="/edit/:id">
            <EditUser />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
