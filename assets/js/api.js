
import store from './store';

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    console.log("req")
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("reponse users", resp)
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    console.log("create task",data)
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
    });
  }

  update_task(data, task_id) {
    console.log("PATCH",data)
    console.log("PATCH",task_id)
    let url = "/api/v1/tasks/" + task_id
    let that = this
    $.ajax(url, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ id: task_id, task: data }),
      success: (resp) => {
        console.log("UPDATERESP", resp.data)
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data
        });
      },
    });
  }

  delete_task(task_id) {
    console.log("delete!!", task_id);
    $.ajax("/api/v1/tasks/" + task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          id: task_id,
        });
      },
    })
  }

  complete_task(data) {
    console.log("complete task",data)
    let task_id = data['task_id']
    let that = this
    $.ajax("/api/v1/tasks/"+task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ id: task_id, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data
        });
      },
    });
  }


  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: () => {
        store.dispatch({
          type: 'UPDATE_LOGIN_FORM',
          data: {info: "Wrong username or password!"}
        })
      }
    });
  }
  submit_signup(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
      },
    });
  }
}

export default new TheServer();
