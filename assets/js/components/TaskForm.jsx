import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this)
    this.addInfo = this.addInfo.bind(this)
    this.submit = this.submit.bind(this)
    this.clear = this.clear.bind(this)
    this.listusers = this.listusers.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.task_id) {
      let originTask = {}
      $.ajax("/api/v1/tasks/" + this.props.match.params.task_id, {
        async: false,
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: (resp) => {
          console.log("GETTASK", resp.data)
          originTask = resp.data;
        },
      });

      let data = {creater_id: originTask.creater.id};
      console.log("TYPEOF", typeof(string_id))
      data['title'] = originTask.title;
      data['body'] = originTask.body;
      data['time'] = originTask.time
      let action = {
        type: 'UPDATE_FORM',
        data: data,
      };
      console.log("DIDMOUNT",action);
      this.props.dispatch(action);
    }
  }

  addInfo(message) {
    let data = {}
    data['info'] = message
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  update(ev) {
    this.addInfo("")
    console.log("props@ADDINFO", this.props)
    let input = $(ev.target);

    let data = {creater_id: this.props.token.user_id};
    data[input.attr('name')] = input.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    this.props.dispatch(action);
  }

  submit(ev) {
    console.log("length",this.props.form.title.length);
    if (this.props.form.title.length == 0) {
      console.log("title empty")
      this.addInfo("Title can not be empty!")
      return;
    }
    if (this.props.form.body.length == 0) {
      this.addInfo("Body can not be empty!")
      return;
    }
    if (this.props.form.user_id.length == 0) {
      this.addInfo("Assignee can not be empty!")
      return;
    }
    if (this.props.match.params.task_id) {
      let data = Object.assign({}, this.props.form, {'id': this.props.match.params.task_id});
      api.update_task(data, this.props.match.params.task_id);
    } else {
      let data = Object.assign({}, this.props.form, {'time': ""});
      api.submit_task(data);
    }
    console.log("HISTORY",this.props.history)
    this.props.history.push('/tasks');
  }

  clear(ev) {
    this.props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  listusers(props) {
      let users = _.map(this.props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
      users.unshift(<option key={0} value={""}></option>)
      return users
  }
  render() {
    return (
      <div style={{padding: "4ex"}}>
        <h2>Post Task</h2>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="input" name="title" value={this.props.form.title} onChange={this.update}>
            </Input>
          </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea" name="body" value={this.props.form.body} onChange={this.update} />
        </FormGroup>
        <FormGroup>
          <Label for="user_id">Assignee</Label>
          <Input type="select" name="user_id" value={this.props.form.user_id} onChange={this.update}>
            { this.listusers(this.props)}
          </Input>
        </FormGroup>
        <p className="input-err">{this.props.form.info}</p>
        <Button onClick={this.submit} color="primary">Create</Button> &nbsp;
        <Link to='/tasks' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link> &nbsp;
          <Button onClick={this.clear}>Clear</Button>
      </div>
    )
  }
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
