import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';

function TaskForm(props) {
  console.log("props@PostForm", props);

  function update(ev) {
    addInfo("")
    let input = $(ev.target);

    let data = {creater_id: props.token.user_id};
    data[input.attr('name')] = input.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function addInfo(message) {
    let data = {}
    data['info'] = message
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    console.log("length",props.form.title.length);
    if (props.form.title.length == 0) {
      console.log("title empty")
      addInfo("Title can not be empty!")
      return;
    }
    if (props.form.body.length == 0) {
      addInfo("Body can not be empty!")
      return;
    }
    if (props.form.user_id.length == 0) {
      addInfo("Assignee can not be empty!")
      return;
    }
    api.submit_task(props.form);
    props.history.push('/tasks');
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="input" name="title" value={props.form.title} onChange={update}>
        </Input>
      </FormGroup>
    <FormGroup>
      <Label for="body">Body</Label>
      <Input type="textarea" name="body" value={props.form.body} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="user_id">Assignee</Label>
      <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <p className="input-err">{props.form.info}</p>
    <Button onClick={submit} color="primary">Create</Button> &nbsp;
    <Link to='/tasks' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link> &nbsp;
      <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@PostForm", state);
  return {
    form: state.form,
    users: state.users,
    token: state.token
  };
}

export default connect(state2props)(TaskForm);
