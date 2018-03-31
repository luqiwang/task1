import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import LoginForm from './LoginForm'
import TaskForm from './TaskForm'
import SignupForm from './SignupForm'
import Users from './Users'
import Tasks from './Tasks'
import TaskDetail from './TaskDetail'


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
          <Route path="/users" exact={true} render={() =>
            <Users users={props.users} />
          } />
        <Route path="/users/:user_id" render={({match}) =>
          <div>
          <Tasks tasks={_.filter(props.tasks, (task) =>
            match.params.user_id == task.user.id )
          } />
        <Link to='/users' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link> &nbsp;
        </div>
        } />
        <Route path="/tasks" exact={true} render={() =>
            <Tasks tasks={props.tasks} />
          } />
        <Route path="/tasks/:task_id" render={({match}) =>
          <TaskDetail props={match.params.task_id} />
        } />
        <Route path="/tasks/new" exact={true} component={TaskForm}/>
        <Route path="/users/new" exact={true} component={SignupForm}/>
      </div>
    </Router>
  );
})
