import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Input, Label, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function Task(params) {
  function renderEdit(task, token) {
    if (token && token.user_id && task.creater.id == token.user_id) {
      return <div className="manager-div">
        <Link className='edit-link' to={"/tasks/" + task.id + "/edit"}><Button color="primary">Edit</Button></Link>
        <Button color="danger" onClick={() => api.delete_task(task.id)}>Delete</Button>
      </div>
    }
  }
  return(
    <Card>
    <CardBody>
      <div>
        <Row>
          <Col xs="6">
            <p>Title: { params.task.title }</p>
            <p>Creater: { params.task.creater.name }</p>
            <p>Assignee: { params.task.user.name }</p>
            <p>Time: { params.task.time } Minutes</p>
            <Link to={"/tasks/" + params.task.id}><Button color="primary">Detail</Button></Link>
            {renderEdit(params.task, params.token)}
          </Col>
          <Col xs="6">
            <Complete task={params.task} />
          </Col>
        </Row>
      </div>
    </CardBody>
  </Card>)
}

let Complete = connect(({token}) => {return {token};})((props) => {
  if (props.token == null) {
    return <div>Need Log In</div>
  }
  function complete_task(){
    let inputId = "#input" + props.task.id
    let input = $(inputId);
    if (isNaN(input.val())) {
      alert("Must Input Number")
      return;
    }
    let data = Object.assign({}, props.task, {time: input.val().trim()});
    input.val('')
    api.complete_task(data)
  }
  if (props.task.user.id != props.token.user_id) {
    if (props.task.time != null) {
        return <div><p className='status'>Task Status: Completed</p></div>
    }
    return <div><p className='status'>Task Status: Todo</p></div>
  }
  let inputId = "input" + props.task.id
  if (props.task.time != null) {
    return (
      <div>
        <p className='status'>Task Status: Completed</p>
        <Label for="time">Change the complete time</Label>
        <Input id={inputId} className="time-input" type="input" name="time">
        </Input>
        <Button onClick={complete_task} color="warning">Change</Button>
      </div>
    )
  }
  return (
    <div>
      <p className='status'>Task Status: Todo</p>
      <Label for="time">Input the minutes you spent</Label>
      <Input id={inputId} className="time-input" type="input" name="time">
      </Input>
      <Button onClick={complete_task} color="success">Complete</Button>
    </div>
  )
})

export default function Tasks(params) {
  let tasks = _.map(params.tasks, (task) => <Task key={task.id} task={task} token={params.token} />);
  return <div>
    <div id="new-task">
      <Link to='/tasks/new' style={{textDecoration: 'none', color: 'white'}}><Button color="primary">New Task</Button></Link>
    </div>
    { tasks }
  </div>;
}
