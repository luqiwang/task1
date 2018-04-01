import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Input, Label, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function Task(params) {
  return(
    <Card>
    <CardBody>
      <div>
        <Row>
          <Col xs="6">
            <p>Title: { params.task.title }</p>
            <p>Creater: { params.task.creater.name }</p>
            <p>Assignee: { params.task.user.name }</p>
            <p>Time: { params.task.time }</p>
            <Link to={"/tasks/" + params.task.id}>Detail</Link>
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
  function complete_task(){
    let inputId = "#input" + props.task.id
    let input = $(inputId);
    let data = Object.assign({}, props.task, {time: input.val()});
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
      <Label for="time">Input the time you spent</Label>
      <Input id={inputId} className="time-input" type="input" name="time">
      </Input>
      <Button onClick={complete_task} color="success">Complete</Button>
    </div>
  )
})

export default function Tasks(params) {
  let tasks = _.map(params.tasks, (task) => <Task key={task.id} task={task} />);
  return <div>
    <div id="new-task">
      <Link to='/tasks/new' style={{textDecoration: 'none', color: 'white'}}><Button color="primary">New Task</Button></Link>
    </div>
    { tasks }
  </div>;
}
