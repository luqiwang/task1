import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link, NavLink, BrowserRouter } from 'react-router-dom'
import api from '../api';

function LoginForm(props) {
  function update(ev) {
    addInfo("")
    let input = $(ev.target);

    let data = {};
    data[input.attr('name')] = input.val();
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function addInfo(message) {
    let data = {}
    data['info'] = message
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function create_token(ev) {
    api.submit_login(props.login);
    props.history.push('/login')
  }

  if (props.token) {
    return (
      <div>
      <h1 className="welcome-p">Welcome! {props.login.name}</h1>
      <Link to='/tasks' style={{textDecoration: 'none',color: 'white'}}><Button color="primary" className="landing-btn">See All Tasks</Button></Link> &nbsp;
      <Link to='/users' style={{textDecoration: 'none',color: 'white'}}><Button color="primary" className="landing-btn">See All Users</Button></Link> &nbsp;
      <Link to= {'/users/'+props.token.user_id} style={{textDecoration: 'none',color: 'white'}}><Button color="primary" className="landing-btn">My Tasks</Button></Link> &nbsp;
      </div>
    )
  }
  return <div style={{padding: "4ex"}}>
    <h2>Log In</h2>
      <FormGroup>
        <Label for="name">Username</Label>
        <Input type="input" name="name" value={props.login.name} onChange={update}>
        </Input>
      </FormGroup>
    <FormGroup>
      <Label for="pass">Password</Label>
      <Input type="password" name="pass" value={props.login.pass} onChange={update} />
    </FormGroup>
    <p className="input-err">{props.login.info}</p>
    <Button onClick={create_token} color="primary">LogIn</Button> &nbsp;
    <Link to='/users/new' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Register</Button></Link> &nbsp;
  </div>;
}


function state2props(state) {
  return {
    login: state.login,
    token: state.token
  };
}

export default connect(state2props)(LoginForm);
