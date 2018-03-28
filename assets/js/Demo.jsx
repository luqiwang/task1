import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

export default function demo_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Demo />, root);
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      user: ""
    }
  }
  render() {
    return (
      <div>React Loaded</div>
    )
  }
}
