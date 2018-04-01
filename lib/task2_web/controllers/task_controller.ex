defmodule Task2Web.TaskController do
  use Task2Web, :controller

  alias Task2.Tasks
  alias Task2.Tasks.Task
  alias Task2.Users

  action_fallback Task2Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task_id = Map.get(task_params, "id")
    task = Tasks.get_task!(task_id)
    pretime = Map.get(task_params, "time")
    if pretime && pretime != "" do
      %{"time" => time} = task_params
      if is_binary(time) do
        time = String.to_integer(time)
      end
      time = Integer.floor_div(time, 15) * 15
      time = Integer.to_string(time)
      task_params = Map.replace!(task_params, "time", time)
   end

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
