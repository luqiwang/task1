import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'underscore';
import Nav from './Nav';
import $ from "jquery";

export default function demo_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Demo />, root);
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      user: [],
    };
    this.request_tasks();
    this.request_users();
  }
  render() {
    return (
      <Router>
        <Nav />
      </Router>
    )
  }

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { posts: resp.data }));
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("api", resp)
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }
}
