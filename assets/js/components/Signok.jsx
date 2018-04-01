import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

export default function Signok(props) {
  return (
    <div>
      <h1 className="signok">Sign up success!</h1>
      <Link to='/login' style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back to Login</Button></Link> &nbsp;
    </div>
  )
}
