import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';




let Session = connect(({token, login}) => {return {token, login};})((props) => {
  function clearToken(){
    let action = {
      type: 'CLEAR_TOKEN',
      data: null
    };
    props.dispatch(action);
  }
  return <div className="nav-user">
    Login as { props.login.name } | <span onClick={clearToken}>Log Out</span>
  </div>;
});

function Nav(props) {
  let session_info;
  if (props.token) {
    session_info = <Session token={props.token} />;
  } else {
    session_info = "Not Login"
    return <Redirect to="/login" push={true} />
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary navbar-expand">
        <Link to='/login' style={{ textDecoration: 'none', color: 'white'}}>
          <span className="navbar-brand">
            TaskTracker
          </span>
        </Link>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
          </NavItem>
        </ul>
          { session_info }
      </nav>
    </div>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
