import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
    console.log("UPDATETASKLIST")
      return [...action.tasks]
    case 'ADD_TASK':
      return [action.task, ...state];
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
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
