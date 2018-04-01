import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks]
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'UPDATE_TASK':
      let task = action.task
      console.log("updattask",task)
      return _.map(state, (tt) => {
                if (tt.id == task.id) {
                  return task
                } else {
                  return tt
                }
              })
    case 'DELETE_TASK':
      return _.filter(state, (tt) => tt.id!=action.id)
    default:
      return state;
  }
}

function update_by_task(state, task) {
  console.log("taskinto", task)
  let newState = Object.assign({}, state)
  newState = _.map(newState, (tt) => {
    if (tt.id == task.id) {
      return task
    } else {
      return tt
    }
  })
  return newState
}


function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

const empty_form = {
  creater_id:"",
  user_id: "",
  title: "",
  body: "",
  time: "",
  token: "",
  info: ""
};

function form(state = empty_form, action) {
  console.log("TIME UPDATE", action.data)
  switch (action.type) {
    case 'UPDATE_FORM':
    console.log("TIME UPDATE", action.data)
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'CLEAR_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
  info: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
    console.log("WRONG", action.data)
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_signup = {
  name: "",
  email: "",
  pass: "",
  pass2: "",
  info: ""
};

function signup(state = empty_signup, action) {
  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  let reducer = combineReducers({tasks, users, form, token, login, signup});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
