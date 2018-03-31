import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import api from '../api';

function LoginForm(props) {
  function update(ev) {
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

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
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
    <Button onClick={create_token} color="primary">LogIn</Button> &nbsp;
    <Link to='/users/new' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Register</Button></Link> &nbsp;
  </div>;
}

function state2props(state) {
  console.log("rerender@PostForm", state);
  return {
    login: state.login
  };
}

export default connect(state2props)(LoginForm);
