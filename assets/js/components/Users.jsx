import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';

function User(params) {
  return(
    <Card>
    <CardBody>
      <div>
        <p>{ params.user.name } ({ params.user.email })</p>
        <Link to={"/users/" + params.user.id}><Button color="primary">To Do Tasks</Button></Link>
      </div>
    </CardBody>
  </Card>)
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    { users }
  </div>;
}
