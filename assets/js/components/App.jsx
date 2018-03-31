import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import LoginForm from './LoginForm'
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
        <Route path="/" exact={true} component={LoginForm}/>
        <Route path="/tasks/create" exact={true} component={TaskForm}/>
      </div>
    </Router>
  );
})
