import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';


function get_task(id) {
  $.ajax("/api/v1/tasks/" + id, {
    method: "get",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
      console.log(resp)
    },
  });
}

export default function Task(props) {
  let task = ""
  $.ajax("/api/v1/tasks/" + props.props, {
    async: false,
    method: "get",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
      task = resp.data
    },
  });
  console.log("Task")
  return(
    <div>
    <Card style={{marginBottom: '20px'}}>
      <CardBody>
        <div>
          <p>Title: { task.title }</p>
          <p>Creater: { task.creater.name }</p>
          <p>Assignee: { task.user.name }</p>
          <p>Body: {task.body}</p>
        </div>
      </CardBody>
  </Card>
  <Link to='/tasks' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link> &nbsp;
  </div>)
}
