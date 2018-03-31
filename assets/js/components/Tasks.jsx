import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

function Task(params) {
  return(
    <Card>
    <CardBody>
      <div>
        <p>Title: { params.task.title }</p>
        <p>Creater: { params.task.creater.name }</p>
        <p>Assignee: { params.task.user.name }</p>
        <Link to={"/tasks/" + params.task.id}>Detail</Link>
      </div>
    </CardBody>
  </Card>)
}

export default function Tasks(params) {
  let tasks = _.map(params.tasks, (task) => <Task key={task.id} task={task} />);
  console.log("tasks", tasks)
  return <div>
    { tasks }
    <div id="new-task">
      <Link to='/tasks/new' style={{textDecoration: 'none', color: 'white'}}><Button color="primary">New Task</Button></Link>
    </div>
  </div>;
}
