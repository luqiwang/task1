import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(props) {
  console.log("props@PostForm", props);

  function update(ev) {
    let input = $(ev.target);

    let data = {};
    data[input.attr('name')] = input.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(props.form);
    console.log(props.form);
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
    <Button onClick={submit} color="primary">Task</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@PostForm", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(TaskForm);
