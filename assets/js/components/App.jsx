import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import LogIn from './LogIn'
import TaskForm from './TaskForm'


export default function app_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

const App = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} component={TaskForm}/>
        <Route path="/login" exact={true} component={LogIn}/>
      </div>
    </Router>
  );
})
