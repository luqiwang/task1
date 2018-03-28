defmodule Task1Web.TaskView do
  use Task1Web, :view
  alias Task1Web.TaskView
  alias Task1Web.UserView

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
