defmodule Task3.Tasks do
  @moduledoc """
  The Tasks context.
  """

  import Ecto.Query, warn: false
  alias Task3.Repo

  alias Task3.Tasks.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
    |> Repo.preload(:user)
    |> Repo.preload(:creater)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
     Repo.get!(Task, id)
     |> Repo.preload(:user)
     |> Repo.preload(:creater)
  end

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
   {:ok, task} = %Task{}
   |> Task.changeset(attrs)
   |> Repo.insert()
   {:ok, Repo.preload(task, :user)|> Repo.preload(:creater)}
 end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    IO.puts('****TASK********')
    IO.inspect(attrs)
    IO.puts('************')
    {:ok, task} = task
    |> Task.changeset(attrs)
    |> Repo.update()
    task_id = Map.get(task, :id)
    newTask = get_task!(task_id)
    IO.puts('****NEWTASK********')
    IO.inspect(newTask)
    IO.puts('************')
    {:ok, Repo.preload(newTask, :user)|> Repo.preload(:creater)}
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end
end
