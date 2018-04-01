defmodule Task2Web.TaskView do
  use Task2Web, :view
  alias Task2Web.TaskView
  alias Task2Web.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      body: task.body,
      time: task.time,
      user: render_one(task.user, UserView, "user.json"),
      creater: render_one(task.creater, UserView, "user.json")
    }
  end
end
