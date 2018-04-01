import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import api from '../api';

function SignupForm(props) {
  function update(ev) {
    addInfo("")
    let input = $(ev.target);

    let data = {};
    data[input.attr('name')] = input.val();
    let action = {
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function addInfo(message) {
    let data = {}
    data['info'] = message
    let action = {
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function userExist(name) {
    let flag = false;
    props.users.forEach((user) => {
      console.log("NAME",user.name)
      console.log("NAME",user.name == name)
      if (user.name == name) flag = true;
    })
    return flag;
  }

  function create_user(ev) {
    if (props.signup.pass != props.signup.pass2) {
      addInfo("Password not match!")
      return;
    }
    if (props.signup.pass.length <= 7) {
      addInfo("Password length should larger than 7!")
      return;
    }
    if (!validateEmail(props.signup.email)) {
      addInfo("Invalid email format!")
      return;
    }
    if (userExist(props.signup.name)) {
      addInfo("Username exists!")
      return;
    }
    const data = {
      name: props.signup.name,
      email: props.signup.email,
      password: props.signup.pass
    }
    api.submit_signup(data);
    console.log(data);
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    console.log(re.test(String(email).toLowerCase()))
    return re.test(String(email).toLowerCase());
  }

  return <div style={{padding: "4ex"}}>
    <h2>Sign Up</h2>
      <FormGroup>
        <Label for="name">Username</Label>
        <Input type="input" name="name" value={props.signup.name} onChange={update}>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="name">Email</Label>
        <Input type="email" name="email" value={props.signup.email} onChange={update} required>
        </Input>
      </FormGroup>
    <FormGroup>
      <Label for="pass">Password</Label>
      <Input type="password" name="pass" value={props.signup.pass} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="pass2">Repeat Password</Label>
      <Input type="password" name="pass2" value={props.signup.pass2} onChange={update} />
    </FormGroup>
    <p className="input-err">{props.signup.info}</p>
    <Button onClick={create_user} color="primary">Create</Button> &nbsp;
    <Link to='/login' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link> &nbsp;
  </div>;
}

function state2props(state) {
  console.log("rerender@PostForm", state);
  return {
    signup: state.signup,
    users: state.users
  };
}

export default connect(state2props)(SignupForm);
